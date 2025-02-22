import bpy
import math

# Funktion zum Erstellen einer Kugel (Planet/Sonne/Mond)
def create_sphere(name, radius, location, material):
    bpy.ops.mesh.primitive_uv_sphere_add(radius=radius, location=location)
    obj = bpy.context.object
    obj.name = name
    if material:
        obj.data.materials.append(material)
    return obj

# Funktion zum Erstellen eines Materials
def create_material(name, color):
    material = bpy.data.materials.new(name)
    material.use_nodes = True
    bsdf = material.node_tree.nodes["Principled BSDF"]
    bsdf.inputs["Base Color"].default_value = color
    return material

# Löschen aller vorhandenen Objekte in der Szene
bpy.ops.object.select_all(action='SELECT')
bpy.ops.object.delete(use_global=False)

# Materialien erstellen
sun_material = create_material("Sun_Material", (1, 0.8, 0.1, 1))  # Gelb
planet_material = create_material("Planet_Material", (0.1, 0.5, 1, 1))  # Blau
moon_material = create_material("Moon_Material", (0.7, 0.7, 0.7, 1))  # Grau

# Sonne erstellen
sun = create_sphere("Sun", 5, (0, 0, 0), sun_material)

# Planeten erstellen
planets = [
    {"name": "Mercury", "radius": 0.4, "distance": 10, "moons": 0},
    {"name": "Venus", "radius": 0.9, "distance": 15, "moons": 0},
    {"name": "Earth", "radius": 1, "distance": 20, "moons": 1},
    {"name": "Mars", "radius": 0.5, "distance": 25, "moons": 2},
    {"name": "Jupiter", "radius": 2, "distance": 35, "moons": 4},
    {"name": "Saturn", "radius": 1.8, "distance": 45, "moons": 5},
    {"name": "Uranus", "radius": 1.5, "distance": 55, "moons": 3},
    {"name": "Neptune", "radius": 1.4, "distance": 65, "moons": 2},
]

for planet in planets:
    angle = (list(planets).index(planet)) * (2 * math.pi / len(planets))  # Winkel für die Umlaufbahn
    x = planet["distance"] * math.cos(angle)
    y = planet["distance"] * math.sin(angle)
    planet_obj = create_sphere(planet["name"], planet["radius"], (x, y, 0), planet_material)

    # Monde erstellen
    for moon_index in range(planet["moons"]):
        moon_angle = moon_index * (2 * math.pi / planet["moons"])  # Winkel für die Mondumlaufbahn
        moon_distance = planet["radius"] * 2  # Abstand vom Planeten
        moon_x = x + moon_distance * math.cos(moon_angle)
        moon_y = y + moon_distance * math.sin(moon_angle)
        create_sphere(f"{planet['name']}_Moon_{moon_index}", planet["radius"] * 0.3, (moon_x, moon_y, 0), moon_material)

# Kamera und Licht hinzufügen
bpy.ops.object.camera_add(location=(0, -100, 50))
camera = bpy.context.object
camera.rotation_euler = (math.radians(60), 0, 0)
bpy.context.scene.camera = camera

bpy.ops.object.light_add(type='SUN', location=(0, 0, 50))