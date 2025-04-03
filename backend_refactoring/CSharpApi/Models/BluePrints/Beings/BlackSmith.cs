namespace CSharpApi.Models.BluePrints.Beings
{
    public class BlackSmith : Worker
    {
        public BlackSmith(string workerName, bool employed = true, string profession = "worker", bool alive = true, string fieldOfWork = "blacksmith", bool working = false, int production = 500) : base(workerName, employed, profession, alive, fieldOfWork, working, production)
        {
        }
    }
}
