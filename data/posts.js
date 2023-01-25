import USERS from "./users";

export const POSTS = [
  {
    id: "po1",
    postImage: require("../assets/posts/train.jpg"),
    user: USERS[0].name,
    likes: 7870,
    caption: "Train Ride to Hell",
    profile_picture: USERS[0].image,
    comments: [
      {
        user: "Mihail",
        userId: "us3",
        comment: "Wow! This looks fire!!",
      },
      {
        user: "IgorNikolayevich",
        userId: "us2",
        comment: "Nice train =)",
      },
    ],
  },
  {
    id: "po2",
    postImage: require("../assets/posts/christmas.jpg"),
    user: USERS[1].name,
    likes: 8350,
    caption: "Merry Christmas",
    profile_picture: USERS[1].image,
    comments: [
      {
        user: "IgorNikolayevich",
        userId: "us2",
        comment: "Thnx! This looks amazing!!",
      },
      {
        user: "Nikola",
        userId: "us4",
        comment: "Nice picture =)",
      },
    ],
  },
];
