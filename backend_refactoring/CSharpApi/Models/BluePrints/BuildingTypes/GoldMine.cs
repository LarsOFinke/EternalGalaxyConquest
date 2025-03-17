
namespace CSharpApi.Models.BluePrints.BuildingTypes
{
    public class GoldMine : IBuildingList
    {
        public string Name => "Gold Mine";

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
