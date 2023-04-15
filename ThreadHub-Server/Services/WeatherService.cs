using Microsoft.AspNetCore.SignalR;

namespace ThreadHub_Server.Services
{
    public class WeatherService : Hub
    {
        Random random = new Random();

        public override async Task OnConnectedAsync()
        {
            Console.WriteLine("Connect");
            await base.OnConnectedAsync();

            await Clients.Caller.SendAsync("ReceiveMessage", $"Weather is {random.Next(10)}");
        }

        public override async Task OnDisconnectedAsync(Exception exception)
        {
            Console.WriteLine("Disconnect", exception);
            await base.OnDisconnectedAsync(exception);
        }

        public async void SendData(string data)
        {
            int number = random.Next(10);
            // Code to send data to clients
            await Clients.All.SendAsync("ReceiveData", data);
            await Clients.Caller.SendAsync("ReceiveMessage", $"Weather is {number}");
            Console.WriteLine(number);
            Console.WriteLine(data);
        }

    }

}
