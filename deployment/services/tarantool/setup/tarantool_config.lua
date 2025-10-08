box.cfg{
    listen = 3301,
    memtx_memory = 1024 * 1024 * 1024, -- 1GB
    memtx_dir = '/var/lib/tarantool/memtx',
    wal_dir = '/var/lib/tarantool/wal',
    log_level = 5
}

-- Создание пространства для сообщений
messages = box.schema.space.create('messages', {if_not_exists = true})
messages:format({
    {name = 'id', type = 'string'},
    {name = 'from_user_id', type = 'string'},
    {name = 'to_user_id', type = 'string'},
    {name = 'text', type = 'string'},
    {name = 'sent_at', type = 'unsigned'}
})

-- Создание индексов
messages:create_index('primary', {
    type = 'hash',
    parts = {'id'},
    if_not_exists = true
})

messages:create_index('user_dialog', {
    type = 'tree',
    parts = {'from_user_id', 'to_user_id', 'sent_at'},
    if_not_exists = true
})

messages:create_index('reverse_dialog', {
    type = 'tree',
    parts = {'to_user_id', 'from_user_id', 'sent_at'},
    if_not_exists = true
})


print("Tarantool initialization completed successfully")
local uuid = require('uuid')
local fiber = require('fiber')
local log = require('log')
local msgpack = require('msgpack')

local stats = {
    messages_sent = 0,
    dialogs_retrieved = 0,
    errors = 0
}

function send_message(from_user_id, to_user_id, text)
        local start_time = fiber.time()

        if not from_user_id or not to_user_id or not text then
            stats.errors = stats.errors + 1
            return {success = false, error = "Missing required parameters"}
        end

        if string.len(text) > 4096 then
            stats.errors = stats.errors + 1
            return {success = false, error = "Message too long"}
        end

        local message_id = tostring(uuid.new())
        local sent_at = os.time()

        local ok, err = pcall(function()
            box.space.messages:insert{
                message_id,
                from_user_id,
                to_user_id,
                text,
                sent_at
            }
        end)

        if not ok then
            stats.errors = stats.errors + 1
            log.error("Failed to insert message: %s", err)
            return {success = false, error = tostring(err)}
        end

        stats.messages_sent = stats.messages_sent + 1
        local execution_time = fiber.time() - start_time

        log.info("Message sent: %s (execution time: %.3f sec)", message_id, execution_time)

    return message_id
end

function get_dialog(user1, user2)
    local start_time = fiber.time()

    if not user1 or not user2 then
        stats.errors = stats.errors + 1
        return {}
    end

    local result = {}

    -- Поиск сообщений от user1 к user2
    for _, tuple in box.space.messages.index.user_dialog:pairs({user1, user2}) do
        if tuple.from_user_id == user1 and tuple.to_user_id == user2 then
            table.insert(result, {
                tuple.id,
                tuple.from_user_id,
                tuple.to_user_id,
                tuple.text,
                tuple.sent_at
            })
        else
            break
        end
    end

    -- Поиск сообщений от user2 к user1
    for _, tuple in box.space.messages.index.user_dialog:pairs({user2, user1}) do
        if tuple.from_user_id == user2 and tuple.to_user_id == user1 then
            table.insert(result, {
                tuple.id,
                tuple.from_user_id,
                tuple.to_user_id,
                tuple.text,
                tuple.sent_at
            })
        else
            break
        end
    end

    stats.dialogs_retrieved = stats.dialogs_retrieved + 1
    local execution_time = fiber.time() - start_time

    log.info("Dialog retrieved between %s and %s (%d messages, execution time: %.3f sec)",
             user1, user2, #result, execution_time)

    return result
end

function get_user_stats(user_id)
    if not user_id then
        return {error = "User ID is required"}
    end

    local sent_count = 0
    local received_count = 0

    -- Подсчет отправленных сообщений
    for _, tuple in box.space.messages.index.user_dialog:pairs({user_id}) do
        if tuple.from_user_id == user_id then
            sent_count = sent_count + 1
        else
            break
        end
    end

    -- Подсчет полученных сообщений
    for _, tuple in box.space.messages.index.reverse_dialog:pairs({user_id}) do
        if tuple.to_user_id == user_id then
            received_count = received_count + 1
        else
            break
        end
    end

    return {        user_id, sent_count, received_count, sent_count + received_count    }
end

function health_check()
    return {
        status = "healthy",
        timestamp = os.time(),
        uptime = box.info.uptime,
        message_count = box.space.messages:len()
    }
end

-- Регистрация функций
box.schema.func.create('send_message', {if_not_exists = true})
box.schema.func.create('get_dialog', {if_not_exists = true})
box.schema.func.create('get_user_stats', {if_not_exists = true})
box.schema.func.create('health_check', {if_not_exists = true})

print("Functions are initialized successfully")
