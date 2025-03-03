import fs from 'fs';
import path from 'path';
const getTags = async () => {
  let dbTodos = await fs.readFileSync(path.join(process.cwd(), 'db', 'todos.json'), 'utf8');
  dbTodos = JSON.parse(dbTodos);
    dbTodos = dbTodos.map(todo => todo.tags).flat();
    const tags = [];
    dbTodos.forEach(tag => {
      if (!tags.includes(tag)) {
        tags.push(tag);
      }
    });
    console.log('Todo List: ', dbTodos);
    console.log(object);
};

export default getTags;
