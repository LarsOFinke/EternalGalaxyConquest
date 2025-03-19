
namespace CSharpApi.Models.BluePrints.BuildingTypes
{
    public class ResidentialArea : CivilianBuilding, IBuildingList
    {
        public static readonly string Name = "Residential Area";

        public static readonly Dictionary<string, Dictionary<string, float>> Costs = new() {
            { "costs", new()
                {
                    { "gold", 0 },
                    { "food", 0 },
                    { "wood", 0 },
                    { "iron", 0 }
                }
            }
        };

        public ResidentialArea() : base(Name, true)
        {
        }
    }
}
