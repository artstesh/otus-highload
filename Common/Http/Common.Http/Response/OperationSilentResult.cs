namespace UZ.Http.Response
{
    /// <summary>
    /// Represents the result of an operation.
    /// </summary>
    /// <typeparam name="TError">The type of error code.</typeparam>
    public class OperationSilentResult<TError>
    {
        /// <summary>
        /// Represents a collection of errors.
        /// </summary>
        /// <typeparam name="TError">The type of error.</typeparam>
        public List<TError> Errors { get; set; } = new List<TError>();

        /// <summary>
        /// Gets a value indicating whether the operation was successful or not.
        /// </summary>
        public bool IsSuccessful => !(Errors?.Any() ?? false);
    }
}