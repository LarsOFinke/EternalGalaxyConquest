
using CSharpApi.Models.BluePrints.Beings;
using CSharpApi.Models.BluePrints.Locations;

namespace CSharpApi.Models.BluePrints.BuildingTypes
{
    public class Warehouse : Factory, IBuildingList
    {
        public string Name { get; set; } = "Warehouse";

        private List<Worker> _workers;

        public Dictionary<string, Dictionary<string, float>> Costs { get; set; } = new() {
            { "costs", new()
                {
                    { "gold", 200 },
                    { "food", 200 },
                    { "wood", 300 },
                    { "iron", 100 }
                }
            }
        };

        public readonly Dictionary<string, int> StorageCapacity;

        private Dictionary<string, int> _currentCapacity;

        public Warehouse(List<Worker> workers = null)
           : base("Warehouse", true, 2, workers ?? [])
        {
            _workers ??= workers ?? [];
            StorageCapacity = new() { { "gold", 2000 }, { "food", 2000 }, { "wood", 2000 }, { "iron", 2000 } };
            _currentCapacity = new() { { "gold", 0 }, { "food", 0 }, { "wood", 0 }, { "iron", 0 } };
        }

        public Dictionary<string, int> GetCurrentCapacity() { return _currentCapacity; }

        public bool ConvertWorkerToWarehouseWorker(int workerId, Settlement location)
        {
            return (bool)ConvertWorkerToCraftsman(Name, workerId, location)["success"];
        }
    }
}
