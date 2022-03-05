const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const reportSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    creatorId: {
        type: String,
        required: false
    },
    category: {
        type: String,
        required: true,
        enum: ['Health', 'Traffic', 'Women Safety'],
    },
    status: {
        type: Number,
        required: false
    },
    images:{
        type: Array,
        required: false
    },
    // address: {
    //     type: String,
    //     required: true
    // },
	// city:{
    //     type: String,
    //     required: true
    // },
	// landmark:{
    //     type: String,
    //     required: true
    // },
	// state:{
    //     type: String,
    //     required: true
    // },
    // pincode: {
    //     type: String,
    //     required: true
    // },
    // user: {
    //     type: Object,
    //     required: true
    // },
    // comments: {
    //     type: Array,
    //     required: true
    // }
},{timestamps: {createdAt: 'createdAt', updatedAt: 'updatedAt'}})

module.exports = mongoose.model('Reports', reportSchema)