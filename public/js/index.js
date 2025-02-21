const categoryAddBtn = document.querySelector('#sidebarCategoryAddBtn');
categoryAddBtn.addEventListener(
  'click',
  event => {
    console.log(event.target.dataset.modal);
  },
  {
    passive: true,
  },
);
