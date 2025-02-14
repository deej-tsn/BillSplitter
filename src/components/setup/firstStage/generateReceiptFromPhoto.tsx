import React, { useState } from "react";
import {setupPrompt, uploadToGemini, run} from "../../../ai/setup";
import { Receipt } from "../../../models/receipt";
import { useDispatch } from "react-redux";
import { setLeftOver } from "../../../store/session";

export default function GenerateReceiptFromPhoto() {
  const [image, setImage] = useState<string|null>(null);
  const [status , setStatus] = useState<'START'| 'LOADING' | 'SUCCESSFUL' | 'FAILED'>('START')

  const dispatch = useDispatch();

  const handleImageUpload = async (event : React.ChangeEvent<HTMLInputElement>) => {
    if(!event.target.files) return;
    const file = event.target.files[0];
    if (!file) return;

    // Preview Image
    const imageUrl = URL.createObjectURL(file);
    setImage(imageUrl);

    setStatus('LOADING');

    try {
      // Convert file to Blob URL or upload it
       // This is just a placeholder, Gemini API needs a proper path
      //const fileType = file.type; // Get the MIME type (e.g., image/png, image/jpeg)

      setupPrompt(); // Ensure Gemini model is set up

      // Upload the file to Gemini
      const uploadedFile = await uploadToGemini(file);

      if (uploadedFile) {
        //console.log("File uploaded:", uploadedFile);

        // Run AI processing on the uploaded file
        const result = await run(uploadedFile);
        const recipe = JSON.parse(result);
        recipe.items = recipe.Items;
        recipe.chargeStrategy = 'serviceChargeSeperate'
        dispatch(setLeftOver(recipe as Receipt))
        setStatus('SUCCESSFUL');
      }
    } catch (error) {
      console.error("Error processing receipt:", error);
      setStatus('FAILED')
    }
  };

    
    
    return (
      <div id="photoCapture">
        <h2>Generate Receipt From Photo</h2>
        <div id="photoHolder">
          {image && <img src={image} alt="Preview" id="preview" />}
        </div>
        <div id="statusHolder">
          {status === 'START' && 
          <>
            <label htmlFor="file-upload" className="custom-file-upload"> Upload Image </label>
            <input id="file-upload" type="file" accept="image/*" aria-hidden="true" onChange={handleImageUpload}/>
          </>}
          {status === 'LOADING' &&
            <h4>Loading...</h4>
          }
          {status === 'FAILED' && <h4>Failed to process receipt. Please try again.</h4>}
          {status === 'SUCCESSFUL' && <h4>Receipt processed successfully!</h4>}
        </div>
      </div>
      
    ); 
}