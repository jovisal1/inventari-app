import React, { useEffect } from "react";
import {
  IonMenu,
  IonItem,
  IonList,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonRouterOutlet,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { parseInventoryInfo, itemTypes } from "../common/utils";
import { InventoryItem } from "../common/types";
import { menuController } from "@ionic/core";
import { Route } from "react-router-dom";
import Settings from "../pages/Settings";

export interface ContainerProps {
  showMenu: boolean;
}

const SettingsMenu: React.FC<ContainerProps> = ({ showMenu }) => {
  return (
    <>
      <IonMenu
        side="start"
        menuId="first"
        contentId="main"
        hidden={showMenu}
        maxEdgeStart={100}
        type="overlay"
      >
        <IonHeader>
          <IonToolbar color="primary">
            <IonTitle>Start Menu</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonList>
            <IonItem>Menu Item</IonItem>
            <IonItem>Menu Item</IonItem>
            <IonItem>Menu Item</IonItem>
            <IonItem>Menu Item</IonItem>
            <IonItem>Menu Item</IonItem>
          </IonList>
        </IonContent>
      </IonMenu>
      <IonReactRouter>
        <IonRouterOutlet id="main">
          <Route path="/settings" component={Settings} />
        </IonRouterOutlet>
      </IonReactRouter>
    </>
  );
};

export default SettingsMenu;
