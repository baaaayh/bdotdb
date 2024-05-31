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

		const id = Number(req.body.id);
		const updatedProject = req.body; // 파일을 제외한 나머지 데이터
		const existingProject = await Project.findOne({ id: id }); // 기존 프로젝트 정보 가져오기

		// 이미지가 업로드된 경우와 아닌 경우를 구분하여 적절한 파일명 설정
		if (req.file) {
			updatedProject.thumbFileName = req.file.filename; // 업로드된 파일명 사용
		} else {
			updatedProject.thumbFileName = existingProject.thumbFileName; // 기존 파일명 사용
		}

		// 프로젝트 정보 업데이트
		await Project.findOneAndUpdate({ id: id }, updatedProject);
		return { msg: '수정되었습니다.' };
	} catch (error) {
		console.error(error);
		return createError({
			statusCode: 500,
			statusMessage: 'Something went wrong.',
		});
	}
});
