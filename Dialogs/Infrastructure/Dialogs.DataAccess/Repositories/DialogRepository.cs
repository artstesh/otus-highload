using System.Text.Json;
using System.Text.Json.Serialization;
using Dialogs.Application.Repositories;
using Dialogs.Entities;
using Microsoft.Extensions.Logging;
using ProGaudi.MsgPack.Light;
using ProGaudi.Tarantool.Client;
using ProGaudi.Tarantool.Client.Model;

namespace Dialogs.DataAccess.Repositories;

public class DialogRepository : IDialogRepository
{
    private readonly string _connectionString;

    public DialogRepository(string connectionString)
    {
        _connectionString = connectionString;
        Console.WriteLine(connectionString);
    }

    public async Task<string> SendMessageAsync(Guid fromUserId, Guid toUserId, string text)
    {
            var _box = await Box.Connect(_connectionString, 3301)!;
        try
        {
            var result = await _box.Call<TarantoolTuple<string,string,string>,string>("send_message",
                TarantoolTuple.Create(fromUserId.ToString(), toUserId.ToString(), text));
            return result.Data[0];
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex.StackTrace);
            throw;
        }
        finally
        {
            _box.Dispose();
        }
    }

    public async Task<IEnumerable<Message>> GetDialogAsync(Guid user1, Guid user2)
    {
            var _box = await Box.Connect(_connectionString, 3301);
        try
        {
            var result =
                await _box.Call<TarantoolTuple<string, string>, TarantoolTuple<string, string, string, string, long>[]>(
                    "get_dialog",
                    TarantoolTuple.Create(user1.ToString(), user2.ToString()));


            return result.Data[0].Select(e => new Message
            {
                Id = e.Item1,
                FromUserId = e.Item2,
                ToUserId = e.Item3,
                Text = e.Item4,
                SentAt = e.Item5
            });
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex.StackTrace);
            throw;
        }
        finally
        {
            _box.Dispose();
        }
    }

    public async Task<UserStats> GetUserStatsAsync(Guid userId)
    {
            var _box = await Box.Connect(_connectionString, 3301);
        try
        {
            var result = await _box.Call<TarantoolTuple<string>,TarantoolTuple<string, int, int, int>>(
                "get_user_stats",
                TarantoolTuple.Create(userId.ToString())
            );

            return new UserStats
            {
                UserId = result.Data[0].Item1,
                SentCount = result.Data[0].Item2,
                ReceivedCount = result.Data[0].Item3,
                TotalCount = result.Data[0].Item4
            };
        }
        catch (Exception e)
        {
            Console.WriteLine(e.StackTrace);
            throw;
        }
        finally
        {
            _box.Dispose();
        }
    }
}
