using CSharpApi.Models.BluePrints.Beings;

namespace CSharpApi.Models.BluePrints.Locations
{
    public class Factory : BuildingState
    {
        public Worker? BuildOptions(string buildingType, string name)
        { return buildingType switch {
             "Builders Hut" => new Builder(name),
             "Warehouse" => new WarehouseWorker(name),
             "Bakery" => new Baker(name),
             "Sawmill"=> new WoodCutter(name),
             "Gold Mine" => new Miner(name),
             "Iron Mine" => new Miner(name),
             "Forge" => new BlackSmith(name),
             _ => null
            };
        }
        
        private int WorkerSlots { get; set; }

        private List<Worker> Workers { get; set; } = [];

        public Factory(string buildingName, bool active = true, int workerSlots = 0, List<Worker> workers = null) : base(buildingName, active)
        {
            WorkerSlots = workerSlots;
            Workers = workers;
        }

        public Dictionary<string, object> FetchBuildingState()
        {
            Dictionary<string, object> buildingState = base.FetchBuildingState();
            buildingState.TryAdd("worker_slots", WorkerSlots);
            buildingState.TryAdd("workers", Workers);

            return buildingState;
        }

        public Dictionary<string, object> ConvertWorkerToCraftsman(string buildingName, int workerId, Settlement settlement)
        {
            Worker? worker = (Worker) settlement.SelectInstancePopulation(workerId)["target"];

            if (worker is not null)
            {
                var newCraftsman = BuildOptions(buildingName, worker.Name);
                settlement.Population.Remove(worker);
                settlement.SetInstancePopulation(worker, false);
                worker = null;
                if (newCraftsman is null) return new() { { "success", false}, { "reason", "Building Option Not Found" } };
                settlement.Population.Add(newCraftsman);

                if (buildingName.Equals("Builders Hut"))
                {
                    settlement.FreeBuilders.Add((Builder)newCraftsman);
                }

                return new Dictionary<string, object> {
                    { "success", true },
                    { "message", $"{newCraftsman.Name} wurde zum Baumeister!" },
                    {"update", new Dictionary<string, object> {
                        {"action", "Convert Worker" },
                        { "settlement_id",  settlement.SettlementId },
                        { "old_population_id", workerId },
                        { "population_id", newCraftsman.Id },
                        { "name", newCraftsman.Name },
                        {"profession", newCraftsman.Profession },
                        { "alive", newCraftsman.Alive },
                        { "employed", newCraftsman.Employed },
                        { "field_of_work", newCraftsman.FieldOfWork },
                        { "working", newCraftsman.Working },
                        { "production", newCraftsman.Production } }
                    }
                };
            }

            return new Dictionary<string, object>
            {
                { "success", false },
                { "message", $"Worker mit ID: {workerId} konnte nicht zum Baumeister werden!" }
            };
        }

        public Dictionary<string, object> GetWorker()
        {
            return new Dictionary<string, object> { { "success", true }, { "workers", Workers } };
        }


        /// <summary>
        /// Does what the name suggests "AddOrRemoveWorkers".
        /// Defaults to Adding a Worker.
        /// To Remove a Worker set <paramref name="increase"/> false.
        /// </summary>
        /// <param name="worker">The type of Worker to Add or Remove.</param>
        /// <param name="increase">The operation to perform.</param>
        /// <returns>Returns Dictionary @string, @bool.</returns>
        public Dictionary<string, bool> AddOrRemoveWorkers(Builder worker, bool increase = true)
        {
            switch (increase)
            {
                case false:
                    Workers.Remove(worker);
                    break;
                case true:
                    Workers.Add(worker);
                    break;
            }

            return new Dictionary<string, bool> { { "success", true } };

        }
    }
}
