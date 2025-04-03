using Microsoft.AspNetCore.SignalR;

namespace CSharpApi.Controllers.WebSocketController
{
    public class WebSocketEndpoints : Hub<IGameHub>
    {
        public override async Task OnConnectedAsync() => await Clients.All.Communicate($"Hey Bro {Context.ConnectionId}");

    }

    public interface IGameHub
    {
        Task Communicate(string action);
    }
}
