import axios from 'axios';
axios.defaults.baseURL = 'http://api.murselsen.com';

const renderTodo = reminder => {
  const reminderItemElement = document.createElement('li');
  reminderItemElement.classList.add('reminder-item');
  reminderItemElement.id = `remTodo${reminder.id}`;

  const remContentElement = document.createElement('div');
  remContentElement.classList.add('remContent');

  const remCheckboxLabel = document.createElement('label');
  remCheckboxLabel.setAttribute('for', `rem${reminder.id}`);
  remCheckboxLabel.classList.add('remCheckbox');

  const remCheckboxIcon = document.createElement('i');
  remCheckboxIcon.classList.add(
    'fa-regular',
    reminder.completed ? 'fa-circle-check' : 'fa-circle',
    'fa-2x'
  );
  remCheckboxIcon.id = `rem${reminder.id}circle`;

  const remCheckboxInput = document.createElement('input');
  remCheckboxInput.type = 'checkbox';
  remCheckboxInput.name = 'complete';
  remCheckboxInput.hidden = true;
  remCheckboxInput.id = `rem${reminder.id}`;

  remCheckboxLabel.appendChild(remCheckboxIcon);
  remCheckboxLabel.appendChild(remCheckboxInput);

  const remInfoElement = document.createElement('div');
  remInfoElement.classList.add('remInfo');

  const titleElement = document.createElement('h4');
  titleElement.classList.add('title');
  titleElement.textContent = reminder.title;

  const descriptionElement = document.createElement('p');
  descriptionElement.classList.add('description');
  descriptionElement.textContent = reminder.description;

  const infoBoxElement = document.createElement('div');
  infoBoxElement.classList.add('infoBox');

  const infoItemElement = document.createElement('span');
  infoItemElement.classList.add('infoItem');
  infoItemElement.textContent = reminder.date;

  if (reminder.time) {
    const timeElement = document.createElement('span');
    timeElement.classList.add('infoItem');
    timeElement.textContent = reminder.time;
    infoBoxElement.appendChild(timeElement);
  }

  infoBoxElement.appendChild(infoItemElement);

  const tagBoxElement = document.createElement('div');
  tagBoxElement.classList.add('tagBox');

  reminder.tags.forEach(tag => {
    const tagItemElement = document.createElement('span');
    tagItemElement.classList.add('tagItem');
    tagItemElement.textContent = tag;
    tagBoxElement.appendChild(tagItemElement);
  });

  remInfoElement.appendChild(titleElement);
  remInfoElement.appendChild(descriptionElement);
  remInfoElement.appendChild(infoBoxElement);
  remInfoElement.appendChild(tagBoxElement);

  const remActionsElement = document.createElement('div');
  remActionsElement.classList.add('remActions');

  const deleteButton = document.createElement('button');
  deleteButton.classList.add(
    'btn',
    'text-danger',
    'todo-del',
    'fa-solid',
    'fa-trash'
  );
  deleteButton.dataset.source = reminder.id;

  const editButton = document.createElement('button');
  editButton.classList.add(
    'btn',
    'text-warning',
    'todo-edit',
    'fa-solid',
    'fa-pencil'
  );
  editButton.dataset.source = reminder.id;

  remActionsElement.appendChild(deleteButton);
  remActionsElement.appendChild(editButton);

  remContentElement.appendChild(remCheckboxLabel);
  remContentElement.appendChild(remInfoElement);
  remContentElement.appendChild(remActionsElement);

  const remSplitElement = document.createElement('div');
  remSplitElement.classList.add('remSplit');

  const remSplitHrElement = document.createElement('hr');
  remSplitHrElement.classList.add('remSplitHr');

  remSplitElement.appendChild(remSplitHrElement);

  reminderItemElement.appendChild(remContentElement);
  reminderItemElement.appendChild(remSplitElement);

  document.querySelector('#remindersList').appendChild(reminderItemElement);
};
const renderReminders = () => {
  console.time('renderReminders');
  const remindersList = document.querySelector('#remindersList');
  remindersList.innerHTML = '';
  axios
    .get('api/todos')
    .then(res => {
      console.log('Api Todos: ', res);
      let reminders = res.data;
      reminders.todos.forEach(reminder => renderTodo(reminder));
      document.querySelector('#totalTodoCount').textContent =
        reminders.totalTodoCount;
      document.querySelector('#completedTodoCount').textContent =
        reminders.completedTodoCount;
      ('');
    })
    .catch(err => {
      console.error('Error: ', err);
    });

  console.timeEnd('renderReminders');
};
renderReminders();

const renderCategories = () => {
  console.time('renderCategories');
  const sidebarCategoryList = document.querySelector('#sidebarCategoryList');
  sidebarCategoryList.innerHTML = '';

  axios
    .get('categories/')
    .then(res => {
      let categories = res.data;
      categories.forEach(category => {
        const categoryItemElement = document.createElement('li');
        categoryItemElement.classList.add('categoryItem');
        categoryItemElement.dataset.id = category.id;

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
      console.error('Api Categroies Error: ', err);
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

// Categories
renderCategories();

// Tag Create

const renderTag = tag => {
  const tagItemElement = document.createElement('li');
  tagItemElement.classList.add('tagItem');

  const tagItemLinkElement = document.createElement('a');
  tagItemLinkElement.classList.add('tagLink');
  tagItemLinkElement.href = '#';
  tagItemLinkElement.dataset.source = tag;
  tagItemLinkElement.textContent = tag;

  tagItemElement.appendChild(tagItemLinkElement);
  document.querySelector('#sidebarTagList').appendChild(tagItemElement);
};
const renderAllTags = () => {
  console.time('renderTags');

  document.querySelector('#sidebarTagList').innerHTML = '';
  axios
    .get('/tags')
    .then(res => {
      console.log('Api Tags: ', res);
      let tags = res.data;
      for (let tag of tags) {
        renderTag(tag);
      }
    })
    .catch(err => {
      const tagItemElement = document.createElement('li');
      tagItemElement.classList.add('tagItem');

      const tagItemLinkElement = document.createElement('a');
      tagItemLinkElement.classList.add('tagLink');
      tagItemLinkElement.style.color = 'red';

      tagItemLinkElement.textContent = err.message;

      tagItemElement.appendChild(tagItemLinkElement);
      document.querySelector('#sidebarTagList').appendChild(tagItemElement);
    });
  console.timeEnd('renderTags');
};

// Tags
renderAllTags();

// Event Listeners
document.querySelector('#sidebarCategoryList').addEventListener(
  'click',
  e => {
    console.log(e.target);
    console.log(e.target.nodeName);
    if (e.target.nodeName === 'LI') {
      let categoryId = e.target.dataset.id;
      alert('Seçilen Kategori Kimlik No: ' + categoryId.toString());
      axios
        .get(`api/todos/category/`, { params: { categoryId } })
        .then(res => {});
    }
  },
  {
    passive: true,
  }
);

document.querySelector('#sidebarTagList').addEventListener('click', e => {
  console.log(e.target);
  let source = e.target.dataset.source;
  alert('Seçilen Etiket: ' + source);
});

axios
  .get('/')
  .then(res => {
    console.log('Api :', res);
  })
  .catch(err => {
    console.error('Api Error: ', err);
  });
