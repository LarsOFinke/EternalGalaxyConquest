using CSharpApi.Data;
using CSharpApi.Models.BluePrints;
using CSharpApi.Models.BluePrints.Locations;
using Microsoft.EntityFrameworkCore;
using System.Runtime.InteropServices;
using System.Xml.Linq;

namespace CSharpApi.Models.AstronomicalObjects
{
    public class Planet : ICelestialObject
    {
        public string Name { get; set; } = string.Empty;

        string ICelestialObject.Name => Name;

        private string BaseType { get; set; } = "planet";

        private int TileId { get; set; } = 0;

        private List<Settlement> Settlements { get; set; } = [];

        public Planet(string name, string baseType, int tileId, List<Settlement> settlements) {
            Name = name;
            BaseType = baseType;
            TileId = tileId;
            Settlements = settlements;
        }
    }
}