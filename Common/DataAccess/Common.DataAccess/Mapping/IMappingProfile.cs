namespace UZ.DataAccess.Mapping
{
    public interface IMappingFromProfile<T, T2>
    {
        T2? From(T? model);
    }

    public interface IMappingProfile<T, T2> : IMappingFromProfile<T, T2>
    {
        T? To(T2? model);
    }

    public interface IMappingFromBulkProfile<T, T2>
    {
        List<T2?> FromBulk(List<T> model);
    }

    public interface IMappingBulkProfile<T, T2> : IMappingFromBulkProfile<T, T2>
    {
        List<T?> ToBulk(List<T2?> model);
    }
}