export interface Tile {
    id: number,
    owner: string,
    owner_id: number,
    tile_type: string,
    tile_name: string,
    tile_content: {
        planet_name: string
        base_id: number
    }
}