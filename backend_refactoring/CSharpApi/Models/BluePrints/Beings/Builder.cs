namespace CSharpApi.Models.BluePrints.Beings
{
    public class Builder : Worker
    {
        public Builder(string workerName, bool employed = false, string profession = "worker", bool alive = true, string fieldOfWork = "builder", bool working = false, int production = 500) : base(workerName, employed, profession, alive, fieldOfWork, working, production)
        {
        }
    }
}
