const categoryAddBtn = document.querySelector('#sidebarCategoryAddBtn');
categoryAddBtn.addEventListener(
  'click',
  event => {
    document.querySelector(`#${event.target.getAttribute('modal')}`).style.display = 'block';
  },
  {
    passive: true,
  },
);

const remidersAreaForm = document.querySelector('#remindersAreaForm');
const remidersFormTitle = document.querySelector('#title');
remidersFormTitle.addEventListener('input', e => {});
