namespace CSharpApi.Models.BluePrints
{
    public interface IBuildingList
    {
        public string Name { get; }
        public Dictionary<string, Dictionary<string, float>> Costs { get; }
    }
}
