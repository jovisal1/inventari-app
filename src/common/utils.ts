import { InventoryItem, ItemType } from "../common/types";

export const parseInventoryInfo = (barcodeCode: string): InventoryItem => {
  let ns = "";
  let des = "";
  if (barcodeCode.startsWith("http")) {
    let url = new URL(barcodeCode);
    ns = url.searchParams.get("ns")!;
    des = barcodeCode;
  } else {
    ns = barcodeCode;
    des = barcodeCode;
  }

  const item: InventoryItem = {
    inventory_id: -1,
    num_serie: ns,
    type_id: 1,
    location_id: 0,
    descripcio: des,
    observacions: "",
    aula: "",
  };

  return item;
};
