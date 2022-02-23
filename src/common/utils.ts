import { InventoryItem, ItemType } from "../common/types";

export const parseInventoryInfo = (barcodeCode: string): InventoryItem => {
  let ns = "";
  let des = "";
  if (barcodeCode.startsWith("http")) {
    const queryParams = new URLSearchParams(barcodeCode);
    ns = queryParams.get("ns")!;
    des = barcodeCode;
  } else {
    ns = barcodeCode;
    des = "";
  }

  const item: InventoryItem = {
    num_serie: ns,
    type_id: 1,
    location_id: 0,
    descripcio: des,
    observacions: "",
    aula: "",
  };

  return item;
};

export const itemTypes: ItemType[] = [
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
