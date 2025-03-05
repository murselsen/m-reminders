import { getCategories } from '../../server/controllers/index.js';

const renderCategories = async () => {
  console.time('renderCategories');
  const sidebarCategoryList = document.querySelector('#sidebarCategoryList');
  sidebarCategoryList.innerHTML = '';

  const categories = "await fetch('/api/categories').json();";
  console.log('Categories: ', categories);

  fetch('/api/categories')
    .then(response => {
      console.log('Response: ', response.body);
      return response.json();
    })
    .then(categories => {
      console.log('Categories: ', categories);

      categories.forEach(category => {
        const categoryItemElement = document.createElement('li');
        categoryItemElement.classList.add('categoryItem');

        // Category Icon - Div
        const categoryIconDivElement = document.createElement('div');
        categoryIconDivElement.classList.add('categoryItem-icon');
        categoryIconDivElement.style.backgroundColor = category.color;
        // Category Icon - Span
        const categoryIconSpanElement = document.createElement('span');
        categoryIconSpanElement.textContent = category.icon;
        categoryIconDivElement.appendChild(categoryIconSpanElement);

        categoryItemElement.appendChild(categoryIconDivElement);

        // Category Text - P
        const categoryTextElement = document.createElement('p');
        categoryTextElement.classList.add('categoryItem-text');
        categoryTextElement.textContent = category.title;

        categoryItemElement.appendChild(categoryTextElement);

        // Category Pin Icon - Button
        const categoryPinElement = document.createElement('button');
        categoryPinElement.classList.add('categoryItem-button');
        categoryPinElement.id = `categoryItem${category.id}`;
        categoryPinElement.dataset.source = category.id;

        // Category Pin Icon - i
        const categoryPinIconElement = document.createElement('i');
        categoryPinIconElement.classList.add('fa-solid', 'fa-map-pin');

        categoryPinElement.appendChild(categoryPinIconElement);
        categoryItemElement.appendChild(categoryPinElement);

        // Category Count - Span
        const categoryCountElement = document.createElement('span');
        categoryCountElement.classList.add('categoryItem-count');
        categoryCountElement.textContent = category.count;

        categoryItemElement.appendChild(categoryCountElement);
        // Category List - Li added
        sidebarCategoryList.appendChild(categoryItemElement);
      });
    });

  console.timeEnd('renderCategories');
};

const renderTags = async () => {
  console.time('renderTags');

  console.timeEnd('renderTags');
};

renderCategories();
renderTags();
