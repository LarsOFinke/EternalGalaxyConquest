namespace CSharpApi.Models.BluePrints
{
    public interface IBuildingList
    {
        public static string Name { get; set; }
        public static Dictionary<string, Dictionary<string, float>> Costs { get; set; }
    }
}
