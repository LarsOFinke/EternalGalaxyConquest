using Microsoft.EntityFrameworkCore;

namespace CSharpApi.Models.BluePrints.Beings
{
    public class Population
    {
        public static int PopulationId { get; set; } = 0;

        public int Id { get; set; }
        
        public string Name { get; set; } = string.Empty;

        public string Profession { get; set; } = string.Empty;

        public bool Alive { get; set; }

        public bool Working { get; set; }

        public string FieldOfWork { get; set; } = string.Empty;

        public bool Employed { get; set; }


        public Population(string name, string profession , bool alive = true)
        {
            PopulationId++;
            Id = PopulationId;
            Name = name;
            Profession = profession;
            Alive = alive;
        }

        public Dictionary<string, object> FetchPopulationState()
        {
            return new Dictionary<string, object> {
                { "population_id", Id},
                { "category", "population" },
                { "name", Name },
                { "profession", Profession },
                { "alive", Alive } };
        }

        public int GetPopulationId() { return Id; }

    }    
}