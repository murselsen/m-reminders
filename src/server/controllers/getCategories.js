import fs from 'fs';
import path from 'path';

const getCategories = async () => {
  let dbTodos = await fs.readFileSync(
    path.join(process.cwd(), 'src', 'server', 'db', 'todos.json'),
    'utf8'
  );

  let dbCategories = await fs.readFileSync(
    path.join(process.cwd(), 'src', 'server', 'db', 'categories.json'),
    'utf8'
  );

  dbTodos = JSON.parse(dbTodos);
  dbCategories = JSON.parse(dbCategories);
  const categories = [];

  dbCategories.forEach((category, index) => {
    // console.log(
    //   'Category:',
    //   category.title,
    //   dbTodos.filter(todo => todo.category === category.title).length
    // );
    categories.push({
      ...category,
      count: dbTodos.filter(todo => todo.category === category.title).length,
    });
  });

  // console.log('Categories:', dbCategories);
  // console.log('Todos:', dbTodos);
  return categories;
};
export default getCategories;
