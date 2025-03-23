namespace CSharpApi.Models.BluePrints.Beings
{
    public class Worker : Human
    {
        public string WorkerName { get; set; } = string.Empty;
        public bool Employed { get; set; } = false;
        public string FieldOfWork { get; set; } = string.Empty;

        // public bool Working = false;

        public bool Alive { get; set; } = true;

        public int Production { get; set; } = 0;

        // public string Profession { get; set; } = "worker";

        public Worker(string workerName,
            bool employed = false,
            string profession = "worker",
            bool alive = true,
            string fieldOfWork = "unskilled",
            bool working = false,
            int production = 0) 
            : base(workerName, profession, alive)
        {
            WorkerName = workerName;
            Profession = profession;
            Employed = employed;
            Alive = alive;
            FieldOfWork = fieldOfWork;
            Working = working;

        }
    }
}
