namespace ThreadHub_Server.Helpers
{
    public class MyConfiguration
    {
        private static readonly IConfiguration _configuration;

        static MyConfiguration()
        {
            var builder = new ConfigurationBuilder()
                .AddJsonFile("appsettings.json");

            _configuration = builder.Build();
        }

        public static string GetMyKey(string KeyName)
        {
            return _configuration.GetValue<string>(KeyName);
        }
    }
}
