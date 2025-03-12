namespace CSharpApi.Models
{
    public class HomePlanet
    {
        private string Name { get; set; } = string.Empty;
        public HomePlanet(string name) {
            Name = name;
        }
    }
}
