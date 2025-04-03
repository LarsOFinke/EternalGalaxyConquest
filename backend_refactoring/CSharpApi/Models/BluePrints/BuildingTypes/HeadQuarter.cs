using CSharpApi.Models.BluePrints.Locations;

namespace CSharpApi.Models.BluePrints.BuildingTypes
{
    public class HeadQuarter : MilitaryBuilding, IBuildingList
    {
        public string Name { get; set; } = "Headquarter";

        public Dictionary<string, Dictionary<string, float>> Costs { get; set; } = new() {
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
           : base("Headquarter", true)
        {
        }
    }
}
