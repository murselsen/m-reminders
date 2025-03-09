import fs from 'fs';
import path from 'path';

const getTodos = async () => {
  let dbTodos = fs.readFileSync(
    path.join(process.cwd(), 'src', 'server', 'db', 'todos.json'),
    'utf8'
  );
  dbTodos = JSON.parse(dbTodos);
  return dbTodos;
};
export default getTodos;
