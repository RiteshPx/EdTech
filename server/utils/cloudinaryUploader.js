const cloudinary = require('cloudinary').v2;

const uploadToCloudinary = async (file, folder, height, quality) => {
  try {
    const options = { folder, resource_type: 'auto' };
    
    if (height) options.height = height;
    if (quality) options.quality = quality;
    
    // Ensure tempFilePath exists or adjust the key based on your file object
    return await cloudinary.uploader.upload(file.tempFilePath, options);
  } catch (e) {
    console.error('Unable to upload image on Cloudinary:', e);
    throw new Error('Cloudinary upload failed');
  }


};









module.exports = uploadToCloudinary;









// const cloudinary = require('cloudinary').v2

// const uploadToCloudinary = async (file, folder)=>{            // height, quality) => {
//     try {
//         const options = { folder };
//         if (height) {
//             options.height = height;
//         }
//         if (quality) {
//             options.quality = quality;
//         }
//         options.resource_type = 'auto';
//         return await cloudinary.uploader.upload(file.tempFilePath, options);

//     }
//     catch (e) {
//         console.error('unable to upload image on cloudinary')
//     }


// }
// module.exports = uploadToCloudinary;