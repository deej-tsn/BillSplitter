import React, { useState } from "react";

export default function GetPhotoFromUser() {
    const [image, setImage] : [string | null, any ] = useState(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault()
        if(event.target.files == null) return;
        const file = event.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setImage(imageUrl);
        }
    };
    return (
      <div id="photoCapture">
        <input type="file" accept="image/*" onChange={handleFileChange} />
        {image && <img src={image} alt="Preview" id="preview"/>}
      </div>
    ); 
}