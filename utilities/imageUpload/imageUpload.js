import { Platform } from "react-native";
import * as ImagePicker from "expo-image-picker";
import firebase from "firebase/app";
import "firebase/storage";

export async function uploadImageAsync(
  uri,
  fileName,
  filePath = "/images/profile/"
) {
  try {
    // Why are we using XMLHttpRequest? See:
    // https://github.com/expo/expo/issues/2402#issuecomment-443726662
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log(e);
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send(null);
    });

    const ref = firebase
      .storage()
      .ref()
      .child(filePath + fileName);
    const snapshot = await ref.put(blob);

    // We're done with the blob, close and release it
    if (typeof blob.close === "function") {
      blob.close();
    }

    return await snapshot.ref.getDownloadURL();
  } catch (err) {
    console.log(err);
    toast.show("Error uploading image, sorry! " + uri);
    return null;
  }
}

export const pickImage = async () => {
  if (Platform.OS !== "web") {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
      return;
    }
  }

  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });

  if (!result.cancelled) {
    return result.uri;
  }
  return null;
};
