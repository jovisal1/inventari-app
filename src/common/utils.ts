import { InventoryItem } from "../common/types";

export const parseInventoryInfo = (url: string): InventoryItem => {
  const queryParams = new URLSearchParams(url);
  const ns = queryParams.get("http://inventaritic.edu.gva.es/equips?ns");
  const ca = queryParams.get("ca");
  const item: InventoryItem = {
    num_serie: parseInt(ns!),
    type_id: 1,
    location_id: -1,
    model: ca!,
  };

  return item;
};
