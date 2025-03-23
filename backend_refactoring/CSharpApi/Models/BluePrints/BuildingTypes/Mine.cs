
using CSharpApi.Models.BluePrints.Beings;
using CSharpApi.Models.BluePrints.Locations;

namespace CSharpApi.Models.BluePrints.BuildingTypes
{
    public class Mine : Factory
    {
        public Mine(string buildingName, bool active = true, int workerSlots = 0, List<Worker> workers = null) : base(buildingName, active, workerSlots, workers)
        {
        }
    }
}
