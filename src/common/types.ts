export interface Location {
  location_id: number;
  aula: string;
  observacions?: string;
}
export interface LocationList extends Array<Location> {}

export interface InventoryItem {
  num_serie: string;
  type_id: number;
  location_id: number;
  descripcio?: string;
}
export interface InventoryItemList extends Array<InventoryItem> {}
