import fs from 'fs';
import path from 'path';

const getTodosByCategory = async category => {
  let dbTodos = await fs.readFileSync(path.join(process.cwd(), 'db', 'todos.json'), 'utf8');
  dbTodos = JSON.parse(dbTodos);
  return dbTodos.filter(todo => todo.category.toLowerCase() === category);
};
export default getTodosByCategory;
