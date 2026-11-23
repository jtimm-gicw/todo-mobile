# Code 401 — Class 42 Instructor Guide (45 minutes)

**Goal:** Improve the working Class 41 MVP with TWO screens, shared state, a theme toggle, and thoughtful phone styling. Keep the existing haptic + accelerometer features.

## Prep
- Open the new project in VS Code.
- On Windows PowerShell: `npm.cmd install`, then `npx.cmd expo start --tunnel`.
- Have Expo Go installed on the phone and scan the QR code.
- Open these files in order: `theme.js`, `App.js`, `components/AboutScreen.js`, `components/BottomTabs.js`, `components/TaskInput.js`, `components/TaskItem.js`.

## 🎯 0–5 min | Show the starting MVP
📢 “We already have a working app. Our goal is to make it easier to use and present.”

👉 Add, complete, delete one task. Demonstrate haptics and shake.

❓ Ask: “What do we already know from React?” Answer: components, props, state, map, filter.

## 🎯 5–13 min | Dark and light palettes
📂 **FILE TO OPEN: `theme.js`**

👉 Show two named objects: `themes.light` and `themes.dark`.

📂 **FILE TO OPEN: `App.js`**

👉 Find `const [isDark, setIsDark] = useState(false);` and `const theme = ...`.

📢 “This is React state controlling a style object. We don't need a CSS file.”

👉 Tap the header theme button and check the two modes.

## 🎯 13–22 min | Two screens, one shared parent
📂 **FILE TO OPEN: `App.js`**

👉 Show `const [screen, setScreen] = useState('tasks')` and the conditional rendering.

📂 **FILE TO OPEN: `components/AboutScreen.js`**

👉 Show `completed`, `total`, `isDark` arriving as props.

📢 “Changing tabs does NOT create a second list. Both screens read the same information from App.”

❓ Ask: “If we complete a task on Tasks, what changes on About?” The progress number.

## 🎯 22–30 min | Navigation for thumbs
📂 **FILE TO OPEN: `components/BottomTabs.js`**

👉 Show two Pressables across the bottom with `flex: 1` and `minHeight: 60`.

💡 Accessibility: large tap targets are easier for either thumb, and `accessibilityLabel` helps screen readers.

👉 Tap both tabs, switch themes, and show the same state.

## 🎯 30–38 min | Polish the task list
📂 **FILE TO OPEN: `components/TaskInput.js`**

👉 Show the full-width Add button and clear input border.

📂 **FILE TO OPEN: `components/TaskItem.js`**

👉 Show the bigger checkbox area, separate Delete button, and wrapped text.

⚠️ Keep TextInput as a controlled input — its value comes from App's `text` state.

## 🎯 38–43 min | Native phone features + presentation
📂 **FILE TO OPEN: `hooks/useShakePicker.js`**

👉 Highlight sensor subscription and cleanup in useEffect. No need to rewrite the hook.

👉 Tap to feel a vibration; gently shake to select an unfinished task.

📢 “These are phone features. We did not write a website inside the phone.”

## 🎯 43–45 min | Verify lab and close
👉 Check: two screens, shared state, native phone feature, light/dark modes, readable contrast, thumb-friendly controls, README, presentation.

📢 “Class 41 proved the app works. Class 42 makes it pleasant to use and ready to show.”

**[STUDENT TIP]** No login, API, or database is needed for this small presentation demo. Tasks still reset after reload; that is an intentional trade-off.
