﻿
using CSharpApi.Models.BluePrints.Beings;

namespace CSharpApi.Models.BluePrints.BuildingTypes
{
    public class Warehouse : Factory, IBuildingList
    {
        public static readonly string Name = "Warehouse";

        private List<Worker> _workers;

        public static readonly Dictionary<string, Dictionary<string, float>> Costs = new() {
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

        public Warehouse(Dictionary<string, int> storageCapacity, Dictionary<string, int> currentCapacity, List<Worker> workers = null)
           : base(Name, true, 2, workers ?? [])
        {
            _workers ??= workers ?? [];
            StorageCapacity ??= storageCapacity ?? new() { { "gold", 2000 }, { "food", 2000 }, { "wood", 2000 }, { "iron", 2000 } };
            _currentCapacity ??= currentCapacity ?? new() { { "gold", 0 }, { "food", 0 }, { "wood", 0 }, { "iron", 0 } }
        }

        public Dictionary<string, int> GetCurrentCapacity() { return _currentCapacity; }

        public bool ConvertWorkerToWarehouseWorker(int workerId, object location)
        {
            return (bool)ConvertWorkerToCraftsman(Name, workerId, location)["success"];
        }
    }
}
