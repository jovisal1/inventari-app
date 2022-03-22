import React from "react";
import {
  IonLabel,
  IonList,
  IonItem,
  IonAvatar,
  IonItemOptions,
  IonItemOption,
  IonItemSliding,
  IonIcon,
} from "@ionic/react";
import { trash } from "ionicons/icons";
import { InventoryItemList } from "../common/types";
import "../common/styles.css";

export interface ContainerProps {
  inventoryItems?: InventoryItemList;
  onDeleteItem(inventoryId: number): void;
}

const InventoryLocationList: React.FC<ContainerProps> = ({
  inventoryItems,
  onDeleteItem,
}) => {
  const getAvatarImage = (itemType: number) => {
    var avatarImages: Record<number, object> = {
      1: <img src="assets/images/laptop.png" alt="laptop" />,
      2: <img src="assets/images/monitor.png" alt="monitor" />,
    };
    return avatarImages[itemType] || avatarImages[1];
  };

  return (
    <>
      <IonList>
        {inventoryItems?.length === 0 && (
          <h4 className="noItemsText">No existeix cap element inventariat</h4>
        )}
        {inventoryItems?.length !== 0 &&
          inventoryItems?.map((selectedItem, index, arrayElements) => {
            return (
              <IonItemSliding key={selectedItem.num_serie}>
                <IonItem>
                  <IonAvatar>{getAvatarImage(selectedItem.type_id)}</IonAvatar>
                  <IonLabel className="itemLabel">
                    <h3>
                      {" "}
                      <b>Núm sèrie: </b>
                      {selectedItem.num_serie}
                    </h3>
                    <h4>Especificacions:</h4>
                    <p>{selectedItem.descripcio}</p>
                  </IonLabel>
                </IonItem>
                <IonItemOptions side="end" color="tertiary">
                  <IonItemOption
                    onClick={(e) => {
                      onDeleteItem(selectedItem.inventory_id);
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
