import React, { useState } from "react";
import { BarcodeScanner } from "@awesome-cordova-plugins/barcode-scanner";
import {
  IonFab,
  IonFabButton,
  IonIcon,
  IonAlert,
  IonModal,
  IonButton,
  IonHeader,
  IonTitle,
  IonContent,
  IonInput,
  IonFooter,
  IonToolbar,
  IonItem,
  IonLabel,
} from "@ionic/react";
import { InventoryItem, ItemType } from "../common/types";
import { parseInventoryInfo } from "../common/utils";
import { scan } from "ionicons/icons";
import InventoryItemTypeSelector from "../components/InventoryItemTypeSelector";

export interface ContainerProps {
  onAddItem(
    newItem: InventoryItem,
    text_etiqueta: string,
    itemType?: ItemType
  ): void;
  disabled: boolean;
}

const ScanInventoryButton: React.FC<ContainerProps> = ({
  onAddItem,
  disabled,
}) => {
  const [showConfirmAlert, setShowConfirmAlert] = useState(false);
  const [scannedInfo, setScannedInfo] = useState<InventoryItem>();
  const [label, setLabel] = useState<string>();
  const [selectedItemType, setSelectedItemType] = useState<ItemType>();

  const openScanner = async () => {
    const data = await BarcodeScanner.scan();
    // alert(JSON.stringify(data));
    const obtainedInfo = parseInventoryInfo(
      data.text.replace(/(\r\n|\n|\r)/gm, "")
    );
    //alert(JSON.stringify(obtainedInfo));
    setScannedInfo(obtainedInfo);
    let disableConfirmationAlert =
      process.env.REACT_APP_DISABLE_CONFIRMATION_ALERT;
    if (disableConfirmationAlert === "true") {
      if (obtainedInfo?.num_serie) {
        onAddItem(obtainedInfo!, "");
      }
    } else {
      if (obtainedInfo?.num_serie) {
        setShowConfirmAlert(true);
      }
    }
  };

  const onAddItemClick = (text_etiqueta: string, itemType?: ItemType) => {
    onAddItem(scannedInfo!, text_etiqueta, itemType);
    setLabel("");
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

      <IonModal isOpen={showConfirmAlert}>
        <IonHeader translucent>
          <IonToolbar color="primary" className="centeredContentToolbar">
            <IonTitle>Dispositiu detectat</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding ion-justify-content-center">
          <p style={{ textAlign: "center" }}>
            Desitja afegir l'ítem <b> {scannedInfo?.num_serie}</b> a l'inventari
            de l'aula?
          </p>
          <br />
          <IonItem>
            <IonLabel>Etiqueta</IonLabel>
            <IonInput
              value={label}
              clearInput={true}
              className="ion-text-right"
              onIonChange={(e) => setLabel(e.detail.value!)}
            >
              {" "}
            </IonInput>
          </IonItem>
          <InventoryItemTypeSelector
            selItemType={selectedItemType}
            onSelectItemType={(selItemType: ItemType) => {
              if (selItemType === undefined) return;
              setSelectedItemType(selItemType);
            }}
          />
        </IonContent>
        <IonFooter>
          <div className="ion-text-center">
            <IonButton
              color="light"
              onClick={() => hideKeyboardInventoryAlert()}
            >
              Cancel·lar
            </IonButton>
            <IonButton
              onClick={() => {
                onAddItemClick(label!, selectedItemType!);
              }}
            >
              Acceptar
            </IonButton>
          </div>
        </IonFooter>
      </IonModal>

      {/* <IonAlert
        isOpen={showConfirmAlert}
        onDidDismiss={() => hideKeyboardInventoryAlert()}
        header={"Dispositiu detectat"}
        message={`Desitja afegir l'ítem <b> ${scannedInfo?.num_serie}</b> a l'inventari de l'aula?`}
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
      /> */}
    </>
  );
};

export default ScanInventoryButton;
