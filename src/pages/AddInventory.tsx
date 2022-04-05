import React from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonSearchbar,
} from "@ionic/react";
import InventoryItemLst from "../components/InventoryItemLst";
import LocationSelector from "../components/LocationSelector";
import ScanInventoryButton from "../components/ScanInventoryButton";
import KeyboardInventoryButton from "../components/KeyboardInventoryButton";
import { Location } from "../common/types";
import useInventory from "../hooks/useInventory";
import "../common/styles.css";

const AddInventory: React.FC = () => {
  const inventoryUtils = useInventory();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary" className="centeredContentToolbar">
          <IonTitle>Afegir inventari</IonTitle>
        </IonToolbar>
        <LocationSelector
          onSelectLocation={(selLocation: Location) => {
            if (selLocation === undefined) return;
            inventoryUtils.setSelLocation(selLocation);
          }}
        />
        <IonSearchbar
          onIonChange={(e) => {
            if (e.detail.value! === undefined) return;
            inventoryUtils.setSearchedText(e.detail.value!);
          }}
        ></IonSearchbar>
      </IonHeader>
      <IonContent class="ion-padding">
        <InventoryItemLst
          inventoryItems={inventoryUtils.inventoryFilteredItemsList}
          onDeleteItem={inventoryUtils.onDeleteInventoryItem}
          onUpdateItem={inventoryUtils.onUpdateInventoryItem}
          disabled={inventoryUtils.selLocation === undefined}
        />
        <KeyboardInventoryButton
          onAddItem={inventoryUtils.onAddItem}
          disabled={inventoryUtils.selLocation === undefined}
        />
        <ScanInventoryButton
          onAddItem={inventoryUtils.onAddItem}
          disabled={inventoryUtils.selLocation === undefined}
        />
      </IonContent>
    </IonPage>
  );
};

export default AddInventory;
