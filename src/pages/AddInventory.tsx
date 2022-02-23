import React, { useState, useEffect } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonSearchbar,
  useIonAlert,
} from "@ionic/react";
import InventoryLocationList from "../components/InventoryLocationList";
import LocationSelector from "../components/LocationSelector";
import InventoryItemTypeSelector from "../components/InventoryItemTypeSelector";
import ScanInventoryButton from "../components/ScanInventoryButton";
import KeyboardInventoryButton from "../components/KeyboardInventoryButton";
import {
  Location,
  InventoryItem,
  InventoryItemList,
  ItemType,
} from "../common/types";
import "../common/styles.css";
import axios from "axios";

const AddInventory: React.FC = () => {
  const [searchedText, setSearchedText] = useState("");
  const [selLocation, setSelLocation] = useState<Location>();
  const [selItemType, setSelItemType] = useState<ItemType>();
  const [inventoryItemsList, setInventoryItemList] =
    useState<InventoryItemList>([]);
  const [inventoryFilteredItemsList, setInventoryFilteredItemList] =
    useState<InventoryItemList>([]);
  const [present] = useIonAlert();

  useEffect(() => {
    fetchInventory();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    filterResults();
  }, [selLocation, searchedText, inventoryItemsList]); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchInventory = async () => {
    try {
      const { data: response } = await axios.get(
        `${process.env.REACT_APP_INVENTARI_URL}/inventory`
      );

      setInventoryItemList(response);
    } catch (error) {
      console.error(error);
    }
  };

  const onDeleteInventoryItem = async (inventoryId: number) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_INVENTARI_URL}/inventory/${inventoryId}`
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
        newItem
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

  const onSelectLocation = (selLocation: Location) => {
    if (selLocation === undefined) return;
    setSelLocation(selLocation);
  };

  const onSearchText = (searchText: string) => {
    setSearchedText(searchText);
  };

  const onSelectItemType = (selItemType: ItemType) => {
    if (selItemType === undefined) return;
    setSelItemType(selItemType);
  };

  const onAddItem = (newItem: InventoryItem) => {
    if (newItem !== undefined) {
      if (
        inventoryItemsList.some(
          (selItem) =>
            selItem.location_id === newItem.location_id &&
            selItem.num_serie === newItem.num_serie
        )
      ) {
        present({
          header: "Alerta",
          message:
            "El dispositiu que vols afegir ja està registrat a aquesta localització",
          buttons: [{ text: "Ok", handler: (d) => console.log("ok pressed") }],
        });
      } else {
        newItem.location_id = selLocation?.location_id!;
        newItem.type_id = selItemType?.type_id!;
        onAddInventoryItem(newItem!);
      }
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary" className="centeredContentToolbar">
          <IonTitle>Afegir inventari</IonTitle>
        </IonToolbar>
        <LocationSelector onSelectLocation={onSelectLocation} />
        <InventoryItemTypeSelector
          selectedItemType={selItemType!}
          onSelectItemType={onSelectItemType}
        />
        <IonSearchbar
          value={searchedText}
          onIonChange={(e) => onSearchText(e.detail.value!)}
        ></IonSearchbar>
      </IonHeader>
      <IonContent class="ion-padding">
        <InventoryLocationList
          inventoryItems={inventoryFilteredItemsList}
          onDeleteItem={onDeleteInventoryItem}
        />
        <KeyboardInventoryButton
          onAddItem={onAddItem}
          disabled={selLocation === undefined || selItemType === undefined}
        />
        <ScanInventoryButton
          onAddItem={onAddItem}
          disabled={selLocation === undefined || selItemType === undefined}
        />
      </IonContent>
    </IonPage>
  );
};

export default AddInventory;
