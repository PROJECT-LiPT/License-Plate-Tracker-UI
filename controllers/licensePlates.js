import express from 'express';

import LicensePlate from '../models/licensePlate.js';
import User from '../models/user.js';

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
    const { id, imgUrl, title, origin, owner} = req.body;

    const newLicensePlate = new LicensePlate(
        { 
            id: id, 
            imgUrl: imgUrl, 
            title: title,
            origin: origin,
            owner: owner, 
        }
    );
    //todo: find user and push this id to lpList
    //todo: send imgUrl to Flask Server 
    try {
        await newLicensePlate.save();
        res.status(201).json(newLicensePlate);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const updateLicensePlate = async (req, res) => { 
    const { id } = req.params;
    const { imgUrl, title, origin, } = req.body;
    try {
        const licensePlate = await LicensePlate.findOne({id: id});
        //todo: send imgUrl to Flask Server 
        const updatedLicensePlate = await LicensePlate.findOneAndUpdate(
            {id: licensePlate.id},
            {
                imgUrl: imgUrl, 
                title: title,
                origin: origin
            },
            {new: true}
        );
        res.status(200).json(updatedLicensePlate);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export default router;