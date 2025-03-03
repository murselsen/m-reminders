import fs from 'fs';
import path from 'path';

const getCategory = async (category) => {
    let dbCategories = await fs.readFileSync(path.join(process.cwd(), 'db', 'categories.json'), 'utf8');
    dbCategories = JSON.parse(dbCategories);
    const foundCategory = dbCategories.find(cat => cat.title.toLowerCase() === category);
    return foundCategory;
 };
export default getCategory;