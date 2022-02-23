import React, { useState } from "react";
import { BarcodeScanner } from "@awesome-cordova-plugins/barcode-scanner";
import {
  IonFab,
  IonFabButton,
  IonIcon,
  IonModal,
  IonContent,
  IonButton,
  IonInput,
  IonLabel,
  IonSelect,
  IonGrid,
  IonRow,
  IonCol,
  IonItem,
  IonSelectOption,
  IonHeader,
  IonToolbar,
  IonTitle,
} from "@ionic/react";
import { itemTypes } from "../common/utils";
import { InventoryItem } from "../common/types";
import { keypadOutline } from "ionicons/icons";

export interface ContainerProps {
  onAddItem(newItem: InventoryItem): void;
  locationId: number;
}

const KeyboardInventoryButton: React.FC<ContainerProps> = ({
  onAddItem,
  locationId,
}) => {
  const [showConfirmAlert, showShowConfirmAlert] = useState(false);
  const [numSerie, setNumSerie] = useState<string>();
  const [selectedItemType, setSelectedItemType] = useState<number>();

  const onAddItemClick = () => {
    const item: InventoryItem = {
      num_serie: numSerie!,
      type_id: selectedItemType!,
      location_id: locationId,
      descripcio: "",
    };
    onAddItem(item);
    hideKeyboardInventoryAlert();
  };

  const hideKeyboardInventoryAlert = () => {
    setNumSerie("");
    setSelectedItemType(-1);
    showShowConfirmAlert(false);
  };

  return (
    <>
      <IonFab vertical="bottom" horizontal="start" slot="fixed">
        <IonFabButton
          disabled={locationId === undefined}
          onClick={(e) => showShowConfirmAlert(true)}
        >
          <IonIcon icon={keypadOutline} />
        </IonFabButton>
      </IonFab>
      <IonModal isOpen={showConfirmAlert}>
        <IonHeader>
          <IonToolbar>
            <IonTitle className="ion-text-center">
              Afegir dispositiu manualment
            </IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <IonGrid>
            <IonRow>
              <IonCol>
                <IonItem>
                  <IonLabel>Número de sèrie:</IonLabel>
                  <IonInput
                    className={"ion-text-right"}
                    value={numSerie}
                    type="number"
                    clearInput
                    onIonChange={(e) => setNumSerie(e.detail.value!)}
                  ></IonInput>
                </IonItem>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonItem>
                  <IonLabel>Tipus de dispositiu:</IonLabel>
                  <IonSelect
                    interface="popover"
                    value={selectedItemType}
                    placeholder="Select One"
                    onIonChange={(e) => setSelectedItemType(e.detail.value)}
                  >
                    {itemTypes.map((item) => {
                      return (
                        <IonSelectOption
                          key={item.type_id}
                          value={item.type_id}
                        >
                          {item.desc}
                        </IonSelectOption>
                      );
                    })}
                  </IonSelect>
                </IonItem>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonButton onClick={() => onAddItemClick()}>
                  Afegir dispositiu
                </IonButton>
              </IonCol>
              <IonCol>
                <IonButton onClick={() => hideKeyboardInventoryAlert()}>
                  Cancel·lar
                </IonButton>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonContent>
      </IonModal>
    </>
  );
};

export default KeyboardInventoryButton;
