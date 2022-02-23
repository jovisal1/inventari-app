import React, { useState } from "react";
import { BarcodeScanner } from "@awesome-cordova-plugins/barcode-scanner";
import {
  IonFab,
  IonFabButton,
  IonIcon,
  IonModal,
  IonItem,
  IonLabel,
  IonSelect,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonSelectOption,
  IonButton,
} from "@ionic/react";
import { parseInventoryInfo, itemTypes } from "../common/utils";
import { InventoryItem } from "../common/types";
import { add } from "ionicons/icons";

export interface ContainerProps {
  onAddItem(newItem: InventoryItem): void;
  locationId: number;
}

const ScanInventoryButton: React.FC<ContainerProps> = ({
  onAddItem,
  locationId,
}) => {
  const [showConfirmAlert, setShowConfirmAlert] = useState(false);
  const [selectedItemType, setSelectedItemType] = useState<number>();
  const [scannedInfo, setScannedInfo] = useState<InventoryItem>();

  const openScanner = async () => {
    const data = await BarcodeScanner.scan();
    const obtainedInfo = parseInventoryInfo(data.text);
    setScannedInfo(obtainedInfo);
    setShowConfirmAlert(true);
  };

  const onAddItemClick = () => {
    const newScanned: InventoryItem = Object.assign({}, scannedInfo);
    newScanned.type_id = selectedItemType!;
    setScannedInfo(newScanned);
    onAddItem(scannedInfo!);
    hideKeyboardInventoryAlert();
  };

  const hideKeyboardInventoryAlert = () => {
    setSelectedItemType(-1);
    setShowConfirmAlert(false);
  };

  return (
    <>
      <IonFab vertical="bottom" horizontal="end" slot="fixed">
        <IonFabButton disabled={locationId === undefined} onClick={openScanner}>
          <IonIcon icon={add} />
        </IonFabButton>
      </IonFab>
      <IonModal isOpen={showConfirmAlert}>
        <IonHeader>
          <IonToolbar>
            <IonTitle className="ion-text-center">Dispositiu detectat</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <IonGrid>
            <IonRow>
              <IonCol>
                <IonLabel>
                  Desitja afegir l'ítem{" "}
                  <b>
                    ${scannedInfo?.num_serie} (${scannedInfo?.descripcio})
                  </b>{" "}
                  a l'inventari de l'aula?`
                </IonLabel>
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

export default ScanInventoryButton;
