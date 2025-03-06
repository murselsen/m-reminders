import axios from 'axios';

const renderReminders = () => {
  console.time('renderReminders');
  const remindersList = document.querySelector('#remindersList');
  // remindersList.innerHTML = '';

  axios
    .get('/api/todos')
    .then(res => {
      let reminders = res.data;
      console.log('Reminders: ', reminders);

      /*
        const galleryMarkup = images
  .map(
    (image) => `
    <li class="gallery-item">
      <a class="gallery-link" href="${image.original}">
        <img
          class="gallery-image"
          src="${image.preview}"
          data-source="${image.original}"
          alt="${image.description}"
        />
      </a>
    </li>
  `
  )
  .join("");

gallery.innerHTML = galleryMarkup; */

      const remindersMarkup = reminders
        .map(
          reminder => `
                    <li class="reminder-item" id="remTodo${reminder.id}">
                      <div class="remContent">
                        <label for="rem${reminder.id}" class="remCheckbox">
                          <i class="fa-regular ${
                            reminder.completed ? 'fa-circle-check' : 'fa-circle'
                          } fa-2x" id="rem${reminder.id}circle"></i>
                          <input type="checkbox" name="complete" hidden id="rem${
                            reminder.id
                          }">
                        </label>
                        <div class="remInfo">
                          <h4 class="title">
                            ${reminder.title}
                          </h4>
                          <p class="description">
                            ${reminder.description}
                          </p>
                          <div class="infoBox">
                            <span class="infoItem">
                              ${reminder.date}
                            </span>
                            ${
                              reminder.time
                                ? `<span class="infoItem">${reminder.time}</span>`
                                : ''
                            }

                          </div>
                          <div class="tagBox">
                            ${reminder.tags
                              .flatMap(
                                tag =>
                                  '<span class="tagItem">' + tag + '</span>'
                              )
                              .join('')}
                          </div>
                        </div>
                        <div class="remActions">
                          <button class="btn text-danger todo-del fa-solid fa-trash" data-source="${
                            reminder.id
                          }"></button>
                          <button class="btn text-warning todo-edit fa-solid fa-pencil" data-source="${
                            reminder.id
                          }"></button>
                        </div>
                      </div>
                      <div class="remSplit">
                        <hr class="remSplitHr">
                      </div>
                    </li>
        `
        )
        .join('');

      remindersList.innerHTML = remindersMarkup;
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
  axios('/api/tags')
    .then(res => {
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
    if (e.target.nodeName === 'A') {
      let source = e.target.dataset.source;
      alert('Seçilen Etiket: ' + source.toString());
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
