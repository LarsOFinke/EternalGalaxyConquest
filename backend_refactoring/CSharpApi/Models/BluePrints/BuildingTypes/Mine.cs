
using CSharpApi.Models.BluePrints.Beings;

namespace CSharpApi.Models.BluePrints
{
    public class Mine : Factory
    {
        public Mine(string buildingName, bool active = true, int workerSlots = 0, List<Worker> workers = null) : base(buildingName, active, workerSlots, workers)
        {
        }
    }
}
