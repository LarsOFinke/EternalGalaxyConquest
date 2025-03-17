using CSharpApi.Data;
using CSharpApi.Models.BluePrints;
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

        private List<object> Settlements { get; set; } = new List<object>();

        public Planet(string name, string baseType, int tileId, List<object> settlements) {
            Name = name;
            BaseType = baseType;
            TileId = tileId;
            Settlements = settlements;
        }
    }
}