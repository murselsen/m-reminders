import fs from 'fs';
import path from 'path';
const getTags = async () => {
  let dbTodos = await fs.readFileSync(path.join(process.cwd(), 'db', 'todos.json'), 'utf8');
  console.log('Todo List: ', dbTodos);
};

export default getTags;
