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
  const [inventoryItemsFilterList, setInventoryItemsFilterList] =
    useState<InventoryItemList>([]);
  const [present] = useIonAlert();

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const { data: response } = await axios.get(
          `${process.env.REACT_APP_INVENTARI_URL}/inventory`,
          {
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Headers":
                "POST, GET, PUT, DELETE, OPTIONS, HEAD, Authorization, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Access-Control-Allow-Origin",
              "Content-Type": "application/json",
            },
          }
        );
        setInventoryItemList(response);
      } catch (error) {
        console.error(error);
      }
    };
    fetchInventory();
  }, []);

  const onSelectLocation = (selLocation: Location) => {
    if (selLocation === undefined) return;
    setSelLocation(selLocation);
    setInventoryItemsFilterList(
      inventoryItemsList.filter((selItem) => {
        return selItem.aula === selLocation.aula;
      })
    );
  };

  const onSelectItemType = (selItemType: ItemType) => {
    console.log("Entra");
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
        setInventoryItemList([...inventoryItemsList, newItem]);
        setInventoryItemsFilterList([...inventoryItemsFilterList, newItem]);
        sendInventoryEntry(newItem!);
      }
    }
  };

  const onSearchText = (searchText: string) => {
    setSearchedText(searchText);
    if (searchText.length === 0) {
      setInventoryItemsFilterList(
        inventoryItemsList.filter((selItem) => {
          return selItem.aula === selLocation?.aula!;
        })
      );
    } else {
      setInventoryItemsFilterList(
        inventoryItemsFilterList.filter((selItem) => {
          return (
            selItem
              .descripcio!.toLowerCase()
              .includes(searchText.toLowerCase()) ||
            selItem.num_serie
              .toString()
              .toLowerCase()
              .includes(searchText.toLowerCase())
          );
        })
      );
    }
  };

  const sendInventoryEntry = async (newItem: InventoryItem) => {
    try {
      await axios.post(
        `${process.env.REACT_APP_INVENTARI_URL}/inventory`,
        newItem
      );
    } catch (error) {
      console.error(error);
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
        <InventoryLocationList inventoryItems={inventoryItemsFilterList} />
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
