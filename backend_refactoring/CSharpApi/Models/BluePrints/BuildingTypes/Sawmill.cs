
using System.Collections.ObjectModel;
using CSharpApi.Models.BluePrints.Beings;

namespace CSharpApi.Models.BluePrints.BuildingTypes
{
    public class Sawmill : Factory, IBuildingList
    {
        public static readonly string Name = "Sawmill";

        private List<Worker> _workers;

        public static readonly Dictionary<string, Dictionary<string, float>> Costs = new() {
            { "costs", new()
                {
                    { "gold", 300 },
                    { "food", 150 },
                    { "wood", 200 },
                    { "iron", 50 }
                }
            }
        };

        public Sawmill(List<Worker> workers = null)
           : base(Name, true, 2, workers ?? [])
        {
            _workers ??= workers ?? [];
        }

        public bool ConvertWorkerToWoodcutter(int workerId, object location)
        {
            return (bool)ConvertWorkerToCraftsman(Name, workerId, location)["success"];
        }
    }
}