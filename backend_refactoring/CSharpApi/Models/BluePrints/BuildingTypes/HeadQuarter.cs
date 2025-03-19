
namespace CSharpApi.Models.BluePrints.BuildingTypes
{
    public class HeadQuarter : MilitaryBuilding, IBuildingList
    {
        public static readonly string Name = "Headquarter";

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

        public HeadQuarter()
           : base(Name, true)
        {
        }
    }
}
