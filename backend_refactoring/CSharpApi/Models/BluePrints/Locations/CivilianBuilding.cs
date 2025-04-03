namespace CSharpApi.Models.BluePrints.Locations
{
    public class CivilianBuilding : BuildingState
    {
        public CivilianBuilding(string buildingName, bool active = true) : base(buildingName, active)
        {
        }
    }
}
