

using CSharpApi.Models.BluePrints.Beings;

namespace CSharpApi.Models.BluePrints.BuildingTypes
{
    public class IronMine : Mine, IBuildingList
    {
        public string Name { get; set; } = "Iron Mine";

        private List<Worker> _workers;

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

        public IronMine(List<Worker> workers = null)
           : base("Iron Mine", true, 2, workers ?? [])
        {
            _workers ??= workers ?? [];
        }

        public bool ConvertWorkerToMiner(int workerId, object location)
        {
            return (bool)ConvertWorkerToCraftsman(Name, workerId, location)["success"];
        }
    }
}
