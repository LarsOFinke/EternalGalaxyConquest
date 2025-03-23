using CSharpApi.Models.AstronomicalObjects;
using CSharpApi.Models.BluePrints.Locations;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Any;
using System;
using System.Collections;
using System.Collections.Generic;

namespace CSharpApi.Models.GamePlayObjects
{
    public class Player
    {
        private Guid Id;
        private string Name { get; set; } = string.Empty;

        private List<Base> Bases { get; set; } = [];

        private List<Dictionary<string, object>> Action { get; set; }


        public Player(string name, List<Base> bases)
        {
            Id = Guid.CreateVersion7(DateTime.UtcNow);

            Name = name;

            if (bases != null)
            {
                Bases = bases;
            }
            else
            {
                Bases.Add(new HomePlanet("Heimatplanet", []));
            }
        }

        public Dictionary<string, object> FetchPlayerState()
        {
            List<object> baseState = new();

            foreach (var bases in Bases)
            {
                baseState.Add(bases.FetchBaseState());

            }

            return new Dictionary<string, object> {
            {"category", "player" },
            {"name", Name },
            {"player_id", Id },
            {"base_states", baseState } };
        }

        public Dictionary<string, object> MatchPayloadAction(string action, List<object> context)
        {
            foreach (Dictionary<string, object> item in Action)
            {
                string lookup = item.GetValueOrDefault("name", "").ToString()!;

                if (!string.IsNullOrEmpty(lookup))
                {
                    lookup = lookup.ToString()!;
                    return new Dictionary<string, object>
                    {
                        { "action", lookup },
                        { "context", context }

                    };
                }
            }

            return new Dictionary<string, object> {
                    {"success", false},
                    {"message", $"No value for Key: NAME!"}
            };
        }

        public Dictionary<string, object> SelectBase(int target)
        {
            foreach (var targetBase in Bases)
            {
                if (targetBase.BaseId == target)
                {
                    return new Dictionary<string, object> {
                        {"success", true},
                        {"target", targetBase}
                    };
                }
            }

            return new Dictionary<string, object> {
                { "success", false },
                { "message", $"{target} nicht gefunden!" },
                { "target", $"{target} nicht gefunden!" }
            };
        }

    }
}