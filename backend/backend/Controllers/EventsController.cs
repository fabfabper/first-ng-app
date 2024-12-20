using backend.Model;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class EventsController : ControllerBase
    {
        [HttpGet(Name = "Events")]
        public IEnumerable<Event> Get()
        {
            return new List<Event>
            {
                new Event
                {
                    Id = "1",
                    Location = "Jatzhütte Davos",
                    Latitude = 46.76656755044547,
                    Longitude = 9.851649798293028,
                    Status = "Active",
                    Rescuers = new List<Rescuer>
                    {
                        new Rescuer
                        {
                            Id = "1",
                            EventId = "1",
                            Name = "Mit Helfer",
                            Status = "Alarmed",
                            Latitude = 47.5,
                            Longitude = 8.5
                        }
                    }
                },
                new Event
                {
                    Id = "2",
                    Location = "Testlocation",
                    Latitude = 47.5,
                    Longitude = 8.5,
                    Status = "Active",
                    Rescuers = new List<Rescuer>
                    {
                        new Rescuer
                        {
                            Id = "2",
                            EventId = "2",
                            Name = "Max Muster",
                            Status = "Acknowledged",
                            Latitude = 47.5,
                            Longitude = 8.5
                        },
                        new Rescuer
                        {
                            Id = "3",
                            EventId = "2",
                            Name = "Pablo Escobar",
                            Status = "Refused",
                            Latitude = 47.5,
                            Longitude = 8.5
                        }
                    }
                }
            };
        }
    }
}
