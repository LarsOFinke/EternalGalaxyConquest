
using CSharpApi.Models.BluePrints.Beings;
using CSharpApi.Models.BluePrints.BuildingTypes;

namespace CSharpApi.Models.BluePrints.Locations
{
    public class MainCity : City
    {
        public MainCity(string settlementName, float gold=2000, float food = 2000, float wood = 2000, float iron = 2000, List<IBuildingList> buildings = null, List<object> population = null, string settlementType = "main_city") : base(settlementName, gold, food, wood, iron, buildings ?? [new HeadQuarter(), new BuildersHut()], population ?? [new Commander("Gottfried"), new Worker("Abrams")], settlementType)
        {
        }
    }
}
