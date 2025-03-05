from .Planet import Planet
from .MainCity import MainCity



class HomePlanet(Planet):
    def __init__(self, name, settlements=None):
        if settlements == None:
            settlements = [MainCity("Hauptstadt")]
        super().__init__(name=name, base_type="home_planet", settlements=settlements)


