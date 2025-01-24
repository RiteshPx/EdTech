const Category = require('../models/Category');
const mongoose = require('mongoose');

//create Category handler function
exports.createCategory = async (req, res) => {
    try {
        //fetch  ,left courese till now
        const { name, description } = req.body;

        //validate
        if (!name || !description) {
            res.status(400).json({
                success: false,
                message: "all field are required",
            })
        }

        //save in db
        const categoryDetails = await Category.create({
            name,
            description,
        })
        return res.status(200).json({message:" create successfully",categoryDetails})
    }
    catch (e) {
        return res.status(400).json({
            success: false,
            message: e.message,
        })
    }
}

//getAllcategorys handle function
exports.showAllCategorys = async (req, res) => {
    try {
        const allCategorys = await Category.find({}, { name: true, description: true });
        res.status(200).json({
            success: true,
            messsage: "all categorys are send Successfully",
            allCategorys,
        })

    }
    catch (e) {
        res.status(400).json({
            success: false,
            message: e.message,
        })
    }
}

//get categoty page Details   
exports.getCategoryPageDetail = async (req, res) => {
    try {
        const { categoryId } = req.body;
        const cid = new mongoose.Types.ObjectId(categoryId);                  //string to object id

        //get all course of this category
        const selectCategory = await Category.findById({ _id:cid })
            .populate('courses')
            .exec();

        //validate
        if (!selectCategory) {
            return res.status(404).json({ message: "Data not found in this category" })
        }

        //get course of different categories
        const differentCategory = await Category.find(
            {
                _id: {
                    $ne: categoryId
                }
            })
            .populate('courses')
            .exec();

        //get top selling courses
        // h.w===================================

        //send res
        return res.status(200).json({
            success: true,
            selectCategory,
            differentCategory
        })
    }
    catch (e) {
        return res.status(500).json({
            success: false,
            message: e.message,
        })
    }
}