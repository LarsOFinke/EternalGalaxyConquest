using CSharpApi.Data;

namespace CSharpApi.Models.AstronomicalObjects
{
    public class HomePlanet : ICelestialObject
    {
        public string Name { get; set; } = string.Empty;

        private List<object> Settlements { get; set; } = new List<object>();

        private Planet? OurPlanet {  get; set; }

        public HomePlanet(string name, List<object> settlements)  {
            Name = name;
            
            settlements == null ? Settlements = Settlements.Add(MainCity("Hauptstadt")) :
                Settlements = settlements!;


            OurPlanet = new Planet(name, "home_planet", 0, Settlements);
        }

    }
}