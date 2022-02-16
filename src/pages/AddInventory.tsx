import React, { useState } from "react";
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
import ScanInventoryButton from "../components/ScanInventoryButton";
import KeyboardInventoryButton from "../components/KeyboardInventoryButton";
import { Location, InventoryItem, InventoryItemList } from "../common/types";
<<<<<<< HEAD
import "../common/styles.css";

=======
import "./AddInventory.css";
import axios from "axios";
>>>>>>> 97ade7b964c9041fbd2687d43fd6b205b194df08
let inventoryItems: InventoryItem[] = [
  {
    num_serie: "11111",
    type_id: 1,
    location_id: 1,
    descripcio: "aaa",
  },
];

const CreateInventory: React.FC = () => {
  const [searchedText, setSearchedText] = useState("");
  const [selLocation, setSelLocation] = useState<Location>();
  const [inventoryItemsList, setInventoryItemList] =
    useState<InventoryItemList>([]);
  const [present] = useIonAlert();

  const onSelectLocation = (selLocation: Location) => {
    if (selLocation === undefined) return;
    setSelLocation(selLocation);
    setInventoryItemList(
      inventoryItems.filter((selItem) => {
        return selItem.location_id === selLocation.location_id;
      })
    );
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
        setInventoryItemList([...inventoryItemsList, newItem]);
        inventoryItems.push(newItem);
        sendInventoryEntry(newItem!);
      }
    }
  };

  const onSearchText = (searchText: string) => {
    setSearchedText(searchText);
    setInventoryItemList(
      inventoryItems.filter((selItem) => {
        return (
          selItem.descripcio!.toLowerCase().includes(searchText.toLowerCase()) ||
          selItem.num_serie
            .toString()
            .toLowerCase()
            .includes(searchText.toLowerCase())
        );
      })
    );
  };

  const sendInventoryEntry = async (newItem: InventoryItem) => {
    try {
      const { data: response } = await axios.post(
        `${process.env.REACT_APP_INVENTARI_URL}/inventory`,
        newItem
      );
      
    } catch (error) {
      console.error(error);
    }
  };
  // useEffect(() => {
  //   const fetchInventoryList = async () => {
  //     try {
  //       const { data: response } = await axios.get(
  //         `${process.env.REACT_APP_INVENTARI_URL}/inventory`
  //       );
  //       setInventoryItemList(response);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  //   fetchInventoryList();
  // }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary" className="centeredContentToolbar">
          <IonTitle>Afegir inventari</IonTitle>
        </IonToolbar>
        <LocationSelector onSelectLocation={onSelectLocation} />
        <IonSearchbar
          value={searchedText}
          onIonChange={(e) => onSearchText(e.detail.value!)}
        ></IonSearchbar>
      </IonHeader>
      <IonContent class="ion-padding">
        <InventoryLocationList inventoryItems={inventoryItemsList} />
        <KeyboardInventoryButton
          locationId={selLocation?.location_id!}
          onAddItem={onAddItem}
        />
        <ScanInventoryButton
          locationId={selLocation?.location_id!}
          onAddItem={onAddItem}
        />
      </IonContent>
    </IonPage>
  );
};

export default CreateInventory;
