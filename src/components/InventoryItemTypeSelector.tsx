import React, { useState, useEffect } from "react";
import { IonLabel, IonSelect, IonItem, IonSelectOption } from "@ionic/react";
import { ItemType } from "../common/types";
import { itemTypes } from "../common/utils";
import "../common/styles.css";

export interface ContainerProps {
  selectedItemType: ItemType;
  onSelectItemType(selItem: ItemType): void;
}

const InventoryItemTypeSelector: React.FC<ContainerProps> = ({
  selectedItemType,
  onSelectItemType,
}) => {
  return (
    <>
      <IonItem>
        <IonLabel>Tipus de dispositiu:</IonLabel>
        <IonSelect
          interface="popover"
          value={selectedItemType}
          placeholder="Selecciona el tipus"
          onIonChange={(e) => onSelectItemType(e.detail.value)}
        >
          {itemTypes.map((item) => {
            return (
              <IonSelectOption key={item.type_id} value={item}>
                {item.desc}
              </IonSelectOption>
            );
          })}
        </IonSelect>
      </IonItem>
    </>
  );
};

export default InventoryItemTypeSelector;
