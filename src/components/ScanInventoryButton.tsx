import React, { useState } from "react";
import { BarcodeScanner } from "@awesome-cordova-plugins/barcode-scanner";
import { IonFab, IonFabButton, IonIcon, IonAlert } from "@ionic/react";
import { parseInventoryInfo } from "../common/utils";
import { InventoryItem } from "../common/types";
import { add } from "ionicons/icons";
import "./LocationSelector.css";

export interface ContainerProps {
  onAddItem(newItem: InventoryItem): void;
}

const ScanInventoryButton: React.FC<ContainerProps> = ({ onAddItem }) => {
  const [showConfirmAlert, showShowConfirmAlert] = useState(false);
  const [scannedInfo, setScannedInfo] = useState<InventoryItem>();
  const openScanner = async () => {
    const data = await BarcodeScanner.scan();
    const obtainedInfo = parseInventoryInfo(data.text);
    setScannedInfo(obtainedInfo);
    showShowConfirmAlert(true);
  };

  return (
    <>
      <IonFab vertical="bottom" horizontal="end" slot="fixed">
        <IonFabButton onClick={openScanner}>
          <IonIcon icon={add} />
        </IonFabButton>
      </IonFab>
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
    </>
  );
};

export default ScanInventoryButton;
