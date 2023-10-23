export const getImageSrc = (imageUrl) => {
  if (imageUrl) {
    return imageUrl;
  } else {
    return "/defaultImage.png";
  }
};
