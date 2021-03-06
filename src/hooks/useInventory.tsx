import { useEffect, useState } from "react";
import axios from "axios";
import {
  InventoryItem,
  InventoryItemList,
  ItemType,
  Location,
} from "../common/types";
import { useIonAlert } from "@ionic/react";

const useInventory = () => {
  const [searchedText, setSearchedText] = useState("");
  const [selLocation, setSelLocation] = useState<Location>();
  const [inventoryItemsList, setInventoryItemList] =
    useState<InventoryItemList>([]);
  const [inventoryFilteredItemsList, setInventoryFilteredItemList] =
    useState<InventoryItemList>([]);
  const [present] = useIonAlert();

  useEffect(() => {
    fetchInventory();
  }, [selLocation]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    filterResults();
  }, [searchedText, inventoryItemsList]); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchInventory = async () => {
    try {
      const { data: response } = await axios.get(
        `${process.env.REACT_APP_INVENTARI_URL}/inventory`,
        {
          headers: {
            Authorization: `Basic ${process.env.REACT_APP_SECRET_TOKEN}`,
          },
        }
      );

      setInventoryItemList(response);
    } catch (error) {
      console.error(error);
    }
  };

  const onUpdateInventoryItem = async (
    inventoryId: number,
    updatedItem: InventoryItem
  ) => {
    try {
      await axios.put(
        `${process.env.REACT_APP_INVENTARI_URL}/inventory/${inventoryId}`,
        {
          ...updatedItem,
          location_id: selLocation?.location_id,
        },
        {
          headers: {
            Authorization: `Basic ${process.env.REACT_APP_SECRET_TOKEN}`,
          },
        }
      );
      fetchInventory();
    } catch (error) {
      console.error(error);
    }
  };

  const onDeleteInventoryItem = async (inventoryId: number) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_INVENTARI_URL}/inventory/${inventoryId}`,
        {
          headers: {
            Authorization: `Basic ${process.env.REACT_APP_SECRET_TOKEN}`,
          },
        }
      );
      fetchInventory();
    } catch (error) {
      console.error(error);
    }
  };

  const onAddInventoryItem = async (newItem: InventoryItem) => {
    try {
      await axios.post(
        `${process.env.REACT_APP_INVENTARI_URL}/inventory`,
        newItem,
        {
          headers: {
            Authorization: `Basic ${process.env.REACT_APP_SECRET_TOKEN}`,
          },
        }
      );
      fetchInventory();
    } catch (error) {
      console.error(error);
    }
  };

  const filterResults = () => {
    let inventoryItemsFilterList = [...inventoryItemsList];
    if (selLocation !== undefined) {
      inventoryItemsFilterList = inventoryItemsFilterList.filter((selItem) => {
        return selItem.aula === selLocation.aula;
      });
    } else {
      inventoryItemsFilterList = inventoryItemsFilterList.filter((selItem) => {
        return selItem.aula === undefined;
      });
    }
    if (searchedText !== undefined) {
      if (searchedText.length !== 0) {
        inventoryItemsFilterList = inventoryItemsFilterList.filter(
          (selItem) => {
            return (
              selItem
                .descripcio!.toLowerCase()
                .includes(searchedText.toLowerCase()) ||
              selItem.num_serie
                .toString()
                .toLowerCase()
                .includes(searchedText.toLowerCase())
            );
          }
        );
      }
    }
    setInventoryFilteredItemList(inventoryItemsFilterList);
  };

  const onAddItem = (
    newItem: InventoryItem,
    etiqueta: string,
    itemType: ItemType = {
      descripcio: "",
      type_id: 0,
    }
  ) => {
    if (newItem !== undefined) {
      if (
        inventoryItemsList.some(
          (selItem) => selItem.num_serie === newItem.num_serie
        )
      ) {
        present({
          header: "Alerta",
          message:
            "El dispositiu que vols afegir ja est?? registrat a aquesta localitzaci??",
          buttons: [{ text: "Ok", handler: (d) => console.log("ok pressed") }],
        });
      } else {
        newItem.location_id = selLocation?.location_id!;
        newItem.type_id = itemType?.type_id || 0;
        newItem.text_etiqueta = etiqueta;
        onAddInventoryItem(newItem!);
      }
    }
  };

  return {
    setSelLocation,
    selLocation,
    setSearchedText,
    inventoryFilteredItemsList,
    onUpdateInventoryItem,
    onDeleteInventoryItem,
    onAddInventoryItem,
    onAddItem,
  };
};
export default useInventory;
