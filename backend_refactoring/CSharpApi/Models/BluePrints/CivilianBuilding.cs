namespace CSharpApi.Models.BluePrints
{
    public class CivilianBuilding : BuildingState
    {
        public CivilianBuilding(string buildingName, bool active = true) : base(buildingName, active)
        {
        }
    }
}
