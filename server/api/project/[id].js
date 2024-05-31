import { defineEventHandler } from 'h3';
import Project from '@/mongoose/schema.js';

export default defineEventHandler(async (event) => {
    if (event.req.method === 'GET') {
        const id = event.context.params.id;
        return await Project.findOne({ id: id }).then((data) => {
            return data;
        });
    }
    if (event.req.method === 'DELETE') {
        const id = event.context.params.id;
        await Project.findOneAndDelete({ id: id });
        return { msg: '삭제되었습니다.' };
    }
});
