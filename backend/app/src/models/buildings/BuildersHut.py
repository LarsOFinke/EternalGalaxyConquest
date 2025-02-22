from .Factory import Factory


class BuildersHut(Factory):
    def __init__(self, workers: list = []) -> None:
        super().__init__(category="Builders Hut", worker_slots=2, workers=workers)
        self.action_list: list[dict] =  [
                                            { "Convert Worker To Builder": "", "action": self.convert_worker_to_builder },
                                            { "Get Workers": self.get_workers }
                                        ]
        
    
    def match_payload_action(self, action: str, context: list) -> dict:
        for act in self.action_list:
            if act["name"] == action:
                return act["action"](*context)
            

    def convert_worker_to_builder(self, worker, location) -> dict:
        wn: str = worker.name
        if self.__convert_worker_to_craftsman("Builders Hut", worker, location):
            return  {
                        "success": True, 
                        "message": f"{wn} wurde zum Baumeister!"
                    }
        else:
            return  { 
                        "success": False, 
                        "message": f"{wn} konnte nicht zum Baumeister werden!"
                    }
    





if __name__ == "__main__":
    # bh = BuildersHut()
    # print(bh.worker_slots)
    
    pass
    