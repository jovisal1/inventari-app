import React from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import InventoryItemLst from "../components/InventoryItemLst";
import LocationSelector from "../components/LocationSelector";
import InventoryItemTypeSelector from "../components/InventoryItemTypeSelector";
import ScanInventoryButton from "../components/ScanInventoryButton";
import KeyboardInventoryButton from "../components/KeyboardInventoryButton";
import { Location, ItemType } from "../common/types";
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
        <InventoryItemTypeSelector
          selectedItemType={inventoryUtils.selItemType!}
          onSelectItemType={(selItemType: ItemType) => {
            if (selItemType === undefined) return;
            inventoryUtils.setSelItemType(selItemType);
          }}
        />
      </IonHeader>
      <IonContent class="ion-padding">
        <InventoryItemLst
          inventoryItems={inventoryUtils.inventoryFilteredItemsList}
          onDeleteItem={inventoryUtils.onDeleteInventoryItem}
          onUpdateItem={inventoryUtils.onUpdateInventoryItem}
          onSearchText={(searchText: string) => {
            if (searchText === undefined) return;
            inventoryUtils.setSearchedText(searchText);
          }}
          disabled={
            inventoryUtils.selLocation === undefined ||
            inventoryUtils.selItemType === undefined
          }
        />
        <KeyboardInventoryButton
          onAddItem={inventoryUtils.onAddItem}
          disabled={
            inventoryUtils.selLocation === undefined ||
            inventoryUtils.selItemType === undefined
          }
        />
        <ScanInventoryButton
          onAddItem={inventoryUtils.onAddItem}
          disabled={
            inventoryUtils.selLocation === undefined ||
            inventoryUtils.selItemType === undefined
          }
        />
      </IonContent>
    </IonPage>
  );
};

export default AddInventory;
