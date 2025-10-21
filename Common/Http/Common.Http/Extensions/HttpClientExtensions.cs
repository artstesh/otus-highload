using System.Net;
using System.Net.Http.Headers;
using System.Text.Json;
using Common.Http.Exceptions;
using Common.Http.Response;

namespace Common.Http.Extensions
{
    /// <summary>
    ///     Методы расширения Http клиента
    /// </summary>
    public static class HttpClientExtensions
    {
        /// <summary>
        ///     Отправка Http Post запрос с обработкой результата
        /// </summary>
        /// <typeparam name="TRequest">Тип запроса</typeparam>
        /// <typeparam name="TResponse">Тип ответа</typeparam>
        /// <typeparam name="TResult">Тип результата</typeparam>
        /// <param name="client">HttpClient</param>
        /// <param name="requestUri">Ури запроса</param>
        /// <param name="request">Дто запроса</param>
        /// <param name="onError">Обработчик ошибок</param>
        /// <returns></returns>
        public static async Task<TResult> PostAsync<TRequest, TResponse, TResult>(this HttpClient client,
            string requestUri, TRequest request, Action<Exception> onError = null)
            where TResponse : IBaseResponse<TResult>
        {
            try
            {
                using (var httpResponse = await client.PostAsJsonAsync(requestUri, request))
                {
                    if (httpResponse.StatusCode != HttpStatusCode.OK)
                        throw new ProxyException(ProxyErrorMessage(requestUri, httpResponse.StatusCode,
                            await GetErrorMessage<TResponse>(httpResponse)));
                    var response = await httpResponse.Content.ReadAsJsonAsync<TResponse>();
                    if (!response.IsSuccess)
                        throw new ProxyException(
                            $"Некорректный ответ от сервиса, список ошибок: {string.Join("\r\n", response.ErrorMessages)}");
                    return response.Result;
                }
            }
            catch (Exception e)
            {
                if (onError == null) throw;
                onError.Invoke(e);
            }

            return default;
        }

        /// <summary>
        ///     Отправка Http Post запрос с обработкой результата
        /// </summary>
        /// <typeparam name="TRequest">Тип запроса</typeparam>
        /// <typeparam name="TResponse">Тип ответа</typeparam>
        /// <typeparam name="TResult">Тип результата</typeparam>
        /// <param name="client">HttpClient</param>
        /// <param name="requestUri">Ури запроса</param>
        /// <param name="request">Дто запроса</param>
        /// <param name="cancellationToken">Токен отмены</param>
        /// <param name="onError">Обработчик ошибок</param>
        /// <returns></returns>
        public static async Task<TResult> PostAsync<TRequest, TResponse, TResult>(this HttpClient client,
            string requestUri, TRequest request, CancellationToken cancellationToken, Action<Exception> onError)
            where TResponse : IBaseResponse<TResult>
        {
            try
            {
                using var httpResponse = await client.PostAsJsonAsync(requestUri, request, cancellationToken);
                if (httpResponse.StatusCode != HttpStatusCode.OK)
                    throw new ProxyException(ProxyErrorMessage(requestUri, httpResponse.StatusCode,
                        await GetErrorMessage<TResponse>(httpResponse)));
                var response = await httpResponse.Content.ReadAsJsonAsync<TResponse>();
                if (!response.IsSuccess)
                    throw new ProxyException(
                        $"Некорректный ответ от сервиса, список ошибок: {string.Join("\r\n", response.ErrorMessages)}");
                return response.Result;
            }
            catch (Exception e)
            {
                if (onError == null) throw;
                onError.Invoke(e);
            }

            return default;
        }

        public static async Task<TResponse> PostAsync<TRequest, TResponse>(this HttpClient client, string requestUri,
                TRequest request, Action<Exception> onError = null)
            // where TResponse : IErrorResponse
        {
            try
            {
                using (var httpResponse = await client.PostAsJsonAsync(requestUri, request))
                {
                    if (httpResponse.StatusCode != HttpStatusCode.OK)
                        throw new ProxyException(ProxyErrorMessage(requestUri, httpResponse.StatusCode,
                            httpResponse.ReasonPhrase));
                    return await httpResponse.Content.ReadAsJsonAsync<TResponse>();
                }
            }
            catch (Exception e)
            {
                if (onError == null) throw;
                onError.Invoke(e);
            }

            return default;
        }

