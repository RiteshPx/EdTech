const Course = require("../models/Course");
const Section = require("../models/Section");
const mongoose = require('mongoose');


//create Section of course
exports.createSection = async (req, res) => {
    try {
        //data fetch
        const { sectionName, courseId } = req.body;

        //validation data
        if (!sectionName || !courseId) {
            return res.status(400).json({
                success: false,
                message: 'all field are required',
            })
        }

        //create section in db
        const createSection = await Section.create({ sectionName })

        //update course with add section in it 
        const uid = new mongoose.Types.ObjectId(courseId);                  //string to object id
        const updateCourse = await Course.findByIdAndUpdate({_id:uid },
            {
                $push:
                {
                    courseContent: createSection._id,
                }
            },
            { new: true }
            )
            .populate({
                path : 'courseContent',
                populate : 'subSection'
    })


        //res send
        res.status(200).json({
            success: true,
            message: 'section is created successfully',
            updateCourse,
        })

    }
    catch (e) {
        res.status(400).json({
            success: false,
            message: e.message,
        })
    }
}


//update section
exports.updateSection = async (req, res) => {
    try {
        //fetch data
        const { sectionName, sectionId } = req.body;

        //validate data
        if (!sectionName || !sectionId) {
            return res.status(400).json({
                success: false,
                message: 'all field are required',
            })
        }

        //update section in db
        const uid = new mongoose.Types.ObjectId(sectionId);                  //string to object id
        const section = await Section.findByIdAndUpdate({ _id:uid },
            { sectionName },
            { new: true }
        );


        //return res
        res.status(200).json({
            success: true,
            message: 'section is updated successfully',
            section
        })

    }
    catch (e) {
        res.status(400).json({
            success: false,
            message: e.message,
            
        })
    }
}


//delete the section
exports.deleteSection = async (req, res) => {
    try {
        //fetch id throw the params - sending ID in params
        const { sectionId } = req.params;

        //delete sectionId from course first
         //===============================//at ahead

        //delete section
        await Section.findByIdAndDelete(sectionId);

        res.status(200).json({
            success: true,
            message: 'section is delete successfully',
        })

    }
    catch (e) {
        res.status(400).json({
            success: false,
            message: e.message,
        })
    }
}