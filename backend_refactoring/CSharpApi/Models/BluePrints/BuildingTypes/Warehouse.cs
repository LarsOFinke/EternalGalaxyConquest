
namespace CSharpApi.Models.BluePrints.BuildingTypes
{
    public class Warehouse : IBuildingList
    {
        public string Name => "Warehouse";

        public Dictionary<string, Dictionary<string, float>> Costs => new() {
            { "costs", new()
                {
                    { "gold", 200 },
                    { "food", 200 },
                    { "wood", 300 },
                    { "iron", 100 }
                }
            }
        };
    }
}
