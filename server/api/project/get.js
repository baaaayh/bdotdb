import Projects from '@/mongoose/schema.js';

export default defineEventHandler(async (event) => {
	if (event.req.method === 'POST') {
		const body = await readBody(event);
		const { ctg, text, page, pageSize } = body.params;
		const skip = (page - 1) * pageSize;

		let projects;
		let totalProjects;

		if (!text) {
			if (ctg) {
				projects = await Projects.find({ category: ctg }).sort({ id: -1 }).skip(skip).limit(pageSize);
				totalProjects = await Projects.countDocuments({ category: ctg });
			} else {
				projects = await Projects.find({}).sort({ id: -1 }).skip(skip).limit(pageSize);
				totalProjects = await Projects.countDocuments({});
			}
		} else if (text) {
			if (ctg) {
				projects = await Projects.find({ project: new RegExp(text, 'i'), category: ctg })
					.sort({ id: -1 })
					.skip(skip)
					.limit(pageSize);
				totalProjects = await Projects.countDocuments({ project: new RegExp(text, 'i'), category: ctg });
			} else {
				projects = await Projects.find({ project: new RegExp(text, 'i') })
					.sort({ id: -1 })
					.skip(skip)
					.limit(pageSize);
				totalProjects = await Projects.countDocuments({ project: new RegExp(text, 'i') });
			}
		}

		const totalPages = Math.ceil(totalProjects / pageSize);

		return {
			projects,
			totalPages,
		};
	} else if (event.req.method === 'GET') {
		return await Projects.find({});
	}
});