        public static async Task<TResponse> PutAsync<TRequest, TResponse>(this HttpClient client, string requestUri,
            TRequest request, Action<Exception> onError = null)
        {
            try
            {
                using (var httpResponse = await client.PutAsJsonAsync(requestUri, request))
                {
                    if (httpResponse.StatusCode != HttpStatusCode.OK)
                        throw new ProxyException(ProxyErrorMessage(requestUri, httpResponse.StatusCode,
                            httpResponse.ReasonPhrase));
                    return await httpResponse.Content.ReadAsJsonAsync<TResponse>();
                }
            }
            catch (Exception e)
            {
                if (onError == null) throw;
                onError.Invoke(e);
            }

            return default;
        }

        public static async Task PostAsync<TRequest>(this HttpClient client, string requestUri, TRequest request,
            Action<Exception> onError = null)
        {
            try
            {
                using (var httpResponse = await client.PostAsJsonAsync(requestUri, request))
                {
                    if (httpResponse.StatusCode != HttpStatusCode.OK)
                        throw new ProxyException(ProxyErrorMessage(requestUri, httpResponse.StatusCode,
                            await GetErrorMessage<ErrorResponse>(httpResponse)));
                }
            }
            catch (Exception e)
            {
                if (onError == null) throw;
                onError.Invoke(e);
            }
        }

        public static async Task PostAsync<TRequest>(this HttpClient client, string requestUri, TRequest request,
            CancellationToken cancellationToken, Action<Exception> onError = null)
        {
            try
            {
                using var httpResponse = await client.PostAsJsonAsync(requestUri, request, cancellationToken);
                if (httpResponse.StatusCode != HttpStatusCode.OK)
                    throw new ProxyException(ProxyErrorMessage(requestUri, httpResponse.StatusCode,
                        await GetErrorMessage<ErrorResponse>(httpResponse)));
            }
            catch (Exception e)
            {
                if (onError == null) throw;
                onError.Invoke(e);
            }
        }

        /// <summary>
        ///     A post request that parses server's errors depending on <see cref="TError" />
        /// </summary>
        /// <typeparam name="TResponse">Normal server's response type</typeparam>
        /// <typeparam name="TError">Error server's response type</typeparam>
        /// <param name="client">HttpClient</param>
        /// <param name="requestUri"></param>
        /// <param name="request"></param>
        /// <param name="token"></param>
        /// <returns>
        ///     <see cref="RequestResult{TResponse,TError}" />
        /// </returns>
        public static async Task<RequestResult<TResponse, TError>> MultiResultPostAsync<TResponse, TError>(
            this HttpClient client,
            string requestUri, object request,
            CancellationToken token)
        {
            using var message = await client.PostAsJsonAsync(requestUri, request, token);
            return await ParseRequestResultAsync<TResponse, TError>(message);
        }

        /// <summary>
        ///     A post request without an expected result that parses server's errors depending on <see cref="TError" />
        /// </summary>
        /// <typeparam name="TError">Error server's response type</typeparam>
        /// <param name="client">HttpClient</param>
        /// <param name="requestUri"></param>
        /// <param name="request"></param>
        /// <param name="token"></param>
        /// <returns>
        ///     <see cref="RequestSilentResult{TError}" />
        /// </returns>
        public static async Task<RequestSilentResult<TError>> SilentMultiResultPostAsync<TError>(this HttpClient client,
            string requestUri, object request,
            CancellationToken token)
        {
            using var message = await client.PostAsJsonAsync(requestUri, request, token);
            return await ParseRequestSilentResultAsync<TError>(message);
        }

