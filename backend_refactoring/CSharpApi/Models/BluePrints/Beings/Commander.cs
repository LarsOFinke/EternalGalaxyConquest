namespace CSharpApi.Models.BluePrints.Beings
{
    public class Commander : Human
    {
        public Commander(string humanName, string profession = "leader", bool alive = true) : base(humanName, profession, alive)
        {
        }
    }
}
