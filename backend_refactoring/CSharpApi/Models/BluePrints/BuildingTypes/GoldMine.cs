
using CSharpApi.Models.BluePrints.Beings;
using CSharpApi.Models.BluePrints.Locations;

namespace CSharpApi.Models.BluePrints.BuildingTypes
{
    public class GoldMine : Mine, IBuildingList
    {
        public string Name { get; set; } = "Gold Mine";

        public Dictionary<string, Dictionary<string, float>> Costs { get; set; } = new() {
            { "costs", new()
                {
                    { "gold", 200 },
                    { "food", 100 },
                    { "wood", 200 },
                    { "iron", 50 }
                }
            }
        };

        private List<Worker> _workers;

        public GoldMine(List<Worker> workers = null)
           : base("Gold Mine", true, 2, workers ?? [])
        {
            _workers ??= workers ?? [];
        }

        public bool ConvertWorkerToMiner(int workerId, Settlement location)
        {
            return (bool)ConvertWorkerToCraftsman(Name, workerId, location)["success"];
        }
    }
}
