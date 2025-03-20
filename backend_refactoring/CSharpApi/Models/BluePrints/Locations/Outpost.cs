
using CSharpApi.Models.BluePrints.BuildingTypes;

namespace CSharpApi.Models.BluePrints.Locations
{
    public class Outpost : Settlement
    {
        public Outpost(string settlementName, float gold, float food, float wood, float iron, string settlementType = "city", List<IBuildingList> buildings = null, List<object> population = null) : base(settlementName, settlementType, gold, food, wood, iron, buildings ?? [], population ?? [])
        {
        }
    }
}
