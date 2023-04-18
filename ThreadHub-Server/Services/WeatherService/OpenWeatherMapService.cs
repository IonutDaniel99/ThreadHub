using System;
using System.Net.Http;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;

namespace ThreadHub_Server;
public class OpenWeatherMapService
{

    public string _apiKey;

    public OpenWeatherMapService()
    {
        var builder = new ConfigurationBuilder()
            .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true);

        IConfigurationRoot configuration = builder.Build();
        _apiKey = configuration["OPEN_WEATHER_SERVICE_API"];
    }

    public async Task<string> GetWeatherAsync(double Lat, double Long)
    {
        // Construct the API URL with the city name and API key
        var apiUrl = $"https://api.openweathermap.org/data/2.5/weather?lat={Lat}&lon={Long}&appid={this._apiKey}";
        // Send a GET request to the API endpoint
        using var client = new HttpClient();
        var response = await client.GetAsync(apiUrl);

        // Throw an exception if the response is not successful
        response.EnsureSuccessStatusCode();

        // Parse the JSON response into a WeatherData object
        var responseContent = await response.Content.ReadAsStringAsync();
        //var weatherData = JsonSerializer.Deserialize(responseContent);

        return responseContent;
    }
}
