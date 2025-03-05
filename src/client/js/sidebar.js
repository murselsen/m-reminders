import { getCategories}

const renderCategories = async () => {
  console.time('renderCategories');
  const sidebarCategoryList = document.querySelector('#sidebarCategoryList');
  // sidebarCategoryList.innerHTML = '';


  console.log('sidebarCategoryList: ', sidebarCategoryList);

  console.log('Categories: ', categories);
  console.timeEnd('renderCategories');
};




renderCategories();
