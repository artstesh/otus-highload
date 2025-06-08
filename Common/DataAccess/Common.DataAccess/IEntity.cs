namespace Common.DataAccess
{
    public interface IEntity
    {
    }

    public interface IEntity<TPrimaryKey> : IEntity
        where TPrimaryKey : IEquatable<TPrimaryKey>
    {
        TPrimaryKey Id { get; set; }
    }
}