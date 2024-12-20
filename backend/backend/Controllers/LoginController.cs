using backend.Model;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class LoginController : ControllerBase
    {
        [HttpPost(Name = "login")]
        public User Post([FromBody] User user)
        {
            return new User
            {
                Email = "fabian@test.ch",
                UserName = "fabian",
                Password = "1234",
                Token = "1234",
            };
        }
    }
}
