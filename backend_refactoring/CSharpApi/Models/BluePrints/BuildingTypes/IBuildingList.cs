using CSharpApi.Models.BluePrints;

namespace CSharpApi.Models.BluePrints
{
    public interface IBuildingList
    {
        public string Name { get; set; }
        public Dictionary<string, Dictionary<string, float>> Costs { get; set; }
    }
}