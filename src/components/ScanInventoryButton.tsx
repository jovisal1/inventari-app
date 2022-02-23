import React, { useState } from "react";
import { BarcodeScanner } from "@awesome-cordova-plugins/barcode-scanner";
import { IonFab, IonFabButton, IonIcon, IonAlert } from "@ionic/react";
import { InventoryItem } from "../common/types";
import { parseInventoryInfo } from "../common/utils";
import { add } from "ionicons/icons";

export interface ContainerProps {
  onAddItem(newItem: InventoryItem): void;
  disabled: boolean;
}

const ScanInventoryButton: React.FC<ContainerProps> = ({
  onAddItem,
  disabled,
}) => {
  const [showConfirmAlert, setShowConfirmAlert] = useState(false);
  const [scannedInfo, setScannedInfo] = useState<InventoryItem>();

  const openScanner = async () => {
    const data = await BarcodeScanner.scan();
    const obtainedInfo = parseInventoryInfo(data.text);
    setScannedInfo(obtainedInfo);
    let disableConfirmationAlert =
      process.env.DISABLE_CONFIRMATION_ALERT === "true";
    if (disableConfirmationAlert) {
      onAddItem(scannedInfo!);
    } else {
      setShowConfirmAlert(true);
    }
  };

  const onAddItemClick = () => {
    onAddItem(scannedInfo!);
    hideKeyboardInventoryAlert();
  };

  const hideKeyboardInventoryAlert = () => {
    setShowConfirmAlert(false);
  };

  return (
    <>
      <IonFab vertical="bottom" horizontal="end" slot="fixed">
        <IonFabButton disabled={disabled} onClick={openScanner}>
          <IonIcon icon={add} />
        </IonFabButton>
      </IonFab>

      <IonAlert
        isOpen={showConfirmAlert}
        onDidDismiss={() => hideKeyboardInventoryAlert()}
        header={"Dispositiu detectat"}
        message={`Desitja afegir l'ítem <b> ${scannedInfo?.num_serie} (${scannedInfo?.descripcio})</b> a l'inventari de l'aula?`}
        buttons={[
          {
            text: "Afegir",
            id: "confirm-button",
            handler: (alertData) => {
              onAddItemClick();
            },
          },
          {
            text: "Cancel·lar",
            role: "cancel",
            cssClass: "secondary",
            id: "cancel-button",
            handler: () => {
              hideKeyboardInventoryAlert();
            },
          },
        ]}
      />
    </>
  );
};

export default ScanInventoryButton;
