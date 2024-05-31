// const cloud_name = "ddnepfewc";
// const upload_preset = "tien_social";

// export const uploadToCloudinary = async(pics: File, fileType: string): Promise<string | undefined> => {
//     if (pics && fileType) {
//         const data = new FormData();
//         data.append("file", pics);
//         data.append("upload_preset", upload_preset);
//         data.append("cloud_name", cloud_name);

//         const res =  await fetch(`https://api.cloudinary.com/v1_1/${cloud_name}/${fileType}/upload`,
//         {method:"POST",body:data}
        
//         )
//         console.log("res----------", res)
//         const fileData =  await res.json();
//         console.log("res--------------", fileData.url)
//         return fileData.url
//     }
//     else{
//         console.log("error.........")
//     }
// }

// cloudinary-upload.ts
const cloud_name = "ddnepfewc";
const upload_preset = "tien_social";

export const uploadToCloudinary = async (pics: File, fileType: string): Promise<string | undefined> => {
  if (pics && fileType) {
    const data = new FormData();
    data.append("file", pics);
    data.append("upload_preset", upload_preset);
    data.append("cloud_name", cloud_name);

    try {
      const res = await fetch(`https://api.cloudinary.com/v1_1/${cloud_name}/${fileType}/upload`, {
        method: "POST",
        body: data
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const fileData = await res.json();
      console.log("File uploaded to Cloudinary:", fileData.url);
      return fileData.url;
    } catch (error) {
      console.error("Error uploading to Cloudinary:", error);
      return undefined;
    }
  } else {
    console.error("Invalid file or file type.");
    return undefined;
  }
};

