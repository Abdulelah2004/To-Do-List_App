# ✅ Advanced Todo List App

A fully featured and responsive Todo List App built with vanilla JavaScript, HTML, and CSS.

This app allows users to:
- Add, remove, and check off tasks
- Filter tasks (All / Active / Completed)
- Search through tasks
- Clear all completed tasks
- Save data in `localStorage` so tasks persist on reload
- Toggle between **Light** and **Dark** mode

---
## 📌 screenshoots
<img width="250" height="509" alt="image" src="https://github.com/user-attachments/assets/e8297336-e615-417d-a624-f667e7691d47" />
<br>
<br>
<img width="589" height="395" alt="image" src="https://github.com/user-attachments/assets/14b92a0c-eeee-46da-a0bb-65cf3f98c4a4" />


---

## 🚀 Features

- ✅ **Add tasks** with a button or by pressing Enter
- 🔍 **Search** tasks instantly as you type
- 📂 **Filter** by All / Active / Completed
- 🧹 **Clear** all completed tasks with a click
- 🌗 **Theme toggle** (Dark & Light mode with localStorage support)
- 💾 **LocalStorage** support (saves all tasks and theme)

---

## 🛠️ Technologies Used

- HTML5
- CSS3 (for themes and responsiveness)
- JavaScript (Vanilla ES6)

---

## 📁 Project Structure

```
index.html
style.css
script.js
```

---

## ✨ How It Works

1. Type a task and press **Add** or **Enter**
2. Click on a task to mark it as **completed**
3. Click the ❌ icon to delete a task
4. Use the **filters** to switch views (All / Active / Completed)
5. Search using the **search bar**
6. Click the **theme switch** to toggle dark mode
7. Your tasks and theme are saved automatically in `localStorage`

---

## 🎨 Dark Mode Preview

```html
<!-- Toggled with the checkbox -->
<input type="checkbox" id="theme-switch">
```

```css
/* Applied based on data-theme="dark" or "light" on <body> */
body[data-theme="dark"] {
  background: #121212;
  color: #eee;
}
```

---


---

## 🧠 LocalStorage Keys Used

- `tasks` → Stores the list of task items
- `theme` → Stores the current theme (`light` or `dark`)

---

## 📌 Tip

This app is made using **vanilla JS only**, no frameworks! It's a great example of how to build a dynamic and interactive UI using just the DOM and modern JS.

---

## 📄 License

This project is free to use for learning and personal use. No attribution required. Enjoy building!

---

> ✍️ Created with ❤️ by Abdulelah Ahmed and JavaScript.
