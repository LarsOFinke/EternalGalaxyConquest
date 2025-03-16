using Microsoft.EntityFrameworkCore;

namespace CSharpApi.Models.BluePrints
{
    public class Population
    {
        public static int PopulationId { get; set; } = 0;

        private int _populationId { get; set; };
        
        private string Name { get; set; } = string.Empty;

        private string Profession {  get; set; } = string.Empty;

        private bool Alive { get; set; }

        public Population(string name, string profession, bool alive = true)
        {
            PopulationId++;
            _populationId = PopulationId;
            Name = name;
            Profession = profession;
            Alive = alive;
        }

        public Dictionary<string, object> FetchPopulationState()
        {
            return new Dictionary<string, object> {
                { "population_id", _populationId},
                { "category", "population" },
                { "name", Name },
                { "profession", Profession },
                { "alive", Alive } };
        }

    }
}