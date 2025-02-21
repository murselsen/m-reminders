const categoryAddBtn = document.querySelector('#sidebarCategoryAddBtn');
categoryAddBtn.addEventListener(
  'click',
  event => {
    const modalID = this;
    console.log('Modal ID:', modalID);
    const modal = document.getElementById(modalID);
  },
  {
    passive: true,
  },
);
