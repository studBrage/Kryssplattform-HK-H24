import { Platform, View } from "react-native";
import MapView, { Region } from "react-native-maps";
import WebMap from "@teovilla/react-native-web-maps";

interface MyUltimateMapProps {
  children: React.ReactNode;
  intitialRegion: Region | undefined;
}

export default function MyUltimateMap({
  children,
  intitialRegion,
}: MyUltimateMapProps) {
  if (Platform.OS === "web") {
    return (
      // @ts-ignore: Typescript klager men det fungerer
      <WebMap
        provider="google"
        initialRegion={intitialRegion}
        googleMapsApiKey="Din nøkkel her"
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        {children}
      </WebMap>
    );
  } else {
    return (
      <MapView
        initialRegion={intitialRegion}
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        {children}
      </MapView>
    );
  }
}
