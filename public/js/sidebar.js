/* 
<li class="categoryItem">
                <div class="categoryItem-icon" style="background-color:<%= category['color'] %>">
                    <span>
                    <%= category['icon'] %>
                  </span>
                </div>
                <p class="categoryItem-text">
                  <%= category.title %>
                </p>
                <button class="categoryItem-button" id="categoryItem<%= category.id %>">
                  <i class=" fa-solid fa-map-pin"></i>
                </button>
                <span class="categoryItem-count">0</span>

              </li>
               */

import { getCategories } from './controllers/index.js';
const categories = await getCategories();
const categoryList = document.querySelector('.categoryList');
console.log('Categories', categories);
