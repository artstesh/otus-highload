using System.Net.WebSockets;

namespace PostSocket.Contracts;

public class WebSocketConnection
{
    public Guid UserId { get; set; }
    public WebSocket WebSocket { get; set; }
    public DateTime ConnectedAt { get; set; }
}
