
using CSharpApi.Models.BluePrints.Beings;

namespace CSharpApi.Models.BluePrints.Locations
{
    public class City : Settlement
    {
        public City(string settlementName, float gold, float food, float wood, float iron, List<BuildingState> buildingStates = null!, List<Population> population = null!, List<IBuildingList> buildingLists = null!, string settlementType = "city") 
            : base(settlementName, settlementType, gold, food, wood, iron, buildingStates ?? [], population ?? [], buildingLists ?? [])
        {
        }
    }
}
