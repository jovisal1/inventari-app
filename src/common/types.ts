export interface Location {
  location_id: number;
  aula: string;
  observacions?: string;
}
export interface LocationList extends Array<Location> {}

export interface InventoryItem {
  num_serie: number;
  type_id: number;
  location_id: number;
  model?: string;
}
export interface InventoryItemList extends Array<InventoryItem> {}
