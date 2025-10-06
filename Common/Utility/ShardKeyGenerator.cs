using System.Text;

namespace Common.Utility;

public static class ShardKeyGenerator
{
    public static Guid GenerateShardKey(Guid user1, Guid user2)
    {
        var sortedUsers = new[] { user1, user2 }.OrderBy(g => g).ToList();
        var input = $"{sortedUsers.First()}_{sortedUsers.Last()}";
        return CreateDeterministicGuid(input);
    }

    public static Guid GetShardKeyForMessage(Guid fromUserId, Guid toUserId)
    {
        return GenerateShardKey(fromUserId, toUserId);
    }

    private static Guid CreateDeterministicGuid(string input)
    {
        using (var md5 = System.Security.Cryptography.MD5.Create())
        {
            byte[] inputBytes = Encoding.UTF8.GetBytes(input);
            byte[] hashBytes = md5.ComputeHash(inputBytes);
            return new Guid(hashBytes);
        }
    }
    public static int GetShardIndex(Guid shardKey, int totalShards)
    {
        byte[] bytes = shardKey.ToByteArray();
        int hash = BitConverter.ToInt32(bytes, 0);
        return Math.Abs(hash) % totalShards;
    }

    public static int GetShardIndexOptimized(Guid shardKey, int totalShards)
    {
        byte[] bytes = shardKey.ToByteArray();
        long hash = BitConverter.ToInt64(bytes, 0);
        return (int)(Math.Abs(hash) % totalShards);
    }
}
