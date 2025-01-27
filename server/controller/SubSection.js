const Section = require("../models/Section");
const SubSection = require("../models/SubSection");
const imageUploadToCloudinary = require('../utils/cloudinaryUploader');
const deleteVideoFromCloudinary = require('../utils/deleteVideoFromCloudinary');
const mongoose = require("mongoose");
require('dotenv').config();

//create subSection
exports.createSubSection = async (req, res) => {
    try {

        //fetch data and video
        console.log("files",req.files)
        const { sectionId, title, timeDuration, description } = req.body;
        const video = req.files.videoFile;

        //validation
        if (!sectionId || !title || !timeDuration || !description || !video) {
            return res.status(400).json({
                success: false, 
                message: "ALl fields are required"
            })
        }

        //upload video to cloudinary
        const videoUpload = await imageUploadToCloudinary(video, process.env.FOLDER_NAME);

        //create a subsection
        const createSubSection = await SubSection.create(
            {
                title,
                timeDuration,
                description,
                videoUrl: videoUpload.secure_url,
            })

        //update subsection in section 
        const updateSection = await Section.findByIdAndUpdate({ _id:sectionId },
            {
                $push: {
                    subSection: createSubSection._id,
                }
            },
            { new: true },
        ).populate("subSection").exec();


        //res send 
        res.status(200).json({
            success: true,
            message: "successfully create subsection",
            createSubSection,
            updateSection,
        })
    }
    catch (e) {
        console.error(e);
        res.status(400).json({
            success: false,
            message: e.message
        })
    }
}

//update subsection
exports.updateSubSection = async (req, res) => {
    try {
        //fetch data and video
        const { title, timeDuration, description, subSectionId } = req.body;
        //    const video = req.files.videoFile;   //not update ,only delte

        //validation taht field with update data or previous data
        if (!subSectionId || !title || !timeDuration || !description) {
            return res.status(400).json({
                success: false,
                message: "ALl fields are required"
            })
        }

        //update data in subsection
        const subSection = await SubSection.findOneAndUpdate({ _id:subSectionId },
            {
                title,
                timeDuration,
                description,
            },
            { new: true },
        )

        res.status(200).json({
            success: true,
            message: "successfully update subsection",
            subSection,
        })
    }
    catch (e) {
        console.error(e);
        res.status(400).json({
            success: false,
            message: "Error to update subsection",
        })
    }
}

//delete subsection
exports.deleteSubSection = async (req, res) => {
    try {
        //fetch from params
       const subSecId = req.params.subSectionId;        //error in postman
       console.log("sectionid::",req.params.subSectionId);
        //delete subsection from section
        // ============================todo=======================

        //delete video from cloudinary
        const uid = new mongoose.Types.ObjectId(subSecId);                  //string to object id
        const subSectionDetail= await SubSection.findById({_id: uid });
       
      //validate
      if(!subSectionDetail){
        return res.status(400).json({
            success: false,
            message: "error to delete"
        })
      }
           //delete data from cloudinary
      //  await deleteVideoFromCloudinary(subSectionDetail.videoUrl);   

        //delete subsection
        await SubSection.findByIdAndDelete({ _id:uid });

        res.status(200).json({
            success: true,
            message: "successfully delete subsection",
        })
    }
    catch (e) {
        console.error(e);
        res.status(400).json({
            success: false,
            message: e.message
        })
    }
}