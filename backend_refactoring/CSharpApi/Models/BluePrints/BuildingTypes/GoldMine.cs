
using CSharpApi.Models.BluePrints.Beings;

namespace CSharpApi.Models.BluePrints.BuildingTypes
{
    public class GoldMine : Mine, IBuildingList
    {
        public static readonly string Name = "Gold Mine";

        public static readonly Dictionary<string, Dictionary<string, float>> Costs = new() {
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
           : base(Name, true, 2, workers ?? [])
        {
            _workers ??= workers ?? [];
        }

        public bool ConvertWorkerToMiner(int workerId, object location)
        {
            return (bool)ConvertWorkerToCraftsman(Name, workerId, location)["success"];
        }
    }
}
