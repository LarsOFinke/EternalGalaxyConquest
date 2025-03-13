using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Any;
using System;
using System.Collections;
using System.Collections.Generic;

namespace CSharpApi.Models
{
    public class Player
    {
        private Guid Id;
        private string Name { get; set; } = string.Empty;

        private List<Object> Bases { get; set; } = new List<Object>();

        private List<Dictionary<string, Object>> Action { get; set; }


        public Player(string name, List<Object> bases)
        {
            Id = Guid.CreateVersion7(DateTime.UtcNow);

            Name = name;

            if (bases != null)
            {
                Bases = bases;
            }
            else
            {
                Bases.Add(new HomePlanet("Heimatplanet"));
            }
        }

        public Dictionary<string, Object> FetchPlayerState()
        {
            List<Object> baseState = new();

            foreach (var bases in Bases)
            {
                baseState.Add(bases.FetchBaseState());

            }

            return new Dictionary<string, Object> {
            {"category", "player" },
            {"name", this.Name },
            {"player_id", this.Id },
            {"base_states", baseState } };
        }

        public Dictionary<string, Object> MatchPayloadAction(string action, List<Object> context)
        {
            foreach (Dictionary<string, Object> item in Action)
            {
                string lookup = item.GetValueOrDefault("name", "").ToString()!;

                if (!string.IsNullOrEmpty(lookup))
                {
                    lookup = lookup.ToString()!;
                    return new Dictionary<string, Object>
                    {
                        { "action", lookup },
                        { "context", context }

                    };
                }
            }

            return new Dictionary<string, Object> {
                    {"success", false},
                    {"message", $"No value for Key: NAME!"}
            };
        }

        public Dictionary<string, Object> SelectBase(int target)
        {
            foreach (var targetBase in Bases)
            {
                if (targetBase.Id == target)
                {
                    return new Dictionary<string, Object> {
                        {"success", true},
                        {"target", targetBase}
                    };
                }
            }

            return new Dictionary<string, Object> {
                { "success", false },
                { "message", $"{target} nicht gefunden!" },
                { "target", $"{target} nicht gefunden!" }
            };
        }

    }
}