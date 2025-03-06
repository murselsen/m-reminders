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
                            ${reminder.tags.map(
                              tag => '<span class="tagItem">' + tag + '</span>'
                            )}
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
