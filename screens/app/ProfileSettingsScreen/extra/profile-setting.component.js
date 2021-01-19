import React from "react";
import { StyleSheet } from "react-native";
import {
  Divider,
  Layout,
  Text,
  Input,
  Datepicker,
  Select,
  SelectItem,
  CalendarViewModes,
} from "@ui-kitten/components";

export const ProfileSetting = (props) => {
  const {
    style,
    hint,
    value,
    onChange,
    placeholder = "Please select",
    type = "text",
    options = [],
    ...layoutProps
  } = props;

  const renderHintElement = () => (
    <Text appearance="hint" category="s1" style={styles.flex1}>
      {hint}
    </Text>
  );

  return (
    <React.Fragment>
      <Layout level="1" {...layoutProps} style={[styles.container, style]}>
        {hint && renderHintElement()}
        {type === "text" && (
          <Input
            placeholder={hint}
            value={value}
            style={styles.flex2}
            onChangeText={(nextValue) => onChange && onChange(nextValue)}
          />
        )}
        {type === "date" && (
          <Datepicker
            date={value}
            min={new Date(1900, 1, 1)}
            max={new Date()}
            placement="top"
            startView={CalendarViewModes.YEAR}
            onSelect={(nextDate) => onChange && onChange(nextDate)}
          />
        )}
        {type === "select" && (
          <Select
            style={styles.flex1}
            placeholder={placeholder}
            value={options[value?.row]}
            selectedIndex={value}
            placement
            onSelect={(index) => onChange && onChange(index)}
          >
            {options &&
              options.map((option) => {
                return <SelectItem title={option} key={option} />;
              })}
          </Select>
        )}
      </Layout>
      <Divider />
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  flex1: {
    flex: 1,
  },
  flex2: {
    flex: 2,
  },
});
