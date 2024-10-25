import { Pressable, Text } from "react-native";

type HkButtonProps = {
  onPress: () => void;
  title: string;
  bold?: boolean;
  italic?: boolean;
  theme: "primary" | "alert";
};

export default function HkButton({
  onPress,
  title,
  theme = "primary",
  bold = false,
  italic = false,
}: HkButtonProps) {
  const buttonClassNames: string[] = [];
  const textClassNames: string[] = ["text-md"];

  if (bold) textClassNames.push("font-bold");
  if (italic) textClassNames.push("italic");

  if (theme === "primary") {
    buttonClassNames.push("bg-blue-500");
    textClassNames.push("text-white");
  }
  if (theme === "alert") {
    buttonClassNames.push("bg-red-500");
    textClassNames.push("text-white");
  }

  return (
    <Pressable className={buttonClassNames.join(" ")}>
      <Text className={textClassNames.join(" ")}>{title}</Text>
    </Pressable>
  );
}
