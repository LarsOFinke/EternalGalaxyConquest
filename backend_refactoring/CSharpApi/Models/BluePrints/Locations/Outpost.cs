
using CSharpApi.Models.BluePrints.Beings;
using CSharpApi.Models.BluePrints.BuildingTypes;

namespace CSharpApi.Models.BluePrints.Locations
{
    public class Outpost : Settlement
    {
        public Outpost(string settlementName, float gold, float food, float wood, float iron, string settlementType = "city", List<BuildingState> buildings = null, List<Population> population = null) : base(settlementName, settlementType, gold, food, wood, iron, buildings ?? [], population ?? [])
        {
        }
    }
}
