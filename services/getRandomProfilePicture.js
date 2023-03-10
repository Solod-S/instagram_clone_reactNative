const getRandomProfilePicture = async () => {
  const response = await fetch(
    "https://randomuser.me/api/0.4/?lego&randomapi&results=1"
  );
  const data = await response.json();

  return data.results[0].user.picture;
};

export default getRandomProfilePicture;