        public static async Task PutAsync<TRequest>(this HttpClient client, string requestUri, TRequest request,
            CancellationToken cancellationToken, Action<Exception> onError = null)
        {
            try
            {
                using (var httpResponse = await client.PutAsJsonAsync(requestUri, request, cancellationToken))
                {
                    if (httpResponse.StatusCode != HttpStatusCode.OK)
                        throw new ProxyException(ProxyErrorMessage(requestUri, httpResponse.StatusCode,
                            await GetErrorMessage<ErrorResponse>(httpResponse)));
                }
            }
            catch (Exception e)
            {
                if (onError == null) throw;
                onError.Invoke(e);
            }
        }

        public static async Task PutAsync<TRequest>(this HttpClient client, string requestUri, TRequest request,
            Action<Exception> onError = null)
        {
            try
            {
                using (var httpResponse = await client.PutAsJsonAsync(requestUri, request))
                {
                    if (httpResponse.StatusCode != HttpStatusCode.OK)
                        throw new ProxyException(ProxyErrorMessage(requestUri, httpResponse.StatusCode,
                            await GetErrorMessage<ErrorResponse>(httpResponse)));
                }
            }
            catch (Exception e)
            {
                if (onError == null) throw;
                onError.Invoke(e);
            }
        }

        /// <summary>
        ///     A put request that parses server's errors depending on <see cref="TError" />
        /// </summary>
        /// <typeparam name="TResponse">Normal server's response type</typeparam>
        /// <typeparam name="TError">Error server's response type</typeparam>
        /// <param name="client">HttpClient</param>
        /// <param name="requestUri"></param>
        /// <param name="request"></param>
        /// <param name="token"></param>
        /// <returns>
        ///     <see cref="RequestResult{TResponse,TError}" />
        /// </returns>
        public static async Task<RequestResult<TResponse, TError>> MultiResultPutAsync<TResponse, TError>(
            this HttpClient client,
            string requestUri, object request, CancellationToken token)
        {
            var message = await client.PutAsJsonAsync(requestUri, request, token);
            return await ParseRequestResultAsync<TResponse, TError>(message);
        }

        /// <summary>
        ///     A put request without an expectable result that parses server's errors depending on <see cref="TError" />
        /// </summary>
        /// <typeparam name="TError">Error server's response type</typeparam>
        /// <param name="client">HttpClient</param>
        /// <param name="requestUri"></param>
        /// <param name="request"></param>
        /// <param name="token"></param>
        /// <returns>
        ///     <see cref="RequestSilentResult{TError}" />
        /// </returns>
        public static async Task<RequestSilentResult<TError>> SilentResultPutAsync<TError>(this HttpClient client,
            string requestUri, object request, CancellationToken token)
        {
            var message = await client.PutAsJsonAsync(requestUri, request, token);
            return await ParseRequestSilentResultAsync<TError>(message);
        }

        public static async Task DeleteAsync(this HttpClient client, string requestUri,
            Action<Exception> onError = null)
        {
            try
            {
                using (var httpResponse = await client.DeleteAsync(requestUri))
                {
                    if (httpResponse.StatusCode != HttpStatusCode.OK)
                        throw new ProxyException(ProxyErrorMessage(requestUri, httpResponse.StatusCode,
                            await GetErrorMessage<ErrorResponse>(httpResponse)));
                }
            }
            catch (Exception e)
            {
                if (onError == null) throw;
                onError.Invoke(e);
            }
        }

        public static async Task DeleteAsync(this HttpClient client, string requestUri,
            CancellationToken cancellationToken, Action<Exception> onError)
        {
            try
            {
                using var httpResponse = await client.DeleteAsync(requestUri, cancellationToken);
                if (httpResponse.StatusCode != HttpStatusCode.OK)
                    throw new ProxyException(ProxyErrorMessage(requestUri, httpResponse.StatusCode,
                        await GetErrorMessage<ErrorResponse>(httpResponse)));
            }
            catch (Exception e)
            {
                if (onError == null) throw;
                onError.Invoke(e);
            }
        }

