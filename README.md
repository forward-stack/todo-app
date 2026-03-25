# Starter Todo App

This repo is a tiny todo app built with plain HTML, CSS, and JavaScript. It is meant to be easy to fork, easy to read, and easy to improve with a coding agent.

## Why this repo is beginner-friendly

- No build step
- No dependencies
- No framework knowledge required
- Small enough to understand in one sitting
- Useful enough to practice real product changes

## Run it

You can open [index.html](./index.html) directly in a browser, or serve it locally if you prefer:

```bash
python3 -m http.server 8000
```

Then visit <http://localhost:8000>.

## Project structure

```text
.
├── app.js
├── index.html
├── README.md
└── styles.css
```

- `index.html`: page structure
- `styles.css`: layout, colors, and responsive styles
- `app.js`: todo logic and local storage

## Features

- Add a todo
- Mark a todo complete
- Delete a todo
- Filter by all, active, or completed
- Clear completed todos
- Persist todos in local storage

## Good first changes

- Add due dates
- Add edit-in-place support
- Add drag-and-drop sorting
- Add tests
- Split the JavaScript into smaller modules
- Add keyboard shortcuts
- Improve accessibility copy and focus states

## Working with a coding agent

If you are new to coding agents, try prompts like:

- "Explain how the todo rendering works in `app.js`."
- "Add a priority tag to each todo."
- "Make completed todos sort to the bottom."
- "Help me write a small test plan for this app."

## Suggested git workflow

```bash
git clone <your-fork-url>
cd todo-app
git checkout -b codex/my-first-change
```

Make a small change, test it in the browser, then commit:

```bash
git add .
git commit -m "Add my first improvement"
git push -u origin codex/my-first-change
```

## Notes

The app stores data in the browser only. There is no backend, login, or database.
