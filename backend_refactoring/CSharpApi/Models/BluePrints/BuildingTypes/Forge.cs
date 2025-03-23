
using System;
using CSharpApi.Models.BluePrints.Beings;
using CSharpApi.Models.BluePrints.Locations;
using Microsoft.EntityFrameworkCore;

namespace CSharpApi.Models.BluePrints.BuildingTypes
{
    public class Forge : Factory, IBuildingList
    {
        

        public string Name { get; set; } = "Forge";


        public Dictionary<string, Dictionary<string, float>> Costs { get; set; } = new() {
            { "costs", new()
                {
                    { "gold", 300 },
                    { "food", 200 },
                    { "wood", 150 },
                { "iron", 200 }
            }
            }
        };

        private List<Worker> _workers;

        public Forge(List<Worker> workers = null)  
           : base("Forge", true, 2, workers ?? [])
        {
            _workers ??= workers ?? [];
        }

        public bool ConvertWorkerToBlacksmith(int workerId, object location)
        {
            return (bool)ConvertWorkerToCraftsman(Name, workerId, location)["success"];
        }

    }
}


