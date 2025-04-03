namespace CSharpApi.Models.BluePrints.Beings
{
    public class WarehouseWorker : Worker
    {
        public WarehouseWorker(string workerName, bool employed = true, string profession = "worker", bool alive = true, string fieldOfWork = "warehouseWorker", bool working = false, int production = 500) : base(workerName, employed, profession, alive, fieldOfWork, working, production)
        {
        }
    }
}