        /// <summary>
        ///     A delete request that parses server's errors depending on <see cref="TError" />
        /// </summary>
        /// <typeparam name="TError">Error server's response type</typeparam>
        /// <param name="client">HttpClient</param>
        /// <param name="requestUri"></param>
        /// <param name="token"></param>
        /// <returns>
        ///     <see cref="SilentResultDeleteAsync>" />
        /// </returns>
        public static async Task<RequestSilentResult<TError>> SilentResultDeleteAsync<TError>(this HttpClient client,
            string requestUri, CancellationToken token)
        {
            var message = await client.DeleteAsync(requestUri, token);
            return await ParseRequestSilentResultAsync<TError>(message);
        }

        public static async Task<TResult> GetAsync<TResult>(this HttpClient client, string requestUri,
            Action<Exception> onError = null)
        {
            try
            {
                using (var httpResponse = await client.GetAsync(requestUri))
                {
                    if (httpResponse.StatusCode != HttpStatusCode.OK)
                        throw new ProxyException(ProxyErrorMessage(requestUri, httpResponse.StatusCode,
                            await GetErrorMessage<ErrorResponse>(httpResponse)));
                    return await httpResponse.Content.ReadAsJsonAsync<TResult>();
                }
            }
            catch (Exception e)
            {
                if (onError == null) throw;
                onError.Invoke(e);
            }

            return default;
        }

        public static async Task<TResult> GetAsync<TResponse, TResult>(this HttpClient client, string requestUri,
            CancellationToken cancellationToken, Action<Exception> onError) where TResponse : BaseResponse<TResult>
        {
            try
            {
                using var httpResponse = await client.GetAsync(requestUri, cancellationToken);
                if (httpResponse.StatusCode != HttpStatusCode.OK)
                    throw new ProxyException(ProxyErrorMessage(requestUri, httpResponse.StatusCode,
                        await GetErrorMessage<ErrorResponse>(httpResponse)));
                var result = await httpResponse.Content.ReadAsJsonAsync<TResponse>();
                if (result != null && result.IsSuccess) return result.Result;
            }
            catch (Exception e)
            {
                if (onError == null) throw;
                onError.Invoke(e);
            }

            return default;
        }

        public static async Task<TResult> GetAsync<TResult>(this HttpClient client, string requestUri,
            CancellationToken cancellationToken, Action<Exception> onError)
        {
            try
            {
                using var httpResponse = await client.GetAsync(requestUri, cancellationToken);
                if (httpResponse.StatusCode != HttpStatusCode.OK)
                    throw new ProxyException(ProxyErrorMessage(requestUri, httpResponse.StatusCode,
                        await GetErrorMessage<ErrorResponse>(httpResponse)));
                var readAsJsonAsync = await httpResponse.Content.ReadAsJsonAsync<TResult>();
                return readAsJsonAsync;
            }
            catch (Exception e)
            {
                if (onError == null) throw;
                onError.Invoke(e);
            }

            return default;
        }

        /// <summary>
        ///     A get request that parses server's errors depending on <see cref="TError" />
        /// </summary>
        /// <typeparam name="TResponse">Normal server's response type</typeparam>
        /// <typeparam name="TError">Error server's response type</typeparam>
        /// <param name="client">HttpClient</param>
        /// <param name="requestUri"></param>
        /// <param name="token"></param>
        /// <returns>
        ///     <see cref="RequestResult{TResponse,TError}" />
        /// </returns>
        public static async Task<RequestResult<TResponse, TError>> MultiResultGetAsync<TResponse, TError>(
            this HttpClient client,
            string requestUri, CancellationToken token)
        {
            var responseMessage = await client.GetAsync(requestUri, token);
            return await ParseRequestResultAsync<TResponse, TError>(responseMessage);
        }

        public static Task<HttpResponseMessage> PostAsJsonAsync<T>(this HttpClient httpClient, string url, T data,
            CancellationToken cancellationToken = default)
        {
            var dataAsString = JsonSerializer.Serialize(data);
            var content = new StringContent(dataAsString);
            content.Headers.ContentType = new MediaTypeHeaderValue("application/json");
            return httpClient.PostAsync(url, content, cancellationToken);
        }

