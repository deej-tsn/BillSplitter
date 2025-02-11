import { GenerativeModel, GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GOOGLE_FLASH_API_KEY
const genAI = new GoogleGenerativeAI(apiKey)
let model: GenerativeModel;
let generationConfig : any

function setupPrompt() {
    generationConfig = {
      temperature: 1,
      topP: 0.95,
      topK: 40,
      maxOutputTokens: 8192,
      responseMimeType: "application/json",
      responseSchema: {
        type: "object",
        properties: {
          Items: {
            type: "array",
            items: {
              type: "object",
              properties: {
                name: {
                  type: "string"
                },
                quantity: {
                  type: "number"
                },
                price: {
                  type: "number"
                }
              },
              required: [
                "name",
                "quantity",
                "price"
              ]
            }
          },
          charges: {
            type: "array",
            items: {
              type: "object",
              properties: {
                name: {
                  type: "string"
                },
                percentage: {
                  type: "number"
                },
              },
              required: [
                "name",
                "percentage"
              ]
            }
          },
          cost: {
            type: "string"
          }
        },
        required: [
          "Items",
          "charges",
          "cost"
        ]
      },
    };

    model = genAI.getGenerativeModel({
        model: "gemini-2.0-flash",
        systemInstruction: "Parse the given receipt into the structured output. All discounts should be put as charges. All charges must put the percentage, ignored the increase/decrease. If a charge is a discount (negative total) make percentage negative. add no additional information.",
        generationConfig
      });
}

/*
async function uploadToGemini(path: string, mimeType: any) {
    const uploadResult = await fileManager.uploadFile(path, {
      mimeType,
      displayName: path,
    });
    const file = uploadResult.file;
    console.log(`Uploaded file ${file.displayName} as: ${file.name}`);
    return file;
}*/

async function uploadToGemini(file: any) {
  const reader = new FileReader();

  return new Promise((resolve, reject) => {
    reader.onload = async () => {
      try {
        if(reader.result == null) return
        const base64Data = reader.result.split(",")[1]; // Extract Base64 content
        const mimeType = file.type;

        let output = {
          inlineData : {
            data: base64Data,
            mimeType, // e.g., image/jpeg or image/png
            
          }
      }
        resolve(output);
      } catch (error) {
        reject(error);
      }
    };

    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file); // Convert file to Base64
  });
}

async function run(imagePart : any) {
    const result = await model.generateContent(["", imagePart]);
    console.log(result.response.text());
    return result.response.text();
}

export { setupPrompt, run, uploadToGemini} ;