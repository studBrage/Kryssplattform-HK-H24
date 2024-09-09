import React from "react";
import { View } from "react-native";

type SpacerProps = {
  height?: number;
  width?: number;
};

// A simple component that can be used to add space between elements
// width er satt til undefined som default ettersom height er mer relevant på mobilapplikasjoner
const Spacer = ({ height = 20, width = undefined }: SpacerProps) => {
  return (
    <View
      style={{ height: height ? height : 0, width: width ? width : 0 }}
    ></View>
  );
};

export default Spacer;
