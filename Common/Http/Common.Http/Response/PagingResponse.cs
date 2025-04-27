namespace UZ.Http.Response
{
    public class PagingResponse<T>
    {
        public IEnumerable<T> Data { get; set; }
        public int PageNumber { get; set; }
        public int PageSize { get; set; }
        public double TotalPages { get; set; }
        public int TotalRecords { get; set; }
        public string Error { get; set; }
        public bool Succeeded => string.IsNullOrEmpty(Error);
    }
}