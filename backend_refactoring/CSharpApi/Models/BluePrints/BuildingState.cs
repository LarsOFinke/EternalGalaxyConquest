using Microsoft.EntityFrameworkCore;
using System.Xml.Linq;
using System;

namespace CSharpApi.Models.BluePrints
{ 
    public class BuildingState
    {
        public static int BuildingCount { get; set; } = 0;

        private string BuildingName { get; set; } = string.Empty;

        private bool Active { get; set; }

        private int BuildingId { get; set; }

        public BuildingState(string buildingName, bool active = true) 
        {
            BuildingName = buildingName;
            Active = active;
            BuildingId = BuildingCount++;
        }

        public Dictionary<string, object> FetchBuildingState()
        {
            return new Dictionary<string, object> {
                { "category", "building" },
                { "name", BuildingName },
                { "active", Active },
                { "building_id", BuildingId } };
        }
    }
}
