using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using ThreadHub_Server.Services.WeatherService.OpenWeatherProvider;

namespace ThreadHub_Server.Services.WeatherService
{
    public static class WeatherServiceEntityToJson
    {
        public static string weatherServiceToJson(WeatherDataClass weatherDataClass)
        {
            return JsonConvert.SerializeObject(weatherDataClass);

        }
    }
}
