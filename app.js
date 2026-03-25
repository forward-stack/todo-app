const STORAGE_KEY = "starter-todo-app.todos";

const state = {
  filter: "all",
  todos: loadTodos(),
};

const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");
const taskCount = document.querySelector("#task-count");
const emptyState = document.querySelector("#empty-state");
const clearCompletedButton = document.querySelector("#clear-completed");
const filterButtons = document.querySelectorAll(".filter-button");
const todoItemTemplate = document.querySelector("#todo-item-template");

render();

todoForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const text = todoInput.value.trim();
  if (!text) {
    todoInput.focus();
    return;
  }

  state.todos.unshift({
    id: createTodoId(),
    text,
    completed: false,
    createdAt: Date.now(),
  });

  todoInput.value = "";
  persistTodos();
  render();
  todoInput.focus();
});

clearCompletedButton.addEventListener("click", () => {
  state.todos = state.todos.filter((todo) => !todo.completed);
  persistTodos();
  render();
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    state.filter = button.dataset.filter;
    render();
  });
});

function render() {
  const visibleTodos = getVisibleTodos();
  todoList.innerHTML = "";

  visibleTodos.forEach((todo) => {
    const listItem = todoItemTemplate.content.firstElementChild.cloneNode(true);
    const toggle = listItem.querySelector(".todo-toggle");
    const text = listItem.querySelector(".todo-text");
    const deleteButton = listItem.querySelector(".delete-button");

    toggle.checked = todo.completed;
    text.textContent = todo.text;

    if (todo.completed) {
      listItem.classList.add("is-complete");
    }

    toggle.addEventListener("change", () => {
      toggleTodo(todo.id);
    });

    deleteButton.addEventListener("click", () => {
      deleteTodo(todo.id);
    });

    todoList.appendChild(listItem);
  });

  updateTaskCount();
  updateFilterButtons();
  updateEmptyState(visibleTodos.length);
  updateClearCompletedState();
}

function getVisibleTodos() {
  if (state.filter === "active") {
    return state.todos.filter((todo) => !todo.completed);
  }

  if (state.filter === "completed") {
    return state.todos.filter((todo) => todo.completed);
  }

  return state.todos;
}

function updateTaskCount() {
  const remainingCount = state.todos.filter((todo) => !todo.completed).length;
  const label = remainingCount === 1 ? "task" : "tasks";
  taskCount.textContent = `${remainingCount} ${label} left`;
}

function updateFilterButtons() {
  filterButtons.forEach((button) => {
    const isActive = button.dataset.filter === state.filter;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
}

function updateEmptyState(visibleCount) {
  const hasTodos = state.todos.length > 0;

  if (!hasTodos) {
    emptyState.textContent = "No todos yet. Add one above to get started.";
    emptyState.classList.remove("is-hidden");
    return;
  }

  if (visibleCount === 0) {
    emptyState.textContent = `No ${state.filter} todos right now.`;
    emptyState.classList.remove("is-hidden");
    return;
  }

  emptyState.classList.add("is-hidden");
}

function updateClearCompletedState() {
  const hasCompletedTodos = state.todos.some((todo) => todo.completed);
  clearCompletedButton.disabled = !hasCompletedTodos;
}

function toggleTodo(todoId) {
  state.todos = state.todos.map((todo) =>
    todo.id === todoId ? { ...todo, completed: !todo.completed } : todo,
  );

  persistTodos();
  render();
}

function deleteTodo(todoId) {
  state.todos = state.todos.filter((todo) => todo.id !== todoId);
  persistTodos();
  render();
}

function persistTodos() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.todos));
}

function loadTodos() {
  try {
    const storedTodos = localStorage.getItem(STORAGE_KEY);
    return storedTodos ? JSON.parse(storedTodos) : getStarterTodos();
  } catch {
    return getStarterTodos();
  }
}

function getStarterTodos() {
  return [
    {
      id: "starter-readme",
      text: "Read the README and make your first tiny change",
      completed: false,
      createdAt: Date.now(),
    },
    {
      id: "starter-style",
      text: "Change a color, button label, or empty state message",
      completed: false,
      createdAt: Date.now() - 1,
    },
  ];
}

function createTodoId() {
  if (window.crypto?.randomUUID) {
    return window.crypto.randomUUID();
  }

  return `todo-${Date.now()}-${Math.floor(Math.random() * 100000)}`;
}
