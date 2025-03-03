import fs from 'fs';
import path from 'path';

// Dosya yolları
const todosPath = path.join(process.cwd(), 'db', 'todos.json');
const categoriesPath = path.join(process.cwd(), 'db', 'categories.json');

// Dosyaları oku
const todos = JSON.parse(fs.readFileSync(todosPath, 'utf8'));
const categories = JSON.parse(fs.readFileSync(categoriesPath, 'utf8'));

// Kategori renkleri
const categoryColors = {
  "Personal": "rgba(188, 208, 247, 1)",
  "Work": "rgba(247, 247, 188, 1)",
  "Health": "rgba(199, 243, 207, 1)",
  "Leisure": "rgba(250, 223, 248, 1)",
  "Community": "rgba(255, 223, 186, 1)"
};

// Kategorileri güncelle
todos.forEach(todo => {
  const category = categories.find(cat => cat.title === todo.category);
  if (!category) {
    categories.push({
      id: categories.length + 1,
      icon: "📌", // Varsayılan ikon
      title: todo.category,
      color: categoryColors[todo.category] || "rgba(200, 200, 200, 1)", // Varsayılan renk
      pin: false
    });
  }
});

// Güncellenmiş kategorileri dosyaya yaz
fs.writeFileSync(categoriesPath, JSON.stringify(categories, null, 2), 'utf8');

console.log('Categories updated successfully.');