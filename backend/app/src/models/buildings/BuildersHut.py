from ..blueprints.Factory import Factory


class BuildersHut(Factory):
    def __init__(self, workers: list = []) -> None:
        super().__init__(name="Builders Hut", worker_slots=2, workers=workers)
        self.action_list: list[dict] =  [
                                            { "name": "Convert Worker To Builder", "action": self.convert_worker_to_builder },
                                            { "name": "Get Workers", "action": self.get_workers }
                                        ]
        
    
    def match_payload_action(self, action: str, context: list) -> dict:
        try:
            for act in self.action_list:
                if act["name"] == action:
                    return act["action"](*context)
        except Exception as e:
            return  { "success": False, "message": e }
            

    def convert_worker_to_builder(self, worker_id, settlement) -> dict:
        return self.convert_worker_to_craftsman("Builders Hut", worker_id, settlement)

