import React from "react";
import { Icon, useTheme } from "@ui-kitten/components";

export const MessageCircleIcon = (style) => (
  <Icon {...style} name="message-circle" />
);

export const PersonAddIcon = (style) => <Icon {...style} name="person-add" />;

export const PinIcon = () => {
  const theme = useTheme();
  return (
    <Icon
      width={16}
      height={16}
      fill={theme["text-control-color"]}
      name="pin"
    />
  );
};
