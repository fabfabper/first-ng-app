using System.Text.Json.Serialization;

namespace backend.Model
{
    public class User
    {
        [JsonPropertyName("email")]
        public string Email { get; set; }

        [JsonPropertyName("password")]
        public string Password { get; set; }

        [JsonPropertyName("token")]
        public string Token { get; set; }

        [JsonPropertyName("username")]
        public string UserName { get; set; }
    }
}
