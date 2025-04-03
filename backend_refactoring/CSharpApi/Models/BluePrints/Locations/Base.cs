using CSharpApi.Models.BluePrints.Beings;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using System.Collections.Generic;
using System.Xml.Linq;

namespace CSharpApi.Models.BluePrints.Locations
{
    public class Base
    {
        public static int BaseCount = 0;

        public int BaseId { get; set; }

        private string BaseType { get; set; } = string.Empty;
        private string BaseName { get; set; } = string.Empty;

        private int TileId { get; set; }

        private List<Settlement> Settlements { get; set; }


        public Base(string name, string baseType, int tileId, List<Settlement> settlements)
        {
            BaseCount++;
            BaseId = BaseCount;
            BaseType = baseType;
            BaseName = name;
            TileId = tileId;
            Settlements ??= settlements ?? [];
        }

        public Dictionary<string, object> FetchBaseState()
        {
            return new Dictionary<string, object> {
                { "category", "base" },
                { "name", BaseName },
                { "tile_id", TileId },
                { "base_id", BaseId },
                { "base_type", BaseType },
                { "settlement_states", Settlements}};
        }

        public Dictionary<string, object> MatchPayloadAction(string action, List<object> context)
        {

            return action switch
            {
                "Select Settlement" => SelectSettlement((int) context[0]),
                "Found City" => FoundCity((string)context[0]),
                "Change Name" => ChangeName((string)context[0]),
                "Found Outpost" => FoundOutpost((string)context[0]),
                _ => new Dictionary<string, object>() {
                                { "success", false },
                                { "message", "No Matching Action Found!!" }
                            },
            };            
        }

        public Dictionary<string, object> SelectSettlement(int targetId)
        {
            foreach (var settlement in Settlements)
            {
                if (settlement.SettlementId == targetId)
                {
                    return new Dictionary<string, object>
                    {
                        { "success", true }, 
                        { "target", settlement }
                    };
                }
            }

            return new Dictionary<string, object>
                    {
                        { "success", false },
                        { "target", $"{targetId} nicht gefunden!" }
                    };
        }

        public Dictionary<string, object> ChangeName(string newName)
        {
            BaseName = newName;

            return new Dictionary<string, object> {
                { "success", true },
                { "message", $"Umbenennung in '{newName}' erfolgreich!" },
                { "update", new Dictionary<string, object> {
                    { "action", "Change Base Name" },
                    { "base_id", BaseId },
                    { "name", newName }
                }
                }
            };
        }

        public Dictionary<string, object> FoundOutpost(
            string outpostName,
            float gold = 500,
            float food = 250,
            float wood = 500,
            float iron = 50,
            List<BuildingState> buildings = null,
            List<Population> population = null)
        {
            buildings ??= [];
            population ??= [];

            Outpost NewOutpost = new(outpostName, gold, food, wood, iron, "outpost", buildings, population);
            
            Settlements.Add(NewOutpost);

            return new Dictionary<string, object> {
                { "success", true },
                { "message", $"Neuer Außenposten erfolgreich gegründet auf: {BaseName}!" },
                { "update", new Dictionary<string, object> {
                    { "base_id", BaseId},
                    { "settlement_id", Settlements[^1].SettlementId },
                    { "outpost_name", outpostName },
                    { "resources", new Dictionary<string, object> {
                        { "gold", gold },
                        { "food", food },
                        { "wood", wood },
                        { "iron", iron }}},
                    { "buildings", buildings },
                    { "population", population },
                    { "free_workers", Settlements[^1].FreeWorkers },
                    { "free_builders",  Settlements[^1].FreeBuilders }
                    }}};
        }

        public Dictionary<string, object> FoundCity(
            string cityName,
            float gold = 1000,
            float food = 500,
            float wood = 750,
            float iron = 200,
            List<BuildingState> buildings = null,
            List<Population> population = null)
        {
            buildings ??= [];
            population ??= [];

            City NewOutpost = new City(cityName, gold, food, wood, iron, buildings, population);

            Settlements.Add(NewOutpost);

            return new Dictionary<string, object> {
                { "success", true },
                { "message", $"Neue Stadt erfolgreich gegründet auf: {BaseName}!" },
                { "update", new Dictionary<string, object> {
                    { "base_id", BaseId},
                    { "settlement_id", Settlements[^1].SettlementId },
                    { "outpost_name", cityName },
                    { "resources", new Dictionary<string, object> {
                        { "gold", gold },
                        { "food", food },
                        { "wood", wood },
                        { "iron", iron }}},
                    { "buildings", buildings },
                    { "population", population },
                    { "free_workers", Settlements[^ 1].FreeWorkers },
                    { "free_builders",  Settlements[^ 1].FreeBuilders }
                    }}};
        }
    }
}
