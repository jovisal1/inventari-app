import React from "react";
import { IonHeader, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import "../common/styles.css";

const Settings: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary" className="centeredContentToolbar">
          <IonTitle>Settings</IonTitle>
        </IonToolbar>
      </IonHeader>
    </IonPage>
  );
};

export default Settings;
