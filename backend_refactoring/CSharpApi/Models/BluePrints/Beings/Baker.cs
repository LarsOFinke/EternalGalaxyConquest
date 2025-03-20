namespace CSharpApi.Models.BluePrints.Beings
{
    public class Baker : Worker
    {
        public Baker(string workerName, bool employed = true, string profession = "worker", bool alive = true, string fieldOfWork = "baker", bool working = false, int production = 500) : base(workerName, employed, profession, alive, fieldOfWork, working, production)
        {
        }
    }
}
