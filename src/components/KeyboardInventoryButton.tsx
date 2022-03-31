import React, { useState } from "react";
import { IonFab, IonFabButton, IonIcon, IonAlert } from "@ionic/react";
import { InventoryItem } from "../common/types";
import { keypadOutline } from "ionicons/icons";

export interface ContainerProps {
  onAddItem(newItem: InventoryItem, text_etiqueta: string): void;
  disabled: boolean;
}

const KeyboardInventoryButton: React.FC<ContainerProps> = ({
  onAddItem,
  disabled,
}) => {
  const [showConfirmAlert, showShowConfirmAlert] = useState(false);

  const onAddItemClick = (
    numSerie: string,
    description: string,
    text_etiqueta: string
  ) => {
    const item: InventoryItem = {
      inventory_id: -1,
      num_serie: numSerie!,
      type_id: -1!,
      location_id: -1,
      descripcio: description || "Descripció",
      observacions: "",
      aula: "",
    };
    onAddItem(item, text_etiqueta);
    hideKeyboardInventoryAlert();
  };

  const hideKeyboardInventoryAlert = () => {
    showShowConfirmAlert(false);
  };

  return (
    <>
      <IonFab vertical="bottom" horizontal="start" slot="fixed">
        <IonFabButton
          disabled={disabled}
          onClick={(e) => showShowConfirmAlert(true)}
        >
          <IonIcon icon={keypadOutline} />
        </IonFabButton>
      </IonFab>
      <IonAlert
        isOpen={showConfirmAlert}
        onDidDismiss={() => hideKeyboardInventoryAlert()}
        cssClass="my-custom-class"
        header={"Afegir dispositiu manualment"}
        inputs={[
          {
            name: "numSerie",
            type: "text",
            placeholder: "Número de sèrie",
          },
          {
            name: "description",
            type: "text",
            placeholder: "Descripció",
          },
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
              onAddItemClick(
                alertData.numSerie,
                alertData.description,
                alertData.etiqueta
              );
            },
          },
        ]}
      />
    </>
  );
};

export default KeyboardInventoryButton;
