
using CSharpApi.Models;

namespace CSharpApi.Models
{
    public class HomePlanet
    {
        private string Name { get; set; } = string.Empty;

        private List<Object> Settlements { get; set; } = { MainCity("Hauptstadt") };

        private Planet Planet { get; set; }


        public HomePlanet(string name, List<Object> settlements) {
            Name = name;

            if (settlements != null) Settlements = settlements;

            Planet = new Planet(Name, "home_planet", 0, Settlements);
        }
    }
}