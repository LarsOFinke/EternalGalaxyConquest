// Ignore Spelling: Api

using CSharpApi.Models.BluePrints.Beings;
using CSharpApi.Models.BluePrints.BuildingTypes;

namespace CSharpApi.Models.BluePrints.Locations
{
    public class Settlement
    {
        public static int SettlementCount { get; set; } = 0;

        public int SettlementId { get; set; } = 0;
        private readonly string _settlementName = string.Empty;
        private readonly string _settlementType;
        private float _gold = 0;
        private float _food = 0;
        private float _wood = 0;
        private float _iron = 0;
        private List<BuildingState> BuildingStates = [];
        public List<Population> Population = [];
        public List<Worker> FreeWorkers = [];
        public List<Builder> FreeBuilders = [];

        public object MatchPayLoad(string action, object context)
        {
            return action switch
            {
                "Select Population" => SelectInstancePopulation((int)context),
                "Select Building" => SelectBuilding((string)context),
                "Build" => ConstructBuilding((IBuildingList)context),
                "Create Worker" => CreateInstanceWorker((string)context),
                "Remove Building" => SetInstanceBuildings((IBuildingList)context, false),
                "Get Resources" => GetResources(),
                "Get Buildings" => GetInstanceBuildings(),
                "Get Population" => GetInstancePopulation(),
                "Add Population" => AddOrRemoveInstancePopulation((Population)context, true),
                "Remove Population" => AddOrRemoveInstancePopulation((Population)context, false),
                "Get Free Workers" => GetFreeBuildersOrWorkers(false),
                "Add Free Worker" => () => { FreeWorkers.Add((Worker) context); return FreeWorkers; },
                "Remove Free Worker" => () => { FreeWorkers.Remove((Worker)context); return FreeWorkers; },
                "Get Free Builder" => GetFreeBuildersOrWorkers(true),
                "Add Free Builder" => () => { FreeBuilders.Add((Builder)context); return FreeBuilders; } ,
                "Remove Free Builder" => () => { FreeBuilders.Remove((Builder)context); return FreeBuilders; },
                _ =>  new Dictionary<string, object> { { "success", false }, { "message", $"Inexistent Action: {action}" } }
            };
        }

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
            List<BuildingState> buildings = null,
            List<Population> population = null
            )
        {
            BuildingStates = buildings ?? [];
            Population = population ?? [];
            _settlementName = settlementName;
            _food = food;
            _wood = wood;
            _iron = iron;
            _gold = gold;

            SettlementCount++;
          
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

            SettlementId = SettlementCount;

            _settlementType = settlementType;

            FreeBuilders = GetFreeBuildersOrWorkers(true) as List<Builder> ?? [];
            FreeWorkers = GetFreeBuildersOrWorkers(false) as List<Worker> ?? [];

        }

        private dynamic GetFreeBuildersOrWorkers(bool getBuilders)
        {
            var builders = new List<dynamic>();
            foreach (var builder in Population)
            {
                switch (getBuilders)
                {
                    case true:
                        if (string.Equals(builder.Profession, "worker", StringComparison.InvariantCultureIgnoreCase) &&
                            builder.Working == false && string.Equals(builder.FieldOfWork, "builder", StringComparison.InvariantCultureIgnoreCase))
                        {
                            builders.Add(builder);
                        }

                        break;

                    case false:
                        if (string.Equals(builder.Profession, "worker", StringComparison.InvariantCultureIgnoreCase) &&
                            builder.Working == false) builders.Add(builder);
                        break;
                }
            }
            return builders;
        }

        

        public Dictionary<string, object> FetchSettlementState()
        {
            return new Dictionary<string, object> {
                { "category", "settlement" },
                { "settlement_id", SettlementId },
                { "settlement_type", _settlementType },
                { "name", _settlementName },
                { "resources", GetResources()["resources"] },
                { "building_states", GetBuildingState() },
                { "population_states", GetPopulationState() },
                { "free_workers", GetWorkersOrBuildersDetails(FreeWorkers) },
                { "free_builders", GetWorkersOrBuildersDetails(FreeBuilders) } };
        }

        private List<object> GetPopulationState()
        {
            var populationStates = new List<object>();
            foreach (var state in Population)
            {
                populationStates.Add(state.FetchPopulationState());
            }
            return populationStates;
        }

        public List<Dictionary<string, object>> GetBuildingState()
        {
            var buildingStates = new List<Dictionary<string, object>>();
            foreach (var buildingState in BuildingStates)
            {
                buildingStates.Add(buildingState.FetchBuildingState());
            }
            return buildingStates;
        }

        public List<Dictionary<string, object>> GetWorkersOrBuildersDetails(dynamic elements)
        {
            var objectNameId = new List<Dictionary<string, object>>();

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
            { "buildings", _buildingList },
        };

        public List<IBuildingList> SetInstanceBuildings(IBuildingList building, bool increase = true)
        {
            switch (increase)
            {
                case true:
                    _buildingList.Add(building); break;
                case false:
                    _buildingList.Remove(building); break;
            }
            return _buildingList;
        }

        public Dictionary<string, object> GetInstancePopulation() => new()
        {
            { "success", true },
            { "population", Population },
        };

        public void SetInstancePopulation(Population person, bool increase = true)
        {
            switch (increase)
            {
                case true:
                    Population.Add(person); 
                    break;
                case false:
                    Population.Remove(person); 
                    break;
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
        public Dictionary<string, bool> AddOrRemoveInstancePopulation(Population person, bool addPerson = true)
        {
            SetInstancePopulation(person, addPerson);

            return new() { { "succcess", true } };
        }


        public Dictionary<string, object> SelectBuilding(string target)
        {
            foreach (var building in BuildingStates)
            {
                if (string.Equals(building.BuildingName, target, StringComparison.InvariantCultureIgnoreCase))
                {
                    return new() { { "success", true }, { "target", building } };

                    
                }
            }

            return new() { { "success", false }, { "message", $"Target: {target} nicht gefunden!" } };
        }

        public Dictionary<string, object> SelectInstancePopulation(int populationId)
        {
            foreach (var person in Population)
            {
                if (populationId == person.GetPopulationId())
                {
                    return new() { { "success", true }, { "target", person } };
                }
            }

            return new() { { "success", false }, { "message", $"Person mit ID: {populationId} nicht gefunden!" } };
        }

        public Dictionary<string, object> ConstructBuilding(IBuildingList building)
        {
            var hasBuilding = _buildingList.Contains(building);
            var matchingBuidingName = building is BuildersHut;
            var availableBuilders = FreeBuilders.Count > 0;

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
            FreeWorkers.Add(newWorker);

            return new()
            {
                { "success", true},
                { "message", "Neuer Arbeiter erfolgreich angeheuert!"},
                { "update", new Dictionary<string, object> {
                    { "action", "Create Worker" },
                    { "settlement_id",SettlementId },
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