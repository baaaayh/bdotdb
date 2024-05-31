import multer from 'multer';
import path from 'path';
import { createError } from 'h3';
import Project from '@/mongoose/schema.js';

// multer 설정
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, path.join(process.cwd(), 'public/uploads'));
	},
	filename: (req, file, cb) => {
		const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
		cb(null, uniqueSuffix + path.extname(file.originalname));
	},
});

const upload = multer({
	storage: storage,
	fileFilter: (req, file, cb) => {
		if (file.mimetype == 'image/png' || file.mimetype == 'image/jpeg') {
			cb(null, true);
		} else {
			cb(new Error('Invalid file type'));
		}
	},
});

export default fromNodeMiddleware(async (req, res) => {
	try {
		await new Promise((resolve, reject) => {
			upload.single('thumbFile')(req, res, (err) => {
				if (err) {
					reject(err);
				} else {
					resolve();
				}
			});
		});

		const formData = req.body;

		if (req.file) {
			formData.thumbFileName = req.file.filename;
		}

		await Project.create(formData);

		return { msg: '등록 성공.' };
	} catch (error) {
		console.error(error);
		return createError({
			statusCode: 500,
			statusMessage: 'Something went wrong.',
		});
	}
});
