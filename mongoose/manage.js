import mongoose from 'mongoose';
const { Schema } = mongoose;

const manageSchema = new Schema({
    id: {
        type: String,
        unique: true,
        required: true,
    },
    pw: {
        type: String,
        required: true,
    },
});

const Manage = mongoose.model('Manage', manageSchema);

export default Manage;
