using System;

namespace CSharpApi.Models.GamePlayObjects
{
    public class Tile
    {
        private int TileId { get; set; }
        private string Owner {  get; set; } = string.Empty;
        private int OwnerId { get; set; }

        private string TileType { get; set; } = string.Empty;
        private string TileName { get; set; } = string.Empty;
        private Dictionary<string, object> TileContent { get; set; } = [];


        public Tile(int tileId, string owner, int ownerId, string tileType, string tileName, Dictionary<string, object> tileContent)
        {
            TileId = tileId;
            Owner = owner;
            OwnerId = ownerId;
            TileType = tileType; 
            TileName = tileName;
            TileContent = tileContent;
        }

        public Dictionary<string, object> FetchTileState() {

            return new Dictionary<string, object    >
            {
                { "id", TileId },
                { "owner", Owner },
                { "owner_id", OwnerId },
                { "tile_type", TileType },
                { "tile_content", TileContent.GetValueOrDefault("base", new Dictionary<string, object>()) }
            };
        }
    }
}
