import axios from 'axios';

const renderTags = async () => {
  console.time('renderTags');
  const sidebarTagList = document.querySelector('#sidebarTagList');
  sidebarTagList.innerHTML = '';

  axios('/api/tags').then(res => {
    let tags = res.data;
    for (let tag of tags) {
      const tagItemElement = document.createElement('li');
      tagItemElement.classList.add('tagItem');

      const tagItemLinkElement = document.createElement('a');
      tagItemLinkElement.classList.add('tagLink');
      tagItemLinkElement.dataset.source = tag;
      tagItemLinkElement.textContent = tag;

      tagItemElement.appendChild(tagItemLinkElement);
      sidebarTagList.appendChild(tagItemElement);
    }
  });
  console.timeEnd('renderTags');
};
// Tags
renderTags();
document.querySelector('#sidebarTagList').addEventListener('click', e => {
  if (e.target.nodeName === 'A') {
    console.log('Tag Clicked: ', e.target);
    let source = e.target.dataset.source;
    alert('Seçilen Etiket: ' + source.toString());
  }
});
