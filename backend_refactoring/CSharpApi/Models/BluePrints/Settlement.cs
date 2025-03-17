using System.ComponentModel.DataAnnotations;
using System.Reflection.Metadata.Ecma335;
using CSharpApi.Models.BluePrints.BuildingTypes;

namespace CSharpApi.Models.BluePrints
{
    public class Settlement
    {
        public static int SettlementCount { get; set; } = 0;

        private readonly int _settlementId = 0;
        private readonly string _settlementName = string.Empty;
        private readonly object _settlementType;
        private readonly float _gold = 0;
        private readonly float _food = 0;
        private readonly float _wood = 0;
        private readonly float _iron = 0;
        private readonly List<IBuildingList> _buildings = [];
        private readonly List<object> _population = [];
        private readonly List<object> _freeWorkers = [];
        private readonly List<object> _freeBuilders = [];

        public Settlement(string settlementName,
            object settlementType,
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

            List<Dictionary<string, object>> ActionList = new List<Dictionary<string, object>> 
            { new() { { "name", "Select Building" }, { "action", SelectBuilding } },
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
            };

            List<IBuildingList> buildingList =
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
                        if (String.Equals(builder.Proffession, "worker", StringComparison.InvariantCultureIgnoreCase) &&
                            builder.working == false && String.Equals(builder.FieldOfWork, "builder", StringComparison.InvariantCultureIgnoreCase))
                            { 
                                builders.Add(builder);
                            }

                         break;

                    case false:
                        if (String.Equals(builder.Proffession, "worker", StringComparison.InvariantCultureIgnoreCase) &&
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
            foreach (var buildingState in _building)
            {
                buildingStates.Add(buildingState.FetchBuildingState);
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

    }
}