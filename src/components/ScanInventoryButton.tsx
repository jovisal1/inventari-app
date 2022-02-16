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
  const [showConfirmAlert, showShowConfirmAlert] = useState(false);
  const [selectedItemType, setSelectedItemType] = useState<number>();
  const [scannedInfo, setScannedInfo] = useState<InventoryItem>();

  const openScanner = async () => {
    const data = await BarcodeScanner.scan();
    const obtainedInfo = parseInventoryInfo(data.text);
    setScannedInfo(obtainedInfo);
    showShowConfirmAlert(true);
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
    showShowConfirmAlert(false);
  };

  return (
    <>
      <IonFab vertical="bottom" horizontal="end" slot="fixed">
        <IonFabButton disabled={locationId === undefined} onClick={openScanner}>
          <IonIcon icon={add} />
        </IonFabButton>
      </IonFab>
<<<<<<< HEAD
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
                    ${scannedInfo?.num_serie} (${scannedInfo?.model})
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
=======
      <IonAlert
        isOpen={showConfirmAlert}
        onDidDismiss={() => showShowConfirmAlert(false)}
        cssClass="my-custom-class"
        header={"Confirmació!"}
        message={`Desitja afegir l'ítem <b>${scannedInfo?.num_serie}</b> a l'inventari de l'aula?`}
        buttons={[
          {
            text: "Cancel·lar",
            role: "cancel",
            cssClass: "secondary",
            id: "cancel-button",
            handler: () => {
              console.log("Scanned data not confirmed");
            },
          },
          {
            text: "Acceptar",
            id: "confirm-button",
            handler: () => {
              console.log("Confirm Okay");
              onAddItem(scannedInfo!);
            },
          },
        ]}
      />
>>>>>>> 97ade7b964c9041fbd2687d43fd6b205b194df08
    </>
  );
};

export default ScanInventoryButton;
