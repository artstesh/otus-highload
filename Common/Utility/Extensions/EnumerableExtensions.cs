namespace Common.Utility.Extensions
{
    public static class EnumerableExtensions
    {
        public static IEnumerable<T> Flatten<T, R>(this IEnumerable<T> source, Func<T, R> recursion)
            where R : IEnumerable<T>
        {
            var flattened = source.ToList();

            var children = source.Select(recursion);

            if (children != null)
                foreach (var child in children)
                    flattened.AddRange(child.Flatten(recursion));

            return flattened;
        }
    }
}