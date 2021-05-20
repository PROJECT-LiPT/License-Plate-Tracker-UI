import mongoose from 'mongoose';

const licensePlateSchema = mongoose.Schema({
    id: {
        type: String,
        unique: true
    },
    title: String,
    origin: String,
    //origin image
    imgUrl: String,
    //processed images
    step1: String,
    step2: String,
    //total process time
    process: Number,
    //username
    uploader: String,
});


var LicensePlate = mongoose.model('LicensePlate', licensePlateSchema);

export default LicensePlate;