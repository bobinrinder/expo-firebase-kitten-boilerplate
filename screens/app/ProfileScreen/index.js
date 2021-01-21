import React from "react";
import { ScrollView, View, Image } from "react-native";
import {
  Avatar,
  Button,
  List,
  StyleService,
  Text,
  useStyleSheet,
  Icon,
  OverflowMenu,
  MenuItem,
} from "@ui-kitten/components";
import ImageOverlay from "./../../../components/ImageOverlay/ImageOverlay";
import { ProfileSocial } from "./extra/profile-social.component";
import { MessageCircleIcon, PersonAddIcon, PinIcon } from "./extra/icons";
import { Profile } from "./extra/data";
import useFirebaseUser from "./../../../hooks/useFirebaseUser";
import { TopNavigation, TopNavigationAction } from "@ui-kitten/components";
import { SafeAreaView } from "react-native-safe-area-context";
import "firebase/auth";

const MenuIcon = (props) => <Icon {...props} name="more-vertical" />;

const InfoIcon = (props) => <Icon {...props} name="settings-2-outline" />;

const LogoutIcon = (props) => <Icon {...props} name="log-out" />;

const profile = Profile.helenKuper;

const friends = [
  Profile.jenAustin,
  Profile.jenniferGreen,
  Profile.helenKuper,
  Profile.jenAustin,
  Profile.jenniferGreen,
  Profile.helenKuper,
];

export default ({ navigation }) => {
  const styles = useStyleSheet(themedStyle);
  const [firebaseUser] = useFirebaseUser();

  const onFollowButtonPress = () => {
    navigation && navigation.goBack();
  };

  const onMessageButtonPress = () => {
    // navigation && navigation.navigate("Chat1");
  };

  const renderFriendItem = (info) => (
    <View style={styles.friendItem}>
      <Avatar source={info.item.photo} />
      <Text style={styles.friendName} category="c2">
        {info.item.firstName}
      </Text>
    </View>
  );

  const [menuVisible, setMenuVisible] = React.useState(false);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const renderMenuAction = () => (
    <TopNavigationAction icon={MenuIcon} onPress={toggleMenu} />
  );

  const onItemSelect = (index) => {
    setMenuVisible(!menuVisible);
    if (index.row === 0) {
      navigation && navigation.navigate("ProfileSettingsScreen");
    }
    if (index.row === 1) {
      firebaseUser.signOut();
    }
  };

  const renderRightActions = () => (
    <React.Fragment>
      <OverflowMenu
        anchor={renderMenuAction}
        visible={menuVisible}
        onBackdropPress={toggleMenu}
        onSelect={onItemSelect}
      >
        <MenuItem accessoryLeft={InfoIcon} title="Settings" />
        <MenuItem accessoryLeft={LogoutIcon} title="Logout" />
      </OverflowMenu>
    </React.Fragment>
  );

  if (!firebaseUser) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container} edges={["right", "top", "left"]}>
      <ScrollView style={styles.container}>
        <TopNavigation
          alignment="center"
          title="Profile"
          accessoryRight={renderRightActions}
        />
        <ImageOverlay
          style={styles.header}
          source={require("./assets/image-background.jpg")}
        >
          <Avatar
            style={styles.profileAvatar}
            source={{
              uri: firebaseUser?.photoURL,
            }}
          />
          <Text style={styles.profileName} category="h5" status="control">
            {firebaseUser.name}
          </Text>
          <View style={styles.locationContainer}>
            <PinIcon />
            <Text style={styles.location} status="control">
              {firebaseUser.location}
            </Text>
          </View>
          <View style={styles.profileButtonsContainer}>
            <Button
              style={styles.profileButton}
              icon={PersonAddIcon}
              onPress={onFollowButtonPress}
            >
              FOLLOW
            </Button>
            <Button
              style={styles.profileButton}
              status="control"
              icon={MessageCircleIcon}
              onPress={onMessageButtonPress}
            >
              MESSAGE
            </Button>
          </View>
          <View style={styles.socialsContainer}>
            <ProfileSocial
              style={styles.profileSocial}
              hint="Followers"
              value={`${profile.followers}`}
            />
            <ProfileSocial
              style={styles.profileSocial}
              hint="Following"
              value={`${profile.following}`}
            />
            <ProfileSocial
              style={styles.profileSocial}
              hint="Posts"
              value={`${profile.posts}`}
            />
          </View>
        </ImageOverlay>
        <Text style={styles.sectionLabel} category="s1">
          About
        </Text>
        <Text style={styles.profileDescription} appearance="hint">
          {profile.description}
        </Text>
        <Text style={styles.sectionLabel} category="s1">
          Friends
        </Text>
        <List
          contentContainerStyle={styles.friendsList}
          horizontal={true}
          data={friends}
          renderItem={renderFriendItem}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const themedStyle = StyleService.create({
  container: {
    flex: 1,
    backgroundColor: "background-basic-color-2",
  },
  header: {
    paddingVertical: 24,
    alignItems: "center",
  },
  profileAvatar: {
    width: 124,
    height: 124,
    borderRadius: 62,
    marginVertical: 16,
  },
  profileName: {
    zIndex: 1,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  location: {
    marginVertical: 8,
  },
  profileButtonsContainer: {
    flexDirection: "row",
    marginVertical: 32,
    marginHorizontal: 20,
  },
  profileButton: {
    flex: 1,
    marginHorizontal: 4,
  },
  socialsContainer: {
    flexDirection: "row",
    width: "75%",
    marginVertical: 8,
  },
  profileSocial: {
    flex: 1,
  },
  sectionLabel: {
    marginTop: 24,
    marginBottom: 8,
    marginHorizontal: 16,
  },
  profileDescription: {
    marginHorizontal: 16,
  },
  friendsList: {
    marginHorizontal: 8,
  },
  friendItem: {
    alignItems: "center",
    marginHorizontal: 8,
  },
  friendName: {
    marginTop: 8,
  },
  postItem: {
    flex: 1,
    aspectRatio: 1.0,
  },
});
