export const isWriter = ({ userId, post }) => {
  if (userId == post.userId) {
    return true;
  } else {
    return false;
  }
};
