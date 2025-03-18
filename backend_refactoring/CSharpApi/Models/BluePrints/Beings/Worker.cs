namespace CSharpApi.Models.BluePrints.Beings
{
    public class Worker : Human
    {
        private string _workerName { get; set; } = string.Empty;
        private bool _employed { get; set; } = false;
        private string _fieldOfWork { get; set; } = string.Empty;

        private bool _working = false;

        private int production = 0;

        private string _profession { get; set; } = "worker";

        public Worker(string workerName,
            string profession = "worker",
            bool alive = true,
            string fieldOfWork = "unskilled",
            bool working = false,
            int production = 0) 
            : base(workerName, profession, alive)
        {
            _workerName = workerName;
            _profession = profession;
            _employed = alive;
            _fieldOfWork = fieldOfWork;
            _working = working;

        }
    }
}
