namespace CSharpApi.Models.BluePrints.Beings
{
    public class Human : Population
    {
        public Human(string humanName, string profession, bool alive = true) 
            : base(humanName, profession, alive )
        { 
            
        }
    }
}
