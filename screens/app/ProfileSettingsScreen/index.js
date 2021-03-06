import React, { useState } from "react";
import { ScrollView, View, TouchableOpacity } from "react-native";
import {
  Button,
  Layout,
  StyleService,
  Text,
  useStyleSheet,
  TopNavigation,
  TopNavigationAction,
  Icon,
  Spinner,
  IndexPath,
} from "@ui-kitten/components";
import { ProfileSetting } from "./extra/profile-setting.component";
import { ProfileAvatar } from "./extra/profile-avatar.component";
import { CameraIcon } from "./extra/icons";
import { Profile } from "./extra/data";
import { SafeAreaView } from "react-native-safe-area-context";
import useFirebaseUser from "./../../../hooks/useFirebaseUser";
import {
  pickImage,
  uploadImageAsync,
} from "./../../../utilities/imageUpload/imageUpload";

const profile = Profile.helenKuper;

const genders = ["female", "male", "other"];

export default ({ navigation }) => {
  const styles = useStyleSheet(themedStyles);
  const [firebaseUser, loading, isUpdatingUser] = useFirebaseUser();

  const [name, setName] = useState(firebaseUser?.name ?? "");
  const [email, setEmail] = useState(firebaseUser?.email ?? "");
  const [location, setLocation] = useState(firebaseUser?.location ?? "");
  const [gender, setGender] = useState(
    firebaseUser?.gender
      ? new IndexPath(
          genders.findIndex((gender) => gender === firebaseUser.gender)
        )
      : null
  );
  const [dob, setDob] = useState(
    firebaseUser?.dob ? new Date(firebaseUser?.dob?.seconds * 1000) : null
  );

  const onDoneButtonPress = async () => {
    const result = await firebaseUser.update(
      {
        name,
        email,
        gender: genders[gender?.row] ?? null,
        location: location ?? null,
        dob: dob ?? null,
      },
      "Awesome, profile updated!"
    );

    if (result) {
      navigation && navigation.goBack();
    }
  };

  const [isUploading, setIsUploading] = useState(false);

  const pickImagePress = async () => {
    const imageUri = await pickImage();

    setIsUploading(true);

    const publicImageUrl = await uploadImageAsync(imageUri, firebaseUser.uid);

    await firebaseUser.updateProfile({ photoURL: publicImageUrl });

    await firebaseUser.update({
      photoURL: publicImageUrl,
      hasCompletedOnboarding: true,
    });

    setIsUploading(false);
  };

  const renderPhotoButton = () => (
    <Button
      style={styles.photoButton}
      size="small"
      status="basic"
      icon={CameraIcon}
      onPress={pickImagePress}
    />
  );

  const BackIcon = (props) => (
    <TouchableOpacity
      onPress={() => {
        navigation && navigation.goBack();
      }}
    >
      <Icon {...props} name="arrow-back" />
    </TouchableOpacity>
  );

  const BackAction = () => <TopNavigationAction icon={BackIcon} />;

  return (
    <SafeAreaView style={styles.container} edges={["right", "top", "left"]}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        <TopNavigation
          alignment="center"
          title="Profile Settings"
          accessoryLeft={BackAction}
        />
        <Layout style={styles.photoSection} level="1">
          <ProfileAvatar
            style={styles.photo}
            source={firebaseUser.photoURL}
            editButton={renderPhotoButton}
          />
          <View style={styles.nameSection}>
            <ProfileSetting
              style={styles.setting}
              value={name}
              onChange={setName}
            />
          </View>
        </Layout>
        <Text style={styles.description} appearance="hint">
          {profile.description}
        </Text>
        <ProfileSetting
          style={[styles.setting, styles.emailSetting]}
          hint="Email"
          value={email}
          onChange={setEmail}
        />
        <ProfileSetting
          style={styles.setting}
          hint="Gender"
          value={gender}
          onChange={setGender}
          type="select"
          options={genders}
        />
        <ProfileSetting
          style={styles.setting}
          hint="Location"
          value={location}
          onChange={setLocation}
        />
        <ProfileSetting
          style={styles.setting}
          hint="Date of Birth"
          value={dob}
          type="date"
          onChange={setDob}
        />
        <Button
          style={styles.doneButton}
          onPress={onDoneButtonPress}
          disabled={isUpdatingUser}
        >
          {isUpdatingUser ? <Spinner /> : "Update"}
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
};

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    backgroundColor: "background-basic-color-2",
  },
  contentContainer: {
    paddingBottom: 24,
  },
  photoSection: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  photo: {
    aspectRatio: 1.0,
    height: 76,
  },
  photoButton: {
    aspectRatio: 1.0,
    height: 32,
    borderRadius: 16,
  },
  nameSection: {
    flex: 1,
    marginHorizontal: 8,
  },
  description: {
    padding: 24,
    backgroundColor: "background-basic-color-1",
  },
  doneButton: {
    marginHorizontal: 24,
    marginTop: 24,
  },
  setting: {
    padding: 16,
  },
  emailSetting: {
    marginTop: 24,
  },
});
