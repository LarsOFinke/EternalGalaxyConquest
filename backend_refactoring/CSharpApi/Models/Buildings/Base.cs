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


        private List<Dictionary<string, object>> ActionList { get; set; } = [];

        private List<object> Settlements { get; set; } = new List<object>();


        public Base(string name, string baseType, int tileId, List<object> settlements)
        {
            BaseCount++;
            ActionList = [
                new Dictionary<string, object>{ { "name", "Select Settlement" } , { Action.SelectSettlement, SelectSettlement } },
                new Dictionary<string, object> { { "name", "Change Name" }, { Action.ChangeName, ChangeName } },
                new Dictionary<string, object> { { "name", "Found City" }, { Action.FoundCity, FoundCity } },
                new Dictionary<string, object> { { "name", "Found Outpost" }, { Action.FoundOutpost, FoundOutpost }} ];

            BaseId = BaseCount;
            BaseType = baseType;
            BaseName = name;
            TileId = tileId;
            Settlements = settlements;
        }

        public Dictionary<string, object> FetchBaseState()
        {
            return new Dictionary<string, object> {
                { "category", "base" },
                { "name", BaseName },
                { "tile_id", TileId },
                { "base_id", BaseId },
                { "base_type", BaseType },
                { "settlement_states", new List<object> (Settlements.ForEach( settlement => settlement.FetchSettlementState())) }};
        }

        public Dictionary<string, object> MatchPayloadAction(string action, List<object> context)
        {
            foreach (var act in ActionList)
            {
                if (act.ContainsValue(action))
                {
                    switch (action)
                    {
                        case Action.SelectSettlement.ToString():
                            return SelectSettlement(context);
                        case Action.FoundCity:
                            return FoundCity(context);
                        case Action.ChangeName:
                            return ChangeName(context);
                        case Action.FoundOutpost:
                            return FoundOutpost(context);
                        default:
                            return new Dictionary<string, object>() {
                                { "success", false },
                                { "message", "No Matching Action Found!!" }
                            };
                    };
                }
            }
        }

        public Dictionary<string, object> SelectSettlement(object target)
        {
            foreach (var settlement in Settlements)
            {
                if (settlement.Id = (int) target)
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
                        { "target", $"{(string)target} nicht gefunden!" }
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
            List<object> buildings = null,
            List<object> population = null)
        {
            buildings ??= [];
            population ??= [];

            Outpost NewOutpost = new Outpost(outpostName, gold, food, wood, iron, buildings, population);
            
            Settlements.Add(NewOutpost);

            return new Dictionary<string, object> {
                { "success", true },
                { "message", $"Neuer Außenposten erfolgreich gegründet auf: {BaseName}!" },
                { "update", new Dictionary<string, object> {
                    { "action", Action.FoundOutpost },
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
                    { "free_workers", Settlements[^1].FreeWorkers()["free_workers"] },
                    { "free_builders",  Settlements[^1].FreeBuilders()["free_builders"] }
                    }}};
        }

        public Dictionary<string, object> FoundCity(
            string cityName,
            float gold = 1000,
            float food = 500,
            float wood = 750,
            float iron = 200,
            List<object> buildings = null,
            List<object> population = null)
        {
            buildings ??= [];
            population ??= [];

            City NewOutpost = new City(outpostName, gold, food, wood, iron, buildings, population);

            Settlements.Add(NewOutpost);

            return new Dictionary<string, object> {
                { "success", true },
                { "message", $"Neue Stadt erfolgreich gegründet auf: {BaseName}!" },
                { "update", new Dictionary<string, object> {
                    { "action", Action.FoundCity },
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
                    { "free_workers", Settlements[^1].FreeWorkers()["free_workers"] },
                    { "free_builders",  Settlements[^1].FreeBuilders()["free_builders"] }
                    }}};
        }


        enum Action
        {
            SelectSettlement,
            ChangeName,
            FoundCity,
            FoundOutpost
        }
    }
}
