from Factory import Factory


class BuildersHut(Factory):
    def __init__(self, workers: list = []):
        super().__init__(worker_slots=2)
        self.workers: list = workers
    
    # Method to convert a worker to a builder
    





if __name__ == "__main__":
    bh = BuildersHut()
    print(bh.worker_slots)
    
    pass
    