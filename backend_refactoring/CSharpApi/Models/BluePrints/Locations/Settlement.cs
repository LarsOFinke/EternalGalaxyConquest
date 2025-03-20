using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Reflection.Metadata.Ecma335;
using CSharpApi.Models.BluePrints.Beings;
using CSharpApi.Models.BluePrints.BuildingTypes;
using Microsoft.EntityFrameworkCore;

namespace CSharpApi.Models.BluePrints
{
    public class Settlement
    {
        public static int SettlementCount { get; set; } = 0;

        private int _settlementId = 0;
        private readonly string _settlementName = string.Empty;
        private readonly string _settlementType;
        private float _gold = 0;
        private float _food = 0;
        private float _wood = 0;
        private float _iron = 0;
        private List<IBuildingList> _buildings = [];
        private List<object> _population = [];
        private List<object> _freeWorkers = [];
        private List<object> _freeBuilders = [];
        private List<Dictionary<string, object>> _actionList = [];

        private readonly List<IBuildingList> _buildingList =
                [
                    new HeadQuarter(),
                    new BuildersHut(),
                    new Warehouse(),
                    new Bakery(),
                    new Sawmill(),
                    new GoldMine(),
                    new IronMine(),
                    new Forge()

                ];

        public Settlement(string settlementName,
            string settlementType,
            float gold,
            float food,
            float wood,
            float iron,
            List<IBuildingList> buildings = null,
            List<object> population = null
            )
        {
            _buildings = buildings ??= [];
            _population = population ??= [];
            _settlementName = settlementName;
            _food = food;
            _wood = wood;
            _iron = iron;
            _gold = gold;

            SettlementCount++;

            _actionList =
            [ new() { { "name", "Select Building" }, { "action", SelectBuilding } },
              new() { { "name", "Select Population" }, { "action", SelectPopulation} },
              new() { { "name", "Build" }, { "action", Build } },
              new() { { "name",  "Create Worker" }, { "action", CreateWorker } },
              new() { { "name", "Remove Building" }, { "action", RemoveBuilding } },
              new() { { "name", "Get Resources" }, { "action", GetResources } },
              new() { { "name", "Get Buildings" }, { "action", GetBuildings } },
              new() { { "name", "Get Population" }, { "action", GetPopulation } },
              new() { { "name", "Add_population" }, { "action", AddPopulation } },
              new() { { "name", "Remove_population" }, { "action", RemovePopulation } },
              new() { { "name", "Get Free Workers" }, { "action", GetFreeWorkers } },
              new() { { "name", "Add Free Worker" }, { "action", self.set_free_workers } },
              new() { { "name", "Remove Free Worker" }, { "action", SetFreeWorkers } },
              new() { { "name", "Get Free Builders" }, { "action", self.get_free_builders } },
              new() { { "name", "Add Free Builders" }, { "action", self.add_free_builders } },
              new() { { "name", "Remove Free Builders" }, { "action", self.remove_free_builders } }
            ];

          
            Dictionary<string, IBuildingList> buildOptions = new()
            {
                { "Builders Hut", new BuildersHut() },
                { "Residential Area", new ResidentialArea() },
                { "Warehouse", new Warehouse() },
                { "Bakery", new Bakery() },
                { "Sawmill", new Sawmill() },
                { "Gold Mine", new GoldMine() },
                { "Iron Mine", new IronMine() },
                { "Forge", new Forge() },
            };

            _settlementId = SettlementCount;

            _settlementType = settlementType;

            _freeBuilders = GetFreeBuildersOrWorkers(true);
            _freeWorkers = GetFreeBuildersOrWorkers(false);

        }

        private List<object> GetFreeBuildersOrWorkers(bool getBuilders)
        {
            var builders = new List<object>();
            foreach (var builder in _population)
            {
                switch (getBuilders)
                {
                    case true:
                        if (String.Equals(builder.Profession, "worker", StringComparison.InvariantCultureIgnoreCase) &&
                            builder.working == false && String.Equals(builder.FieldOfWork, "builder", StringComparison.InvariantCultureIgnoreCase))
                        {
                            builders.Add(builder);
                        }

                        break;

                    case false:
                        if (String.Equals(builder.Profession, "worker", StringComparison.InvariantCultureIgnoreCase) &&
                            builder.working == false) builders.Add(builder);
                        break;

                }
            }
            return builders;
        }

        public Dictionary<string, object> FetchSettlementState()
        {
            return new Dictionary<string, object> {
                { "category", "settlement" },
                { "settlement_id", _settlementId },
                { "settlement_type", _settlementType },
                { "name", _settlementName },
                { "resources", GetResources()["resources"] },
                { "building_states", GetBuildingState() },
                { "population_states", GetPopulationState() },
                { "free_workers", GetWorkersOrBuildersDetails(_freeWorkers) },
                { "free_builders", GetWorkersOrBuildersDetails(_freeBuilders) } };
        }

        private List<object> GetPopulationState()
        {
            var populationStates = new List<object>();
            foreach (var state in _population)
            {
                populationStates.Add(state.FetchPopulationState());
            }
            return populationStates;
        }

        public List<object> GetBuildingState()
        {
            var buildingStates = new List<object>();
            foreach (var buildingState in _buildings)
            {
                buildingStates.Add(buildingState.FetchBuildingState());
            }
            return buildingStates;
        }

