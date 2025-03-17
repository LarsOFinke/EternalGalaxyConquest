
namespace CSharpApi.Models.BluePrints.BuildingTypes
{
    public class HeadQuarter : IBuildingList
    {
        public string Name => "Headquarter";

        public Dictionary<string, Dictionary<string, float>> Costs => new() {
            { "costs", new()
                {
                    { "gold", 0 },
                    { "food", 0 },
                    { "wood", 0 },
                    { "iron", 0 }
                }
            }
        };
    }
}
