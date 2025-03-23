
using CSharpApi.Models.BluePrints.Beings;
using CSharpApi.Models.BluePrints.Locations;

namespace CSharpApi.Models.BluePrints.BuildingTypes
{
    public class BuildersHut : Factory, IBuildingList 
    {
        public string Name { get; set; } = "Builders Hut";

        public Dictionary<string, Dictionary<string, float>> Costs { get; set; } = new()
        {
            {
                "costs", new()
                {
                    { "gold", 200 },
                    { "food", 150 },
                    { "wood", 200 },
                    { "iron", 50 }
                }
            }
        };

        private List<Worker> _workers;     

        public BuildersHut(List<Worker> workers = null) : base("Builders Hut", true, 2, workers ?? [])
        {
            _workers = workers ?? [];
        }

        public object MatchPayLoadAction(string action, List<object> context)
        {
            return action switch
            {
                "Get Workers" => _workers,
                "Convert Worker To Builder" => GetWorker(),
                _ => new Dictionary<string, object>()
                    {
                        { "success", false }, { "message", "Non Executable Action" }
                    },
            };
        }

        public Dictionary<string, object> ConvertWorkerToBuilder(int workerId, object settlement)
        {
            return ConvertWorkerToCraftsman(Name, workerId, settlement);
        }
    }
}
