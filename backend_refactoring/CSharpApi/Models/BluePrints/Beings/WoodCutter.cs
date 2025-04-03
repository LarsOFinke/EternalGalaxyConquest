namespace CSharpApi.Models.BluePrints.Beings
{
    public class WoodCutter : Worker
    {
        public WoodCutter(string workerName, bool employed = true, string profession = "worker", bool alive = true, string fieldOfWork = "woodcutter", bool working = false, int production = 500) : base(workerName, employed, profession, alive, fieldOfWork, working, production)
        {
        }
    }
}
