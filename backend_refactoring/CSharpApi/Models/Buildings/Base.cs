using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using System.Collections.Generic;
using System.Xml.Linq;

namespace CSharpApi.Models.Buildings
{
    public class Base
    {
        public static int BaseCount = 0;

        private int BaseId { get; set; }

        private string BaseType { get; set; } = string.Empty;
        private string BaseName { get; set; } = string.Empty;

        private int TileId { get; set; }


        private List<Dictionary<string, Object>> ActionList { get; set; } = [];

        private List<Object> Settlements { get; set; } = new List<Object>();


        public Base(string name, string baseType, int tileId, List<Object> settlements)
        {
            BaseCount++;
            ActionList = [
                new Dictionary<string, Object>{ { "name", "Select Settlement" } , { "action", SelectSettlement } },
                new Dictionary<string, Object> { { "name", "Change Name" }, { "action", ChangeName } },
                new Dictionary<string, Object> { { "name", "Found City" }, {"action", FoundCity } },
                new Dictionary<string, Object> { { "name", "Found Outpost" }, {"action", FoundOutpost }} ];

            BaseId = BaseCount;
            BaseType = baseType;
            BaseName = name;
            TileId = tileId;
            Settlements = settlements;
        }

        public Dictionary<string, Object> FetchBaseState() {
            return new Dictionary<string, Object> { 
                { "category", "base" },
                { "name", BaseName },
                { "tile_id", TileId },
                { "base_id", BaseId },
                { "base_type", BaseType },
                { "settlement_states", new List<Object> (Settlements.ForEach( settlement => settlement.FetchSettlementState())) }};
        }

        public Dictionary <string, Object> MatchPayloadAction(string action, List<Object> context) {
            foreach (var act in ActionList)
            {
                if(act.TryGetValue("name", out var payload)) return new Dictionary<string, Object { act["action"] = payload;
                
            }
        }
}
