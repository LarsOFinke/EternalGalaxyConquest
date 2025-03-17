
namespace CSharpApi.Models.BluePrints.BuildingTypes
{
    public class BuildersHut : IBuildingList
    {
        public string Name => "Builders Hut";

        public Dictionary<string, Dictionary<string, float>> Costs => new()
        {
            {
                "costs", new()
                {
                    { "gold", 200 },
                    { "food", 150 },
                    { "wood", 200 },
                    { "iron", 50 }
                }
            }
        };
    }
}
