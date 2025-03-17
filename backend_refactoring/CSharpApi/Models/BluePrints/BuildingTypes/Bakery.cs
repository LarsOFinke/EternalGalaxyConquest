
namespace CSharpApi.Models.BluePrints.BuildingTypes
{
    public class Bakery : IBuildingList
    {
        public string Name => "Bakery";

        public Dictionary<string, Dictionary<string, float>> Costs => new() {
            { "costs", new()
                {
                    { "gold", 300 },
                    { "food", 200 },
                    { "wood", 300 },
                    { "iron", 50 }
                }
            }
        };

    }
}