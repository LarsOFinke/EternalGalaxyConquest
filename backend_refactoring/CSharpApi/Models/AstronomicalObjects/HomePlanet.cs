using CSharpApi.Models.BluePrints.Locations;


namespace CSharpApi.Models.AstronomicalObjects
{
    public class HomePlanet : Base, ICelestialObject
    {
        public string Name { get; set; } = string.Empty;

        public List<Settlement> Settlements { get; set; }

        public Planet OurPlanet { get; set; }

        public HomePlanet(string name, int tileId, List<Settlement> settlements) : base(name, "homeplanet", tileId, settlements)
        {
            {
                Name = name;

                Settlements ??= settlements ?? [new MainCity("Hauptstadt")];

                OurPlanet = new Planet(name, "home_planet", 0, Settlements);
            }
        }
    }
}