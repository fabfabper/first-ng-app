using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;

namespace backend
{
    public class SignalrHub : Hub
    {
        public async Task SendMessage(string user, string message)
        {
            await Clients.All.SendAsync("Message", user, message);
        }

        [Authorize]
        public override async Task OnConnectedAsync()
        {
            try
            {
                var token = Context.GetHttpContext().Request.Query["access_token"];

                Console.WriteLine($"{Context.ConnectionId} connected");
                await Clients.All.SendAsync("ReceiveMessage", "backend", $"{Context.ConnectionId} joined");
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
            }
        }
    }
}
