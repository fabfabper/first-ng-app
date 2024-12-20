using backend.Model;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {
        [HttpGet(Name = "user")]
        public User Get()
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
