
namespace CSharpApi.Models.BluePrints.BuildingTypes
{
    public class Forge() : IBuildingList
    {
        public string Name => "Forge";


        public Dictionary<string, Dictionary<string, float>> Costs => new() {
            { "costs", new()
                {
                    { "gold", 300 },
                    { "food", 200 },
                    { "wood", 150 },
                    { "iron", 200 }
                }
            }
        };
    }
}


