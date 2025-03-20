using CSharpApi.Data;
using CSharpApi.Models.BluePrints;
using CSharpApi.Models.BluePrints.Locations;


namespace CSharpApi.Models.AstronomicalObjects
{
    public class HomePlanet : ICelestialObject
    {
        public string Name { get; set; } = string.Empty;

        public List<object> Settlements { get; set; }

        public Planet OurPlanet {  get; set; }

        public HomePlanet(string name, List<object> settlements)  {
            Name = name;

            Settlements ??= settlements ?? [new MainCity("Hauptstadt")];

            OurPlanet = new Planet(name, "home_planet", 0, Settlements);
        }
    }
}