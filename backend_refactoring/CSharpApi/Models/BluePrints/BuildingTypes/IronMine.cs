

namespace CSharpApi.Models.BluePrints.BuildingTypes
{
    public class IronMine : IBuildingList
    {
        public string Name => "Iron Mine";

        public Dictionary<string, Dictionary<string, float>> Costs => new() {
            { "costs", new()
                {
                    { "gold", 200 },
                    { "food", 100 },
                    { "wood", 200 },
                    { "iron", 50 }
                }
            }
        };
    }
}
