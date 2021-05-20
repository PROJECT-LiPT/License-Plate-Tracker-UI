import express from 'express';
import request from 'request';
import LicensePlate from '../models/licensePlate.js';
import User from '../models/user.js';
import findCity from '../utils/findCity.js'

const router = express.Router();

export const getLicensePlates = async (req, res) => { 
    try {
        const licensePlates = await LicensePlate.find();
                
        res.status(200).json(licensePlates);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const deleteLicensePlate = async (req, res) => { 
    const { id } = req.params;
    try {
        const licensePlate = await LicensePlate.findOneAndDelete({id: id});
        res.status(200).json(licensePlate);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createLicensePlate = async (req, res) => {
    const { id, imgUrl, title, origin, uploader, process, step1, step2} = req.body;

    const newLicensePlate = new LicensePlate(
        { 
            id: id, 
            imgUrl: imgUrl, 
            title: title,
            origin: title ? findCity(title) : '',
            uploader: uploader,
            process: process,
            step1: step1,
            step2: step2 
        }
    );
    
    // find user and push this id to lpList
    try {
        await newLicensePlate.save();
        const user = await User.findOne({userName: uploader});
        const updatedUser = await User.findOneAndUpdate(
            {userName: user.userName},
            {
                $push: {lpList: id}
            },
            {new: true}
            );
        //todo: send imgUrl to Flask Server 
        // const endpoint = 'http://127.0.0.1:5000/prediction/';
        // console.log(endpoint);
        // req.pipe(request.post(endpoint)).pipe(res);
        // console.log(res);
        res.status(201).json(newLicensePlate);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const updateLicensePlate = async (req, res) => { 
    const { id } = req.params;
    const { imgUrl, title, origin, step1, step2, process } = req.body;
    try {
        const licensePlate = await LicensePlate.findOne({id: id});
        //todo: send imgUrl to Flask Server 
        const updatedLicensePlate = await LicensePlate.findOneAndUpdate(
            {id: licensePlate.id},
            {
                imgUrl: imgUrl, 
                title: title,
                origin: origin,
                step1: step1,
                step2: step2,
                process: process
            },
            {new: true}
        );
        res.status(200).json(updatedLicensePlate);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export default router;