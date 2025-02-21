from .Planet import Planet
from .MainCity import MainCity



class HomePlanet(Planet):
    def __init__(self, name, settlements = [MainCity("Hauptstadt")]):
        super().__init__(name=name, settlements=settlements)

