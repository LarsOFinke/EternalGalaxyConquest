using CSharpApi.Data;
using Microsoft.EntityFrameworkCore;
using System.Xml.Linq;

namespace CSharpApi.Models
{
    public class Planet
    {
        private EternalDatabaseContext _dbContext;



        private string Name { get; set; } = string.Empty;
        private string BaseType { get; set; } = "planet";

        private int TileId { get; set; }

        private List<Object> Settlements { get; set; } = new List<Object>();

        public Planet(string name, string baseType, int tileId, List<Object> settlements, EternalDatabaseContext context)
        {
            Name = name;
            BaseType = baseType;
            TileId = tileId;

        }
    }
}