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
  IonToolbar,
  IonModal,
  IonButton,
  IonHeader,
  IonTitle,
  IonContent,
  IonInput,
  IonFooter,
} from "@ionic/react";
import { trash, create } from "ionicons/icons";
import { InventoryItemList, InventoryItem, ItemType } from "../common/types";
import InventoryItemTypeSelector from "../components/InventoryItemTypeSelector";
import "../common/styles.css";

export interface ContainerProps {
  inventoryItems?: InventoryItemList;
  onDeleteItem(inventoryId: number): void;
  onUpdateItem(inventoryId?: number, updatedItem?: InventoryItem): void;
  onSearchText(searchedText: string): void;
  disabled: boolean;
}

const getAvatarImage = (itemType: string = "ordinador") => {
  var avatarImages: Record<string, object> = {
    monitor: <img src="assets/images/monitor.png" alt="monitor" />,
    portatil: <img src="assets/images/tablet.png" alt="laptop" />,
    tauleta: <img src="assets/images/tablet.png" alt="tablet" />,
    projector: <img src="assets/images/projector.png" alt="projector" />,
    ordinador: <img src="assets/images/pc.png" alt="pc" />,
  };
  return avatarImages[itemType];
};

const generateListItem = (inventoryItem: InventoryItem) => {
  return (
    <IonItem key={`${inventoryItem.num_serie}_${inventoryItem.aula}`}>
      <IonAvatar>{getAvatarImage(inventoryItem.tipus)}</IonAvatar>
      <IonLabel className="itemLabel">
        <h3>
          {" "}
          <b>Núm sèrie: </b>
          {inventoryItem.num_serie}
        </h3>
        <h4>
          <b>Especificacions: </b>
          {inventoryItem.descripcio}
        </h4>
        {inventoryItem.observacions && (
          <h4>
            <b>Observacions: </b>
            {inventoryItem.observacions}
          </h4>
        )}
      </IonLabel>
    </IonItem>
  );
};

const InventoryItemLst: React.FC<ContainerProps> = ({
  inventoryItems,
  onDeleteItem,
  onSearchText,
  onUpdateItem,
  disabled,
}) => {
  const [showItemProperties, setShowItemProperties] = useState(false);
  const [selectedItem, setSelectedItem] = useState<InventoryItem>();
  let updatedItem = { ...(selectedItem as InventoryItem) };
  let updatedItemType: ItemType = {
    type_id: updatedItem.type_id,
    descripcio: updatedItem.tipus,
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
            if (disabled) {
              return generateListItem(inventoryItem);
            } else {
              return (
                <IonItemSliding
                  key={`${inventoryItem.num_serie}_${inventoryItem.aula}`}
                >
                  <IonItemOptions side="start" color="tertiary">
                    <IonItemOption
                      onClick={(e) => {
                        setSelectedItem(inventoryItem);
                        setShowItemProperties(true);
                      }}
                    >
                      <IonIcon slot="icon-only" icon={create} color="light" />
                    </IonItemOption>
                  </IonItemOptions>
                  {generateListItem(inventoryItem)}
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
            }
          })}
      </IonList>
      <IonModal isOpen={showItemProperties}>
        <IonHeader translucent>
          <IonToolbar color="primary" className="centeredContentToolbar">
            <IonTitle>Editar dispositiu</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent class="ion-padding">
          <IonItem>
            <IonLabel position="stacked">Número de sèrie</IonLabel>
            <IonInput
              value={selectedItem?.num_serie}
              onIonChange={(e) => (updatedItem.num_serie = e.detail.value!)}
            >
              {" "}
            </IonInput>
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Especificacions</IonLabel>
            <IonInput
              value={selectedItem?.descripcio}
              onIonChange={(e) => (updatedItem.descripcio = e.detail.value!)}
            >
              {" "}
            </IonInput>
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Observacions</IonLabel>
            <IonInput
              value={selectedItem?.observacions}
              onIonChange={(e) => (updatedItem.observacions = e.detail.value!)}
            >
              {" "}
            </IonInput>
          </IonItem>
          <InventoryItemTypeSelector
            selectedItemType={updatedItemType}
            onSelectItemType={(selItemType: ItemType) => {
              if (selItemType === undefined) return;
              updatedItem.type_id = selItemType.type_id;
              updatedItem.tipus = selItemType.descripcio;
            }}
          />
        </IonContent>
        <IonFooter>
          <div className="ion-text-center">
            <IonButton
              onClick={() => {
                onUpdateItem(selectedItem?.inventory_id, updatedItem);
                setShowItemProperties(false);
              }}
            >
              Acceptar
            </IonButton>
            <IonButton
              color="light"
              onClick={() => setShowItemProperties(false)}
            >
              Cancel·lar
            </IonButton>
          </div>
        </IonFooter>
      </IonModal>
    </>
  );
};

export default InventoryItemLst;
