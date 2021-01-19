import React from "react";
import { StyleSheet, View } from "react-native";
import { Avatar } from "@ui-kitten/components";

export const ProfileAvatar = (props) => {
  const renderEditButtonElement = () => {
    const buttonElement = props.editButton();

    return React.cloneElement(buttonElement, {
      style: [buttonElement.props.style, styles.editButton],
    });
  };

  const { style, editButton, ...restProps } = props;

  return (
    <View style={style}>
      <Avatar style={[style, styles.avatar]} {...restProps} />
      {editButton && renderEditButtonElement()}
    </View>
  );
};

const styles = StyleSheet.create({
  avatar: {
    alignSelf: "center",
  },
  editButton: {
    position: "absolute",
    alignSelf: "flex-end",
    bottom: 0,
  },
});
