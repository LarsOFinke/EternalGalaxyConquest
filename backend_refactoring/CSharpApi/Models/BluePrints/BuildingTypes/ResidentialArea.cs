
namespace CSharpApi.Models.BluePrints.BuildingTypes
{
    public class ResidentialArea : IBuildingList
    {
        public string Name => "Residential Area";

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