        public List<Dictionary<string, object>> GetWorkersOrBuildersDetails(List<object> elements)
        {
            var objectNameId = new List<Dictionary<string, object>>();
            int i = 0;

            foreach (var element in elements)
            {
                objectNameId[0] = new() { { "name", element.Name }, { "population_id", element.PopulationId } };
            }
            return objectNameId;
        }


        public Dictionary<string, object> GetResources()
        {
            return new Dictionary<string, object>
            {
                { "success", true },
                { "resources", new Dictionary<string, object> {
                    { "gold", _gold },
                    { "food", _food },
                    { "wood", _wood },
                    {"iron", _iron } }
                }
            };
        }

        public Dictionary<string, object> GetInstanceBuildings() => new Dictionary<string, object>
        {
            { "success", true },
            { "buildings", _buildings },
        };

        public void SetInstanceBuildings(IBuildingList building, bool increase = true)
        {
            switch (increase)
            {
                case true:
                    _buildings.Add(building); break;
                case false:
                    _buildings.Remove(building); break;
            }
            return;
        }

        public Dictionary<string, object> GetInstancePopulation() => new()
        {
            { "success", true },
            { "population", _population },
        };

        public void SetInstancePopulation(object person, bool increase = true)
        {
            switch (increase)
            {
                case true:
                    _population.Add(person); break;
                case false:
                    _population.Remove(person); break;
            }
            return;
        }

        /// <summary>
        /// Add Or Remove a Person from this Instance Population.
        /// <br>Defaults to Adding a Person.</br>
        /// </summary>
        /// <param name="person"></param>
        /// <param name="addPerson"></param>
        /// <returns>Returns a Dictionary with string as key and bool as value</returns>
        public Dictionary<string, bool> AddOrRemoveInstancePopulation(object person, bool addPerson = true)
        {
            SetInstancePopulation(person, addPerson);

            return new() { { "succcess", true } };
        }

        public Dictionary<string, object> MatchPayLoad(string action, List<object> context)
        {
            foreach (var act in _actionList)
            {
                if (String.Equals(act["name"] as string, action, StringComparison.InvariantCultureIgnoreCase))
                {
                    return new() { { "success", context } };
                }
            }

            return new() { { "success", false }, { "message", $"Inexistent Action: {action}" } };
        }

        public Dictionary<string, object> SelectBuilding(string target)
        {
            foreach (var building in _buildings)
            {
                if (String.Equals(building.Name, target, StringComparison.InvariantCultureIgnoreCase))
                {
                    return new() { { "success", true }, { "target", building } };

                    
                }
            }

            return new() { { "success", false }, { "message", $"Target: {target} nicht gefunden!" } };
        }

        public Dictionary<string, object> SelectInstancePopulation(int populationId)
        {
            foreach (var person in _population)
            {
                if (populationId == person.Id)
                {
                    return new() { { "success", true }, { "target", person } };
                }
            }

            return new() { { "success", false }, { "message", $"Person mit ID: {populationId} nicht gefunden!" } };
        }

        public Dictionary<string, object> ConstructBuilding(IBuildingList building)
        {
            var hasBuilding = _buildings.Contains(building);
            var matchingBuidingName = building is BuildersHut;
            var availableBuilders = _freeBuilders.Count > 0;

            if (!hasBuilding && (!availableBuilders || !hasBuilding))
            {
                return new() { 
                    { "success", false }, 
                    { "message", "Zuerst eine Bauhütte bauen!" },
                    { "available_builders", availableBuilders },
                    { "available_builders_hut", hasBuilding }
                };
            }

            if (hasBuilding) return new() { { "success", false }, { "message", $"{building.Name} bereits vorhanden!" } };

            var result = CheckResources(building.Costs["costs"]);

            if (!(bool)result["success"])
            {
                return result;
            }

            SetInstanceBuildings(building, increase: true);

            return new() { { "success", true }, { "message", $"{building.Name} erfolgreich gebaut!"} };

        }

        public Dictionary<string, object> CreateInstanceWorker(string name)
        {
            Dictionary<string, float> workerCosts = new()
            {

                { "gold", 100},
                { "food", 200 },
                { "wood", 50 },
                { "iron", 0 }
            };

            var result = CheckResources(workerCosts);

            if (!(bool)result["success"]) return result;

            var newWorker = new Worker(name);

            SetInstancePopulation(newWorker);
            _freeWorkers.Add(newWorker);

            return new()
            {
                { "success", true},
                { "message", "Neuer Arbeiter erfolgreich angeheuert!"},
                { "update", new Dictionary<string, object> {
                    { "action", "Create Worker" },
                    { "settlement_id",_settlementId },
                    { "population_id", newWorker.GetPopulationId()},
                    { "name", newWorker.WorkerName },
                    { "profession", newWorker.Profession },
                    { "alive", newWorker.Alive },
                    { "employed", newWorker.Employed },
                    { "field_of_work", newWorker.FieldOfWork },
                    { "working", newWorker.Working },
                    { "production", newWorker.Production } } }
                };

    }

        public Dictionary<string, object> CheckResources(Dictionary<string, float> keyValuePairs)
        {
            foreach ((string resource, float value) in keyValuePairs.AsEnumerable())
            {
                if (value - keyValuePairs[resource] < 0)
                {
                    return new() {
                    { "success", false },
                      { "message", $"Nicht genug {resource}" }
                    };
                }

            }

            _gold -= keyValuePairs["gold"];
            _food -= keyValuePairs["food"];
            _wood -= keyValuePairs["wood"];
            _iron -= keyValuePairs["iron"];


            return new() { {"success", true } };

        }
      
        
    }
}