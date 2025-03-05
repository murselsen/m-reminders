import dbCategories from '../db/categories.json';
import dbTodos from '../db/todos.json';

const getCategories = async () => {
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
