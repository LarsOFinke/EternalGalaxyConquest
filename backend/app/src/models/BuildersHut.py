from Factory import Factory


class BuildersHut(Factory):
    def __init__(self):
        super().__init__(worker_slots=2)
        
    # Method start building on a timer or general factory-method that takes workers etc as parameters? #




if __name__ == "__main__":
    bh = BuildersHut()
    print(bh.worker_slots)
    
    pass
    