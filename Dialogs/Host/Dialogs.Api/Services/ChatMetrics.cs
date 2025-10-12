
using Prometheus;
using ITimer = Prometheus.ITimer;

namespace Dialogs.Services;

public interface IChatMetrics
{
    void MessageSend();
    void DialogGet();
    void MessagesList();
    void RequestFailed();
    ITimer StartRequestTimer();
}

public class ChatMetrics : IChatMetrics
{
    private readonly Counter _messageSendCounter;
    private readonly Counter _dialogsGetCounter;
    private readonly Counter _messageListCounter;
    private readonly Histogram _requestDuration;
    private readonly Counter _failedRequestsCounter;

    public ChatMetrics()
    {
        _messageSendCounter = Metrics.CreateCounter("chat_message_send_total", "Total number of messages sent");
        _dialogsGetCounter = Metrics.CreateCounter("chat_dialogs_get_total", "Total number of dialogs get");
        _messageListCounter = Metrics.CreateCounter("chat_messages_listed_total", "Total number of messages listed");

        _requestDuration = Metrics.CreateHistogram("chat_request_duration_seconds",
            "Request duration in seconds", new HistogramConfiguration
            {
                Buckets = Histogram.ExponentialBuckets(0.01, 2, 10)
            });

        _failedRequestsCounter = Metrics.CreateCounter("chat_failed_requests_total",
            "Total number of failed requests");
    }

    public void MessageSend() => _messageSendCounter.Inc();
    public void DialogGet() => _dialogsGetCounter.Inc();
    public void MessagesList() => _messageListCounter.Inc();
    public void RequestFailed() => _failedRequestsCounter.Inc();

    public ITimer StartRequestTimer() => _requestDuration.NewTimer();
}
