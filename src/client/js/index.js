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

      const 


    })
    .catch(err => {
      console.error('Error: ', err);
    });

  console.timeEnd('renderReminders');
};
renderReminders();
