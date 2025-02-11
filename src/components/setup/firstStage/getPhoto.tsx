import React, { useState } from "react";
import {setupPrompt, uploadToGemini, run} from "../../../ai/setup";
import { Receipt } from "../../../models/receipt";
import { useDispatch } from "react-redux";
import { setLeftOver } from "../../../models/session";

export default function GetPhotoFromUser() {
  const [image, setImage] : any = useState(null);
  const [loading, setLoading] = useState(false);
  const [receiptData, setReceiptData] : any = useState(null);

  const dispatch = useDispatch();

  const handleFileChange = async (event : React.ChangeEvent<HTMLInputElement>) => {
    if(event.target.files == undefined) return
    const file = event.target.files[0];
    if (!file) return;

    // Preview Image
    const imageUrl = URL.createObjectURL(file);
    setImage(imageUrl);

    setLoading(true);
    try {
      // Convert file to Blob URL or upload it
       // This is just a placeholder, Gemini API needs a proper path
      //const fileType = file.type; // Get the MIME type (e.g., image/png, image/jpeg)

      setupPrompt(); // Ensure Gemini model is set up

      // Upload the file to Gemini
      const uploadedFile = await uploadToGemini(file);

      if (uploadedFile) {
        console.log("File uploaded:", uploadedFile);

        // Run AI processing on the uploaded file
        const result = await run(uploadedFile);
        const recipe = JSON.parse(result);
        recipe.items = recipe.Items;
        recipe.chargeStrategy = 'serviceChargeSeperate'
        setReceiptData(result); // Store AI response
        dispatch(setLeftOver(recipe as Receipt))
      }
    } catch (error) {
      console.error("Error processing receipt:", error);
    }
    setLoading(false);
  };

    
    
    return (
      <div id="photoCapture">
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {image && <img src={image} alt="Preview" id="preview" />}
      {loading && <p>Processing receipt...</p>}
      {receiptData && (
        <div className="mt-4 p-4 border rounded">
          <h3>Extracted Receipt Data:</h3>
          <pre className="text-sm">{JSON.stringify(receiptData, null, 2)}</pre>
        </div>
      )}
    </div>
      
    ); 
}