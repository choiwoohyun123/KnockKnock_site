import { useState } from "react";

export const useImageUpload = () => {
  const [imageUrl, setImageUrl] = useState("");

  const handleImageUpload = (e) => {
    const input = e.target;
    setImageUrl(input.files[0]);

    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const preview = document.getElementById("preview");
        if (preview) {
          preview.src = e.target.result;
        }
      };
      reader.readAsDataURL(input.files[0]);
    }
  };

  return [imageUrl, handleImageUpload];
};
