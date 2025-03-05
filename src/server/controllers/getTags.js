import fs from 'fs';
import path from 'path';
const getTags = async () => {
  let dbTodos = await fs.readFileSync(
    path.join(process.cwd(), 'src', 'server', 'db', 'todos.json'),
    'utf8'
  );
  dbTodos = JSON.parse(dbTodos);
  let dbTags = dbTodos.map(todo => todo.tags).flat();
  const tags = [];
  dbTags.forEach(tag => {
    if (!tags.includes(tag)) {
      tags.push(tag);
    }
  });
  //   console.log('Todo List: ', dbTodos);
  //   console.log('Tags: ', tags);
  return tags;
};

export default getTags;
