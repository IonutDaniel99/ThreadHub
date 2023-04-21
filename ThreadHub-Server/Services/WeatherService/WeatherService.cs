using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using ThreadHub_Server.Services.WeatherService.OpenWeatherProvider;

namespace ThreadHub_Server.Services.WeatherService
{
    public class WeatherService : Hub
    {
        public override async Task OnConnectedAsync()
        {
            var connectionId = Context.ConnectionId;
            await base.OnConnectedAsync();
            Console.WriteLine(string.Format("Connected {0}", connectionId));
        }

        public override async Task OnDisconnectedAsync(Exception exception)
        {
            var connectionId = Context.ConnectionId;
            await base.OnDisconnectedAsync(exception);
            Console.WriteLine(string.Format("Disconnected {0}", connectionId));
            Console.WriteLine("=====================================");
        }

        public async Task AskWeatherForecast(GetWeatherClass _getWeather)
        {
            var connectionId = Context.ConnectionId;

            double latitude = _getWeather.Latitude;
            double longitude = _getWeather.Longitude;

            var openWeatherMapService = new OpenWeatherMapService();
            var weatherData = await openWeatherMapService.GetWeatherAsync(latitude, longitude);
            var weather = WeatherServiceEntityToJson.weatherServiceToJson(weatherData);
            await Clients.Client(connectionId).SendAsync("getWeatherForecast", weather);
        }
        public async void AskWeatherRefresh()
        {
            Console.WriteLine("=========ceva=====");
            var connectionId = Context.ConnectionId;
            await Clients.Client(connectionId).SendAsync("getWeatherRefresh", "Hello Bro");
        }
    }


}
