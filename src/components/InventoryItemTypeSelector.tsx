import React, { useState, useEffect } from "react";
import { IonLabel, IonSelect, IonItem, IonSelectOption } from "@ionic/react";
import axios from "axios";
import { ItemType, ItemTypeList } from "../common/types";
import "../common/styles.css";

export interface ContainerProps {
  selItemType?: ItemType;
  onSelectItemType(selItem: ItemType): void;
}

const InventoryItemTypeSelector: React.FC<ContainerProps> = ({
  selItemType,
  onSelectItemType,
}) => {
  const [itemTypes, setItemTypes] = useState<ItemTypeList>([]);
  const [selectedItemType, setSelectedItemType] = useState<ItemType>();

  useEffect(() => {
    const fetchTypes = async () => {
      try {
        const { data: response } = await axios.get(
          `${process.env.REACT_APP_INVENTARI_URL}/type`,
          {
            headers: {
              Authorization: `Basic ${process.env.REACT_APP_SECRET_TOKEN}`,
            },
          }
        );
        setItemTypes(response);
        setSelectedItemType(
          response.filter((elem: ItemType) => {
            return elem.type_id === selItemType?.type_id;
          })
        );
      } catch (error) {
        console.error(error);
      }
    };
    fetchTypes();
  }, []);

  return (
    <>
      <IonItem>
        <IonLabel>Tipus de dispositiu:</IonLabel>
        <IonSelect
          interface="popover"
          value={selectedItemType}
          placeholder="Selecciona el tipus"
          onIonChange={(e) => {
            onSelectItemType(e.detail.value);
            setSelectedItemType(e.detail.value);
          }}
        >
          {itemTypes!.map((item) => {
            return (
              <IonSelectOption key={item.type_id} value={item}>
                {item.descripcio}
              </IonSelectOption>
            );
          })}
        </IonSelect>
      </IonItem>
    </>
  );
};

export default InventoryItemTypeSelector;
