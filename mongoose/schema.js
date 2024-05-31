import mongoose from 'mongoose';
const { Schema } = mongoose;

const ProjectSchema = new Schema({
	id: {
		type: Number,
		unique: true,
		required: true,
	},
	update: {
		type: Number,
	},
	made: {
		type: Number,
		requried: true,
	},
	category: {
		type: String,
		required: true,
	},
	notice: {
		type: String,
	},
	project: {
		type: String,
		required: true,
	},
	period: {
		type: String,
	},
	contractor: {
		type: String,
	},
	manager: {
		type: String,
	},
	email: {
		type: String,
	},
	phone: {
		type: String,
	},
	planning: {
		type: String,
	},
	markup: {
		type: String,
	},
	design: {
		type: String,
	},
	frontUrl: {
		type: String,
	},
	adminUrl: {
		type: String,
	},
	adminId: {
		type: String,
	},
	adminPw: {
		type: String,
	},
	ftp: {
		type: String,
	},
	ftpId: {
		type: String,
	},
	ftpPw: {
		type: String,
	},
	hosting: {
		type: String,
	},
	thumbFileName: {
		type: String,
	},
});

const Project = mongoose.model('Project', ProjectSchema);

export default Project;
