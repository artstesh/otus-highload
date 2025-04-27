using System.Text.Json.Serialization;

namespace SSO.Contracts
{
    /// <summary>
    /// Represents the result of an operation.
    /// </summary>
    /// <typeparam name="T">The type of the data.</typeparam>
    /// <typeparam name="TError">The type of error code.</typeparam>
    public class OperationResult<T, T1> : OperationSilentResult<T1>
    {
        /// <summary>
        /// Gets or sets the data associated with the operation result.
        /// </summary>
        /// <value>
        /// The data associated with the operation result.
        /// </value>
        [JsonPropertyName("data")]
        public T? Data { get; set; }
    }
}