export interface Location {
  location_id: number;
  aula: string;
  observacions?: string;
}
export interface LocationList extends Array<Location> {}

export interface InventoryItem {
  num_serie: string;
  descripcio: string;
  observacions: string;
  type_id: number;
  location_id: number;
  aula: string;
}
export interface InventoryItemList extends Array<InventoryItem> {}

export interface ItemType {
  desc: string;
  type_id: number;
}

export interface ItemTypeList extends Array<ItemType> {}
