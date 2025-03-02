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
remidersFormTitle.addEventListener('input', e => {
  console.log(e);
  document.querySelector('#description').style.display = e.target.value.length > 0 ? 'block' : 'none';
  document.querySelector('#date').style.display = e.target.value.length > 0 ? 'block' : 'none';
  document.querySelector('#time').style.display = e.target.value.length > 0 ? 'block' : 'none';
});
