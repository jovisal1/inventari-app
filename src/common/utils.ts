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

export const itemTypes = [
  {
    desc: "Ordinador",
    type_id: 0,
  },
  {
    desc: "Monitor",
    type_id: 1,
  },
  {
    desc: "Portàtil",
    type_id: 2,
  },
  {
    desc: "Tauleta",
    type_id: 3,
  },
  {
    desc: "Projector",
    type_id: 4,
  },
];
