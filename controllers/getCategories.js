import fs from 'fs';
import path from 'path';
const getCategories = async () => {
  let dbCategories = await fs.readFileSync(path.join(process.cwd(), 'db', 'categories.json'), 'utf8');
  let dbTodos = await fs.readFileSync(path.join(process.cwd(), 'db', 'todos.json'), 'utf8');

  dbCategories = JSON.parse(dbCategories);
  dbTodos = JSON.parse(dbTodos);

  const categories = [];

  dbTodos.forEach(todo, index => {
    console.log('Category:', todo.);
  });

  console.log('Categories:', dbCategories);
  console.log('Todos:', dbTodos);
  return dbCategories;
};
export default getCategories;
