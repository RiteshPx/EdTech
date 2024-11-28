const cloudinary = require('cloudinary').v2

// Function to extract the public ID from the secure_url
const getPublicIdFromUrl = (secureUrl) => {
    const urlParts = secureUrl.split('/');
    const publicIdWithExtension = urlParts.slice(-1)[0]; // e.g., "video.mp4"
    return publicIdWithExtension.split('.')[0]; // Remove file extension
};

// Function to delete a video
exports.deleteVideo = async (secureUrl) => {
    const publicId = getPublicIdFromUrl(secureUrl);
    try {
        const result = await cloudinary.uploader.destroy(publicId, { resource_type: 'video' });
        console.log('Video deleted successfully:', result);
    } catch (err) {
        console.error('Error deleting video:', err);
    }
};