        [Obsolete("Использовать перегрузку с Uri")]
        public static Task<HttpResponseMessage> PutAsJsonAsync<T>(this HttpClient httpClient, string url, T data,
            CancellationToken cancellationToken = default)
        {
            var dataAsString = JsonSerializer.Serialize(data);
            var content = new StringContent(dataAsString);
            content.Headers.ContentType = new MediaTypeHeaderValue("application/json");
            return httpClient.PutAsync(url, content, cancellationToken);
        }

        public static Task<HttpResponseMessage> PutAsJsonAsync<T>(this HttpClient httpClient, Uri url, T data,
            CancellationToken cancellationToken = default)
        {
            var dataAsString = JsonSerializer.Serialize(data);
            var content = new StringContent(dataAsString);
            content.Headers.ContentType = new MediaTypeHeaderValue("application/json");
            return httpClient.PutAsync(url, content, cancellationToken);
        }

        public static async Task<T> ReadAsJsonAsync<T>(this HttpContent content)
        {
            var dataAsString = await content.ReadAsStringAsync();
            return JsonSerializer.Deserialize<T>(dataAsString, new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true
            });
        }

        private static async Task<string> GetErrorMessage<T>(HttpResponseMessage responseMessage)
            where T : IErrorResponse
        {
            var responseAsErrorResponse = await responseMessage.Content.ReadAsJsonAsync<T>();
            if (responseAsErrorResponse == null || !responseAsErrorResponse.ErrorMessages.Any())
                return responseMessage.ReasonPhrase;
            return string.Join(",", responseAsErrorResponse.ErrorMessages);
        }

        private static async Task<string> ComposeErrorMessage<T>(HttpResponseMessage responseMessage)
            where T : HttpOperationResult
        {
            var responseAsErrorResponse = await responseMessage.Content.ReadAsJsonAsync<T>();
            if (responseAsErrorResponse == null || !responseAsErrorResponse.Errors.Any())
                return responseMessage.ReasonPhrase;
            return string.Join(",", responseAsErrorResponse.Errors);
        }

        private static string ProxyErrorMessage(string requestUri, HttpStatusCode statusCode, string reasonPhrase)
        {
            return
                $"Не удалось получить корректный ответ от сервиса по запросу {requestUri}; StatusCode : {statusCode}; ReasonPhrase : {reasonPhrase}";
        }

        private static string ProxyErrorMessage(Uri requestUri, HttpStatusCode statusCode, string reasonPhrase)
        {
            return
                $"Не удалось получить корректный ответ от сервиса по запросу {requestUri}; StatusCode : {statusCode}; ReasonPhrase : {reasonPhrase}";
        }

        private static async Task<RequestResult<T, T1>> ParseRequestResultAsync<T, T1>(HttpResponseMessage message)
        {
            var result = new RequestResult<T, T1>();
            if (message.IsSuccessStatusCode)
                result.Data = await message.Content.ReadAsJsonAsync<T>();
            else if (message.StatusCode == HttpStatusCode.BadRequest)
                result.Error = await message.Content?.ReadAsJsonAsync<T1>() ?? default(T1);
            else
                throw new ProxyException(ProxyErrorMessage(message.RequestMessage.RequestUri, message.StatusCode,
                    await GetErrorMessage<ErrorResponse>(message)));
            return result;
        }

        private static async Task<RequestSilentResult<T>> ParseRequestSilentResultAsync<T>(HttpResponseMessage message)
        {
            var result = new RequestSilentResult<T>();
            if (!message.IsSuccessStatusCode && message.StatusCode == HttpStatusCode.BadRequest)
                result.Error = await message?.Content?.ReadAsJsonAsync<T>() ?? default(T);
            else if (!message.IsSuccessStatusCode)
                throw new ProxyException(ProxyErrorMessage(message.RequestMessage.RequestUri, message.StatusCode,
                    await GetErrorMessage<ErrorResponse>(message)));
            return result;
        }
    }
}
