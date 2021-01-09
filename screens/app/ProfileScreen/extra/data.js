// export class Profile {
//   constructor(
//     firstName,
//     lastName,
//     photo,
//     location,
//     description,
//     followers,
//     following,
//     posts
//   ) {}

//   get fullName() {
//     return `${this.firstName} ${this.lastName}`;
//   }

export const Profile = {
  helenKuper: {
    firstName: "Helen",
    lastName: "Kuper",
    photo: require("../assets/image-profile-1.jpg"),
    location: "Germany",
    description:
      "I'm a Traveler. I'm like listening to music, going to the cinema, walking with my friends, drawing pictures and traveling.",
    followers: 1500,
    following: 86,
    posts: 116,
  },

  jenAustin: {
    firstName: "Jen",
    lastName: "Austin",
    photo: require("../assets/image-profile-2.jpg"),
    location: "Tokyo",
    description:
      "I'm a Traveler. I'm like listening to music, going to the cinema, walking with my friends, drawing pictures and traveling.",
    followers: 2500,
    following: 172,
    posts: 25,
  },

  jenniferGreen: {
    firstName: "Jennifer",
    lastName: "Green",
    photo: require("../assets/image-profile-3.jpg"),
    location: "Germany",
    description:
      "Hi! My name is Jennifer. I’m 25 and I live in Berlin. I’m interested in computer science, music, sport and fantasy literature.",
    followers: 2500,
    following: 172,
    posts: 25,
  },
};

export const Post = {
  plant1: {
    photo: require("../assets/image-plant-1.jpg"),
    category: "Plants",
  },
  travel1: {
    photo: require("../assets/image-travel-1.jpg"),
    category: "Travel",
  },

  style1: {
    photo: require("../assets/image-style-1.jpg"),
    category: "Style",
  },
};
