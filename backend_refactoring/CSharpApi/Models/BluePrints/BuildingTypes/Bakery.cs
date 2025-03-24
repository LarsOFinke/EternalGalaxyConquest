
using CSharpApi.Models.BluePrints.Beings;
using CSharpApi.Models.BluePrints.Locations;

namespace CSharpApi.Models.BluePrints.BuildingTypes
{
    public class Bakery : Factory, IBuildingList
    {

        public string Name { get; set; } = "Bakery";

        public Dictionary<string, Dictionary<string, float>> Costs { get; set; } = new() {
                                                                                            { "costs", new()
                                                                                                {
                                                                                                    { "gold", 300 },
                                                                                                    { "food", 200 },
                                                                                                    { "wood", 300 },
                                                                                                    { "iron", 50 }
                                                                                                }
                                                                                            }
                                                                                        };

        private List<Worker> _workers { get; set; } = [];
        public bool ConvertWorkerToBaker(int workerId, Settlement location)
        {
            return (bool)ConvertWorkerToCraftsman(Name, workerId, location)["success"];
        }

        public Bakery(List<Worker> workers = null) : base("Bakery", true, 2 , workers: workers ?? [])
        {
            _workers ??= workers ?? [];

        }

    }
}