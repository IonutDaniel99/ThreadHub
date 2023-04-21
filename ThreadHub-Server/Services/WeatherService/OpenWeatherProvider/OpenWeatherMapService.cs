using System;
using System.Net.Http;
using System.Reflection.Metadata;
using System.Text.Json.Nodes;
using System.Threading.Tasks;
using System.Xml.Linq;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using ThreadHub_Server.Helpers;

namespace ThreadHub_Server.Services.WeatherService.OpenWeatherProvider;
public class OpenWeatherMapService
{
    public string _apiKey;
    public readonly HttpClient _httpClient;

    public OpenWeatherMapService()
    {   
        _httpClient = new HttpClient();
        _apiKey = MyConfiguration.GetMyKey("OPEN_WEATHER_SERVICE_API");
    }

    public async Task<WeatherDataClass> GetWeatherAsync(double Lat, double Long)
    {
        var apiUrl = $"https://api.openweathermap.org/data/2.5/weather?lat={Lat}&lon={Long}&appid={this._apiKey}";
        var response = await _httpClient.GetAsync(apiUrl);
        response.EnsureSuccessStatusCode();
        var content = await response.Content.ReadFromJsonAsync<WeatherDataClass>();
        return content;
    }
}
