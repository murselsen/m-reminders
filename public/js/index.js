const categoryAddBtn = document.querySelector('#sidebarCategoryAddBtn');
categoryAddBtn.addEventListener(
  'click',
  event => {
    console.log(event.target.getAttribute('modal'));
  },
  {
    passive: true,
  },
);
