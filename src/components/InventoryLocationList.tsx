import React, { useState } from "react";
import {
  IonLabel,
  IonList,
  IonItem,
  IonAvatar,
  IonItemOptions,
  IonItemOption,
  IonItemSliding,
  IonIcon,
  IonSearchbar,
} from "@ionic/react";
import { trash, create } from "ionicons/icons";
import { InventoryItemList, InventoryItem } from "../common/types";
import "../common/styles.css";

export interface ContainerProps {
  inventoryItems?: InventoryItemList;
  onDeleteItem(inventoryId: number): void;
  onSearchText(searchedText: string): void;
}

const InventoryLocationList: React.FC<ContainerProps> = ({
  inventoryItems,
  onDeleteItem,
  onSearchText,
}) => {
  const getAvatarImage = (itemType: number) => {
    var avatarImages: Record<number, object> = {
      1: <img src="assets/images/monitor.png" alt="monitor" />,
      2: <img src="assets/images/tablet.png" alt="laptop" />,
      3: <img src="assets/images/tablet.png" alt="tablet" />,
      4: <img src="assets/images/projector.png" alt="projector" />,
      5: <img src="assets/images/pc.png" alt="pc" />,
    };
    return avatarImages[itemType] || avatarImages[1];
  };

  return (
    <>
      <IonSearchbar
        onIonChange={(e) => onSearchText(e.detail.value!)}
      ></IonSearchbar>
      <IonList>
        {inventoryItems?.length === 0 && (
          <h4 className="noItemsText">No existeix cap element inventariat</h4>
        )}
        {inventoryItems?.length !== 0 &&
          inventoryItems?.map((inventoryItem, index, arrayElements) => {
            return (
              <IonItemSliding key={inventoryItem.num_serie}>
                <IonItem>
                  <IonAvatar>{getAvatarImage(inventoryItem.type_id)}</IonAvatar>
                  <IonLabel className="itemLabel">
                    <h3>
                      {" "}
                      <b>Núm sèrie: </b>
                      {inventoryItem.num_serie}
                    </h3>
                    <h4>Especificacions:</h4>
                    <p>{inventoryItem.descripcio}</p>
                  </IonLabel>
                </IonItem>
                <IonItemOptions side="end" color="tertiary">
                  <IonItemOption
                    onClick={(e) => {
                      onDeleteItem(inventoryItem.inventory_id);
                    }}
                  >
                    <IonIcon slot="icon-only" icon={trash} color="light" />
                  </IonItemOption>
                </IonItemOptions>
              </IonItemSliding>
            );
          })}
      </IonList>
    </>
  );
};

export default InventoryLocationList;
