using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Newtonsoft.Json;

namespace ThreadHub_Server.Services.WeatherService
{
    public class WeatherService : Hub
    {
        Random random = new Random();

        public override async Task OnConnectedAsync()
        {
            await base.OnConnectedAsync();
        }

        public override async Task OnDisconnectedAsync(Exception exception)
        {
            Console.WriteLine("Disconnect", exception);
            await base.OnDisconnectedAsync(exception);
        }

        public async void RequestWeatherForecast(GetWeatherClass _getWeather)
        {
            double latitude = _getWeather.Latitude;
            double longitude = _getWeather.Longitude;

            Console.WriteLine($"{latitude} {longitude}");

            var openWeatherMapService = new OpenWeatherMapService();
            var weatherData = openWeatherMapService.GetWeatherAsync(latitude, longitude);
            await Clients.Caller.SendAsync("RequestedWeatherForecast", weatherData);

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
