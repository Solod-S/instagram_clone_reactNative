import USERS from "./users";

export const posts = [
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
        commentId: "cm01",
        comment: "Wow! This looks fire!!",
      },
      {
        user: "IgorNikolayevich",
        userId: "us2",
        commentId: "cm02",
        comment: "Nice train =)",
      },
    ],
  },
  {
    id: "po2",
    postImage: require("../assets/posts/christmas.jpg"),
    user: USERS[1].name,
    likes: 8350,
    caption:
      "We wish you a merry Christmas. We wish you a merry Christmas. We wish you a merry Christmas and a happy new year. Good tidings we bring to you and your kin. We wish you a merry Christmas and a happy new year",
    profile_picture: USERS[1].image,
    comments: [
      {
        user: "IgorNikolayevich",
        userId: "us2",
        commentId: "cm03",
        comment: "Thnx! This looks amazing!!",
      },
      // {
      //   user: "Nikola",
      //   userId: "us4",
      //   comment: "Nice picture =)",
      // },
    ],
  },
  {
    id: "po3",
    postImage: require("../assets/posts/coding.jpg"),
    user: USERS[2].name,
    likes: 1350,
    caption: "Codding",
    profile_picture: USERS[2].image,
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
