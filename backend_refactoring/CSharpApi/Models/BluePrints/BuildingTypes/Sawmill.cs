
namespace CSharpApi.Models.BluePrints.BuildingTypes
{
    public class Sawmill : IBuildingList
    {
        public string Name => "Sawmill";

        public Dictionary<string, Dictionary<string, float>> Costs => new() {
            { "costs", new()
                {
                    { "gold", 300 },
                    { "food", 150 },
                    { "wood", 200 },
                    { "iron", 50 }
                }
            }
        };
    }
}