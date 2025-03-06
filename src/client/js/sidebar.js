import axios from 'axios';
import { getCategories } from '../../server/controllers/index.js';

const renderCategories = async () => {
  console.time('renderCategories');
  const sidebarCategoryList = document.querySelector('#sidebarCategoryList');
  sidebarCategoryList.innerHTML = '';

  axios
    .get('/api/categories')
    .then(res => {
      // console.log('Res: ', res.data);
      let categories = res.data;
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
    })
    .catch(err => {
      console.error('Error: ', err);
      const categoryItemElement = document.createElement('li');
      categoryItemElement.classList.add('categoryItem');

      // Category Text - P
      const categoryTextElement = document.createElement('p');
      categoryTextElement.classList.add('categoryItem-text');
      categoryTextElement.style.color = 'red';
      categoryTextElement.textContent = err.message;

      categoryItemElement.appendChild(categoryTextElement);

      sidebarCategoryList.appendChild(categoryItemElement);
    });

  console.timeEnd('renderCategories');
};

const renderTags = async () => {
  console.time('renderTags');
  const sidebarTagList = document.querySelector('#sidebarTagList');
  sidebarTagList.innerHTML = '';

  axios('/api/tags').then(res => {
    let tags = res.data;
    for (let tag of tags) {
      const tagItemElement = document.createElement('li');
      tagItemElement.classList.add('tagItem');
      tagItemElement.dataset.source = tag;

      const tagItemLinkElement = document.createElement('a');
      tagItemLinkElement.classList.add('tagLink');
      tagItemLinkElement.textContent = tag;

      tagItemElement.appendChild(tagItemLinkElement);
      sidebarTagList.appendChild(tagItemElement);
    }
  });
  console.timeEnd('renderTags');
};

// Categories
renderCategories();

// Tags
renderTags();
document.querySelector('#sidebarTagList').addEventListener('click', e => {
  if (e.target.nodeName === 'A') {
    console.log('Tag Clicked: ', e.target);
  }
});
