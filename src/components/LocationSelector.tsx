import React, { useState, useEffect } from "react";
import axios from "axios";
import { IonLabel, IonSelect, IonSelectOption, IonItem } from "@ionic/react";
import { Location, LocationList } from "../common/types";

export interface ContainerProps {
  onSelectLocation(selLocation: Location): void;
}

const LocationSelector: React.FC<ContainerProps> = ({ onSelectLocation }) => {
  const [locations, setLocations] = useState<LocationList>([]);
  const [selLocation, setSelLocation] = useState<Location>();

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const { data: response } = await axios.get(
          `${process.env.REACT_APP_INVENTARI_URL}/location`,
          {
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Headers":
                "POST, GET, PUT, DELETE, OPTIONS, HEAD, Authorization, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Access-Control-Allow-Origin",
              "Content-Type": "application/json",
            },
          }
        );
        setLocations(response);
      } catch (error) {
        console.error(error);
      }
    };

    fetchLocations();
  }, []);

  return (
    <IonItem>
      <IonLabel>Localització seleccionada</IonLabel>
      <IonSelect
        value={selLocation}
        placeholder="Seleccciona una localització"
        onIonChange={(e) => {
          if (e.detail.value !== undefined) {
            setSelLocation(e.detail.value);
            onSelectLocation(e.detail.value);
          }
        }}
      >
        {locations.map((selectedLocation) => {
          return (
            <IonSelectOption
              id={selectedLocation.location_id?.toString()}
              key={selectedLocation.location_id}
              value={selectedLocation}
            >
              {selectedLocation.aula}
            </IonSelectOption>
          );
        })}
      </IonSelect>
    </IonItem>
  );
};

export default LocationSelector;
