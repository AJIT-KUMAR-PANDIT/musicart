const express=require('express');
const Feedback=require('../models/Feedback');


const takeFeedback= async(req,res)=>{

    try{
        const {type,feedback}=req.body;
        const newFeedback=new Feedback({type,feedback});

        await newFeedback.save();
        res.status(201).json({message:"Feedback submitted successfully"});

    }catch(error){
      console.error(error);
      res.status(500).json({error:"Error submitting feedback.."})
    }
}

module.exports={takeFeedback};

