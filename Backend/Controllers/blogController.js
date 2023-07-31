const Blogs = require('../Models/blogModel');
const Joi = require('joi');
const logger = require('../Logger/winston');
const mongoose = require('mongoose');

const validateUserPost = (blog) => {
    const Schema = {
        title: Joi.string().min(3).required(),
        body: Joi.string().min(3).required(),
        category: Joi.string().required(),
    }
    return results = Joi.validate(blog, Schema)
}

const getAllBlogs = async (req, res) => {
    try{
        const blogs = await Blogs.find({}).sort({_id: -1})
        res.status(200).json(blogs)
    }
    catch(err){
        console.log(err.message)
        res.status(404).send('Something went wrong')
        logger.error(`All blogs: ${err.message}`)
    }
}

const getASingleBlog = async (req, res) => {
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'Blog not found'})
    }
    try{
        const blog = await Blogs.findById(id)
        res.status(200).json(blog)
    }
    catch(err){
        console.log(err.message)
        logger.error(`Single blog error: ${err.message}`)
    }
}


const postABlog = async (req, res) => {
    const {title, body, category} = req.body
    const {error} = validateUserPost(req.body)
    if(error){
        res.status(400).json({error: error.details[0].message})
    }
    try{
        const post = await Blogs.create({title, body, category})
        res.status(201).json(post)
        
    }
    catch(err){
        console.log(err.message)
        logger.error(`Posting blog error: ${err.message}`)
    }
}

const patchABlog = async (req, res) => {
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'Blog not found'})
    }
    try{
        const patch = await Blogs.findOneAndUpdate({_id: id}, {
            ...req.body
        })
        res.status(200).json(patch)
    }
    catch(err){
        console.log(err.message)
        logger.error(`Patching blog error: ${err.message}`)
    }

}

const deleteABlog = async (req, res) => {
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'Blog not found'})
    }
    try{
        const deleteBlog = await Blogs.findOneAndDelete({_id: id})
        if(!deleteBlog) return res.status(404).json({msg: 'Blog not found'})
        res.status(200).json(`Blog deleted: id:${deleteBlog._id}`)
    }
    catch(err){
    console.log(err.message)

    }
}




module.exports = {
    getAllBlogs, getASingleBlog, postABlog, patchABlog, deleteABlog
}