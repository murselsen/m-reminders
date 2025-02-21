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
