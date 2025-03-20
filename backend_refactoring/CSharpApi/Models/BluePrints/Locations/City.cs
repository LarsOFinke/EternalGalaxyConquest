
using CSharpApi.Models.BluePrints.BuildingTypes;

namespace CSharpApi.Models.BluePrints.Locations
{
    public class City : Settlement
    {
        public City(string settlementName, float gold, float food, float wood, float iron, List<IBuildingList> buildings = null, List<object> population = null, string settlementType = "city") 
            : base(settlementName, settlementType, gold, food, wood, iron, buildings ?? [], population ?? [])
        {
        }
    }
}
