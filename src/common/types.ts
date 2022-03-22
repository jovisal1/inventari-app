export interface Location {
  location_id: number;
  aula: string;
  observacions?: string;
}
export interface LocationList extends Array<Location> {}

export interface InventoryItem {
  inventory_id: number;
  num_serie: string;
  descripcio: string;
  observacions: string;
  type_id: number;
  tipus?: string;
  location_id: number;
  aula: string;
}
export interface InventoryItemList extends Array<InventoryItem> {}

export interface ItemType {
  descripcio: string;
  type_id: number;
}

export interface ItemTypeList extends Array<ItemType> {}
