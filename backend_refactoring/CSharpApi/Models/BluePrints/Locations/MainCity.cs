
using CSharpApi.Models.BluePrints.Beings;
using CSharpApi.Models.BluePrints.BuildingTypes;

namespace CSharpApi.Models.BluePrints.Locations
{
    public class MainCity : City
    {
        public MainCity(string settlementName, float gold=2000, float food = 2000, float wood = 2000, float iron = 2000,List<BuildingState> buildingStates = null, List<IBuildingList> buildingList = null, List<Population> population = null, string settlementType = "main_city") : base(settlementName, gold, food, wood, iron, buildingStates, population ?? [new Commander("Gottfried"), new Worker("Abrams")], buildingList ?? [new HeadQuarter(), new BuildersHut()], settlementType)
        {
        }
    }
}
