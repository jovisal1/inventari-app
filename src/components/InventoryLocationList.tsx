import React, { useState, useEffect } from "react";
import axios from "axios";
import { IonLabel, IonList, IonItem, IonAvatar } from "@ionic/react";
import { InventoryItemList } from "../common/types";
import "../common/styles.css";

export interface ContainerProps {
  inventoryItems?: InventoryItemList;
}

const InventoryLocationList: React.FC<ContainerProps> = ({
  inventoryItems,
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
          inventoryItems?.map((selectedItem) => {
            return (
              <IonItem key={selectedItem.num_serie}>
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
            );
          })}
      </IonList>
    </>
  );
};

export default InventoryLocationList;
