using Microsoft.OpenApi.Any;
using System.Collections;
using System.Collections.Generic;

namespace CSharpApi.Models
{
    public class Player
    {
        private Guid Id;
        private string Name { get; set; } = string.Empty;

        private List<Object> Bases { get; set; } = new List<Object>();


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

        public Dictionary<Object, Object> FetchPlayerState()
        {
            List<Object> baseState = new();

            foreach (var bases in Bases)
            {
                baseState.Add(bases.FetchBaseState());

			}

            return new Dictionary<Object, Object> {
            {"category", "player" },
            {"name", this.Name },
            {"player_id", this.Id },
            {"base_states", baseState } };
        }
	}
}

/*
class Player():
    def __init__(self, name: str, player_id: int, bases: list = None):
        if bases is None:
            bases = [HomePlanet("Heimatplanet")]
        self.__action_list: list[dict] =  [
                                            { "name": "Select Base", "action": self.select_base, }
                                        ]
        self.name: str = name
        self.player_id: int = player_id
        self.__bases: list = bases

    
    def fetch_player_state(self) -> dict:
        return return {
            "category": "player",
            "name": self.name,
            "player_id": self.player_id,
            "base_states": [base.fetch_base_state() for base in self.__bases]
        }



    def match_payload_action(self, action: str, context: list) -> dict:
        try:
            for act in self.__action_list:
                if act.get("name") == action:
                    return act["action"](*context)
                
        except Exception as e:
            return  { "success": False, "message": f"{e}" }


    def select_base(self, target) -> dict:
        for base in self.__bases:
            if base.get_base_id() == int(target):
                return  { "success": True, "target": base }
        
        return  { "success": False, "message": f"{target} nicht gefunden!", "target": f"{target} nicht gefunden!" } 
 */ 