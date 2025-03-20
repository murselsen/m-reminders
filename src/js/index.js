import axios from 'axios';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const mode = process.env.NODE_ENV;
console.log(mode);
axios.defaults.baseURL =
  mode === 'development'
    ? 'https://7hd61ctj-3000.euw.devtunnels.ms/'
    : 'https://api.murselsen.com/';

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

// Reminders
const renderReminders = () => {
  console.time('renderReminders');
  const remindersList = document.querySelector('#remindersList');
  remindersList.innerHTML = '';
  axios
    .get('todos')
    .then(res => {
      let reminders = res.data;
      iziToast.success({
        title: 'GET : Başarılı',
        message: `<b>Yapılacaklar</b> listesine ait <b>${reminders.totalTodoCount}</b> veri geldi !`,
        position: 'topRight',
      });
      reminders.todos.forEach(reminder => renderTodo(reminder));
      document.querySelector('#totalTodoCount').textContent =
        reminders.totalTodoCount;
      document.querySelector('#completedTodoCount').textContent =
        reminders.completedTodoCount;
    })
    .catch(err => {
      console.error('Api Todos - Error: ', err);
      const remItem = document.createElement('li');
      remItem.classList.add('reminder-item');

      const remContent = document.createElement('div');
      remContent.classList.add('remContent');

      const remLabel = document.createElement('label');
      remLabel.classList.add('remCheckbox');

      const remCheckboxIcon = document.createElement('i');
      remCheckboxIcon.classList.add('fa-regular', 'fa-times-circle', 'fa-2x');
      remCheckboxIcon.style.color = 'red';

      remLabel.appendChild(remCheckboxIcon);
      remContent.appendChild(remLabel);

      const remInfo = document.createElement('div');
      remInfo.classList.add('remInfo');

      const infoH4 = document.createElement('h4');
      infoH4.classList.add('title');
      infoH4.textContent = err.message;
      infoH4.style.color = 'red';

      remInfo.appendChild(infoH4);

      remContent.appendChild(remInfo);
      remItem.appendChild(remContent);

      document.querySelector('#remindersList').style.marginBottom = '20px';
      document.querySelector('#remindersList').appendChild(remItem);
      iziToast.error({
        title: 'GET : Hata',
        message: err.message,
        description:
          'Yapılacaklar listesi için yapılan istekten veriler getirilemedi !',
        position: 'topRight',
      });
    });

  console.timeEnd('renderReminders');
};
renderReminders();

// Categories
const renderCategories = () => {
  console.time('renderCategories');
  const sidebarCategoryList = document.querySelector('#sidebarCategoryList');
  sidebarCategoryList.innerHTML = '';

  axios
    .get('categories')
    .then(res => {
      let categories = res.data.dbCategories;
      iziToast.success({
        title: 'GET : Başarılı',
        message: `<b>Kategoriler</b> listesine ait <b>${res.data.totalCategoriesCount}</b> veri geldi !`,
        position: 'topRight',
      });
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
      iziToast.error({
        title: 'GET : Hata',
        message: err.message,
        description: 'Kategoriler için yapılan istekten veriler getirilemedi !',
        position: 'topRight',
      });
    });

  console.timeEnd('renderCategories');
};
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
    .get('tags')
    .then(res => {
      iziToast.success({
        title: 'GET : Başarılı',
        message: `<b>Etiket</b> listesine ait <b>${res.data.totalTagsCount}</b> veri geldi !`,
        position: 'topRight',
      });
      let tags = res.data.dbTags;
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
      iziToast.error({
        title: `${err.name} : ${err.config.url}`,
        message: err.message,
        description: 'Etiketler için yapılan istekten veriler getirilemedi !',
        position: 'topRight',
      });
    });
  console.timeEnd('renderTags');
};

// Tags
renderAllTags();

// Event Listeners
document.querySelector('#sidebarCategoryList').addEventListener(
  'click',
  e => {
    if (e.target.nodeName === 'LI') {
      document.querySelector('#byCategoryHeader').textContent =
        e.target.querySelector('.categoryItem-text').textContent;
      let categoryId = e.target.dataset.id;
      axios
        .get(`todos/category/${categoryId.toString()}`)
        .then(res => {
          const todos = res.data.dbTodos;
          iziToast.success({
            title: 'GET : Başarılı',
            message: `<b>${
              e.target.querySelector('.categoryItem-text').textContent
            }</b> kategorisine ait <b>${todos.length}</b> veri geldi !`,
            position: 'topRight',
          });
          if (todos.length > 0) {
            document.querySelector('#remindersList').innerHTML = '';

            todos.forEach(todo => {
              renderTodo(todo);
            });
          } else {
            document.querySelector('#remindersList').innerHTML = '';

            const remItem = document.createElement('li');
            remItem.classList.add('reminder-item');

            const remContent = document.createElement('div');
            remContent.classList.add('remContent');

            const remLabel = document.createElement('label');
            remLabel.classList.add('remCheckbox');

            const remCheckboxIcon = document.createElement('i');
            remCheckboxIcon.classList.add(
              'fa-solid',
              'fa-info-circle',
              'fa-2x'
            );
            remCheckboxIcon.style.color = 'yellow';

            remLabel.appendChild(remCheckboxIcon);
            remContent.appendChild(remLabel);

            const remInfo = document.createElement('div');
            remInfo.classList.add('remInfo');

            const infoH4 = document.createElement('h4');
            infoH4.classList.add('title');
            infoH4.textContent = 'Kategori ait hiçbir veri bulunamadı !';
            infoH4.style.color = 'yellow';

            remInfo.appendChild(infoH4);

            remContent.appendChild(remInfo);
            remItem.appendChild(remContent);

            document.querySelector('#remindersList').style.padding = '30px';
            document.querySelector('#remindersList').style.paddingLeft = '0px';
            document.querySelector('#remindersList').style.marginBottom =
              '20px';
            document.querySelector('#remindersList').appendChild(remItem);
          }
          document.querySelector('#totalTodoCount').textContent =
            res.data.dbTotalTodoCount || 0;
          document.querySelector('#completedTodoCount').textContent =
            res.data.dbCompletedTodoCount || 0;
        })
        .catch(err => {
          console.error('Category Todos: ', err);
          iziToast.error({
            title: `${err.name} : ${err.code}`,
            message: err.message,
            description: 'Kategoriye ait veriler getirilemedi !',
            position: 'topRight',
          });
        });
    }
  },
  {
    passive: true,
  }
);

document.querySelector('#sidebarTagList').addEventListener('click', e => {
  let source = e.target.dataset.source;
  console.log('Seçilen Etiket: ' + source);

  axios
    .get(`todos/tag/${source}`)
    .then(res => {
      console.log('Tag Todos: ', res);
      document.querySelector('#byCategoryHeader').textContent = '#' + source;
    })
    .catch(err => {
      console.log('Tag Todos Error: ', err);
      iziToast.error({
        title: `${err.name} : ${err.code}`,
        message: err.message,
        description: 'Etiketlere ait veriler getirilemedi !',
        position: 'topRight',
      });
    });
});
