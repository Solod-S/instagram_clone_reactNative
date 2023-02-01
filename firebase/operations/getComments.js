const getComments = async (postId, userId, commentId) => {
  const date = new Date().toLocaleDateString();
  const time = new Date()
    .toLocaleTimeString()
    .split(":")
    .splice(0, 2)
    .join(":");
  const created = Date.now().toString();
  const uniqueCommentId = uuidv4();

  const dbRef = doc(
    fsbase,
    `users/${userId}/posts/${postId}/comments/${commentId}`
  );
  const postsDetails = await getDoc(dbRef);
  const currentData = postsDetails.data();
};
