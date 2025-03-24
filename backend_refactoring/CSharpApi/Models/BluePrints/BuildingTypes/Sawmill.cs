
using System.Collections.ObjectModel;
using CSharpApi.Models.BluePrints.Beings;
using CSharpApi.Models.BluePrints.Locations;

namespace CSharpApi.Models.BluePrints.BuildingTypes
{
    public class Sawmill : Factory, IBuildingList
    {
        public string Name { get; set; } = "Sawmill";

        private List<Worker> _workers;

        public Dictionary<string, Dictionary<string, float>> Costs { get; set; } = new() {
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
           : base("Sawmill", true, 2, workers ?? [])
        {
            _workers ??= workers ?? [];
        }

        public bool ConvertWorkerToWoodcutter(int workerId, Settlement location)
        {
            return (bool)ConvertWorkerToCraftsman(Name, workerId, location)["success"];
        }
    }
}