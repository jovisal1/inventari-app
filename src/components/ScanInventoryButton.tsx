import React, { useState } from "react";
import { BarcodeScanner } from "@awesome-cordova-plugins/barcode-scanner";
import { IonFab, IonFabButton, IonIcon, IonAlert } from "@ionic/react";
import { InventoryItem } from "../common/types";
import { parseInventoryInfo } from "../common/utils";
import { scan } from "ionicons/icons";

export interface ContainerProps {
  onAddItem(newItem: InventoryItem, text_etiqueta: string): void;
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
    // alert(JSON.stringify(data));
    const obtainedInfo = parseInventoryInfo(
      data.text.replace(/(\r\n|\n|\r)/gm, "")
    );
    // alert(JSON.stringify(obtainedInfo));
    setScannedInfo(obtainedInfo);
    let disableConfirmationAlert =
      process.env.REACT_APP_DISABLE_CONFIRMATION_ALERT;
    if (disableConfirmationAlert === "true") {
      if (scannedInfo?.num_serie) {
        onAddItem(scannedInfo!, "");
      }
    } else {
      if (scannedInfo?.num_serie) {
        setShowConfirmAlert(true);
      }
    }
  };

  const onAddItemClick = (text_etiqueta: string) => {
    onAddItem(scannedInfo!, text_etiqueta);
    hideKeyboardInventoryAlert();
  };

  const hideKeyboardInventoryAlert = () => {
    setShowConfirmAlert(false);
  };

  return (
    <>
      <IonFab vertical="bottom" horizontal="end" slot="fixed">
        <IonFabButton disabled={disabled} onClick={openScanner}>
          <IonIcon icon={scan} />
        </IonFabButton>
      </IonFab>

      <IonAlert
        isOpen={showConfirmAlert}
        onDidDismiss={() => hideKeyboardInventoryAlert()}
        header={"Dispositiu detectat"}
        message={`Desitja afegir l'ítem <b> ${scannedInfo?.num_serie} (${scannedInfo?.descripcio})</b> a l'inventari de l'aula?`}
        inputs={[
          {
            name: "etiqueta",
            type: "text",
            placeholder: "Text etiqueta",
          },
        ]}
        buttons={[
          {
            text: "Cancel·lar",
            role: "cancel",
            cssClass: "secondary",
            id: "cancel-button",
            handler: () => {
              hideKeyboardInventoryAlert();
            },
          },
          {
            text: "Afegir",
            id: "confirm-button",
            handler: (alertData) => {
              onAddItemClick(alertData.etiqueta);
            },
          },
        ]}
      />
    </>
  );
};

export default ScanInventoryButton;
