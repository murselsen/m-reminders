import fs from 'fs';
import path from 'path';

const getTodosByCategory = async category => {
  let dbTodos = await fs.readFileSync(path.join(process.cwd(), 'db', 'todos.json'), 'utf8');
  dbTodos = JSON.parse(dbTodos);
  dbTodos = dbTodos.filter(todo => todo.category.toLowerCase() === category);
  
  
  console.log('Todos By Category:', dbTodos);
  return dbTodos;
};
export default getTodosByCategory;
