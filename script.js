document.addEventListener('DOMContentLoaded', function() {
  const inputBox = document.getElementById('input-box');
  const listContainer = document.getElementById('list-container');
  const addBtn = document.getElementById('add-btn');
  const searchInput = document.getElementById('search-input');
  const filterButtons = document.querySelectorAll('.filter-btn');
  const clearCompletedBtn = document.getElementById('clear-completed');
  const totalTasksElement = document.getElementById('total-tasks');
  const emptyState = document.querySelector('.empty-state');
  const themeSwitch = document.getElementById('theme-switch');

  let currentFilter = 'all';

  function init() {
    loadThemePreference();
    showTasks();
    updateTaskCount();
    checkEmptyState();
    inputBox.focus();
  }

  function addTask() {
    const taskText = inputBox.value.trim();
    if (taskText === '') {
      alert('Please enter a task!');
      return;
    }

    const li = document.createElement('li');
    li.innerHTML = `
      ${taskText}
      <span><i class="fas fa-times"></i></span>
    `;

    listContainer.appendChild(li);
    inputBox.value = '';
    inputBox.focus();

    saveData();
    updateTaskCount();
    checkEmptyState();
    filterTasks(currentFilter);
  }

  function handleTaskActions(e) {
    const target = e.target;

    if (target.tagName === 'LI') {
      target.classList.toggle('checked');
      saveData();
      updateTaskCount();
      filterTasks(currentFilter);
    } else if (target.tagName === 'SPAN' || target.tagName === 'I') {
      const taskItem = target.tagName === 'SPAN' ? target.parentElement : target.parentElement.parentElement;
      taskItem.remove();
      saveData();
      updateTaskCount();
      checkEmptyState();
      filterTasks(currentFilter);
    }
  }

  function filterTasks(filter) {
    const tasks = listContainer.querySelectorAll('li');
    let visibleCount = 0;

    tasks.forEach(task => {
      const isCompleted = task.classList.contains('checked');

      switch(filter) {
        case 'all':
          task.style.display = 'flex';
          visibleCount++;
          break;
        case 'active':
          task.style.display = isCompleted ? 'none' : 'flex';
          if (!isCompleted) visibleCount++;
          break;
        case 'completed':
          task.style.display = isCompleted ? 'flex' : 'none';
          if (isCompleted) visibleCount++;
          break;
      }
    });

    filterButtons.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.filter === filter);
    });

    checkEmptyState();
  }

  function clearCompletedTasks() {
    const completedTasks = listContainer.querySelectorAll('li.checked');

    if (completedTasks.length === 0) {
      alert('No completed tasks to clear!');
      return;
    }

    if (confirm('Are you sure you want to clear all completed tasks?')) {
      completedTasks.forEach(task => task.remove());
      saveData();
      updateTaskCount();
      checkEmptyState();
    }
  }

  function searchTasks() {
    const searchTerm = searchInput.value.toLowerCase();
    const tasks = listContainer.querySelectorAll('li');
    let foundCount = 0;

    tasks.forEach(task => {
      const text = task.textContent.toLowerCase();
      const isVisible = text.includes(searchTerm);

      task.style.display = isVisible ? 'flex' : 'none';
      if (isVisible) foundCount++;
    });

    if (searchTerm && foundCount === 0) {
      alert('No tasks found matching your search!');
    }
  }

  function updateTaskCount() {
    const totalTasks = listContainer.querySelectorAll('li').length;
    const completedTasks = listContainer.querySelectorAll('li.checked').length;
    const remainingTasks = totalTasks - completedTasks;

    totalTasksElement.textContent = `${remainingTasks} ${remainingTasks === 1 ? 'task' : 'tasks'} remaining (${completedTasks} completed)`;
  }

  function checkEmptyState() {
    const visibleTasks = listContainer.querySelectorAll('li[style="display: flex;"]').length;
    const totalTasks = listContainer.querySelectorAll('li').length;

    if (totalTasks === 0) {
      emptyState.style.display = 'block';
      listContainer.style.display = 'none';
    } else {
      emptyState.style.display = 'none';
      listContainer.style.display = 'block';
    }
  }

  function saveData() {
    localStorage.setItem('tasks', listContainer.innerHTML);
  }

  function showTasks() {
    const data = localStorage.getItem('tasks');
    if (data) {
      listContainer.innerHTML = data;
      document.querySelectorAll('li span').forEach(span => {
        span.addEventListener('click', handleTaskActions);
      });
    }
  }

  function toggleTheme() {
    const isDark = document.body.getAttribute('data-theme') === 'dark';
    document.body.setAttribute('data-theme', isDark ? 'light' : 'dark');
    localStorage.setItem('theme', isDark ? 'light' : 'dark');
  }

  function loadThemePreference() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.body.setAttribute('data-theme', savedTheme);
    themeSwitch.checked = savedTheme === 'dark';
  }

  addBtn.addEventListener('click', addTask);
  inputBox.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTask();
  });

  listContainer.addEventListener('click', handleTaskActions);

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      currentFilter = btn.dataset.filter;
      filterTasks(currentFilter);
    });
  });

  clearCompletedBtn.addEventListener('click', clearCompletedTasks);
  searchInput.addEventListener('input', searchTasks);
  themeSwitch.addEventListener('change', toggleTheme);

  init();
});
