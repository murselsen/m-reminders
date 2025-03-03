import fs from 'fs';
import path from 'path';
const getCategories = async () => {
  let dbCategories = await fs.readFileSync(path.join(process.cwd(), 'db', 'categories.json'), 'utf8');
  let dbTodos = await fs.readFileSync(path.join(process.cwd(), 'db', 'todos.json'), 'utf8');

  dbCategories = JSON.parse(dbCategories);
  dbTodos = JSON.parse(dbTodos);

  const todos = [];

  dbCategories.forEach((category, index) => {
    console.log('Category:', category.title);
    // const keyCategory = todo.category;
    // const categorys = dbCategories.filter(cat => cat.title === keyCategory);
    // console.log(`Todo - Category: ${keyCategory} = `, categorys);
  });

  // console.log('Categories:', dbCategories);
  // console.log('Todos:', dbTodos);
  return dbCategories;
};
export default getCategories;
