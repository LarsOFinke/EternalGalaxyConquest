namespace CSharpApi.Models.BluePrints.Beings
{
    public class Miner : Worker
    {
        public Miner(string workerName, bool employed = true, string profession = "worker", bool alive = true, string fieldOfWork = "miner", bool working = false, int production = 500) : base(workerName, employed, profession, alive, fieldOfWork, working, production)
        {
        }
    }
}
