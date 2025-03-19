namespace CSharpApi.Models.BluePrints
{
    public class MilitaryBuilding : BuildingState
    {
        public MilitaryBuilding(string buildingName, bool active = true) : base(buildingName, active)
        {
        }
    }
}
