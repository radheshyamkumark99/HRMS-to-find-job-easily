import axios from "axios";
export const uploadFileToS3 = async (file) => {
  try {
    const fileName = file.name + Date.now();
    const response = await fetch("https://smart-hire-xj6h.onrender.com/proxy/putObject", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ fileName, contentType: file.type }),
    });

    if (!response.ok) {
      throw new Error("Failed to get the pre-signed URL for " + file.name);
    }
    const presignedUrl = await response.json();
    const fileReader = new FileReader();
    const binaryData = await new Promise((resolve, reject) => {
      fileReader.onloadend = () => resolve(fileReader.result);
      fileReader.onerror = () => reject(fileReader.error);
      fileReader.readAsArrayBuffer(file);
    });

    const uploadResponse = await axios.put(presignedUrl, binaryData, {
      headers: {
        "Content-Type": file.type,
      },
    });

    if (uploadResponse.status === 200) {
      const url = `https://reels-anshu.s3.eu-north-1.amazonaws.com/uploads/${fileName}`;
      return url;
    } else {
      throw new Error(
        `Error while uploading the file: ${uploadResponse.status}`
      );
    }
  } catch (error) {
    console.log("Error while uploading file:", error);
    throw error;
  }
};