import mongoose from 'mongoose';

const licensePlateSchema = mongoose.Schema({
    id: {
        type: String,
        unique: true
    },
    title: String,
    origin: String,
    imgUrl: String,
    //username
    owner: String,
});


var LicensePlate = mongoose.model('LicensePlate', licensePlateSchema);

export default LicensePlate;