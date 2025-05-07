// Load a component dynamically
function loadComponent(name) {
  fetch(`components/${name}.html`)
    .then(res => res.text())
    .then(html => {
      document.getElementById("app-container").innerHTML = html;

      // Load additional logic for components
      if (name === "taskList") {
        loadTasks && loadTasks();
      }
    })
    .catch(error => {
      document.getElementById("app-container").innerHTML = `<p style="color:red;">Error loading ${name}</p>`;
      console.error("Component loading failed:", error);
    });
}

// Load default view on startup
window.onload = () => {
  loadComponent('taskList');
};



// ========== Task Logic (localStorage based) ==========

function getTasks() {
  return JSON.parse(localStorage.getItem("tasks") || "[]");
}

function saveTasks(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const tasks = getTasks();
  const list = document.getElementById("task-list");
  const form = document.getElementById("task-form");
  if (!list || !form) return;

  list.innerHTML = "";

  tasks.forEach((task, i) => {
    const li = document.createElement("li");
    li.className = task.completed ? "completed" : "";

    li.innerHTML = `
      <span>
        <strong>${task.title}</strong> 
        <small>(${task.subject || "General"})</small><br/>
        <em>Due: ${task.deadline}</em> | Priority: <strong>${task.priority}</strong>
      </span>
      <span>
        <button onclick="completeTask(${i})" title="Mark Done">✅</button>
        <button onclick="removeTask(${i})" title="Delete">❌</button>
      </span>
    `;
    list.appendChild(li);
  });

  form.onsubmit = function (e) {
    e.preventDefault();
    const task = {
      title: document.getElementById("task-title").value,
      deadline: document.getElementById("task-deadline").value,
      subject: document.getElementById("task-subject").value,
      priority: document.getElementById("task-priority").value,
      completed: false
    };
    tasks.push(task);
    saveTasks(tasks);
    loadTasks();
    form.reset();
  };
}

function completeTask(index) {
  const tasks = getTasks();
  tasks[index].completed = !tasks[index].completed;
  saveTasks(tasks);
  loadTasks();
}

function removeTask(index) {
  const tasks = getTasks();
  tasks.splice(index, 1);
  saveTasks(tasks);
  loadTasks();
}

// ========== Calendar Logic ==========

let currentDate = new Date();

function renderCalendar() {
  const tasks = getTasks();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const monthStart = new Date(year, month, 1);
  const monthEnd = new Date(year, month + 1, 0);
  const today = new Date();

  const calendarGrid = document.getElementById("calendar-grid");
  const header = document.getElementById("calendar-month-year");
  if (!calendarGrid || !header) return;

  header.textContent = `${monthStart.toLocaleString('default', { month: 'long' })} ${year}`;
  calendarGrid.innerHTML = "";

  // Weekday headers
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  weekdays.forEach(day => {
    const cell = document.createElement("div");
    cell.className = "header";
    cell.textContent = day;
    calendarGrid.appendChild(cell);
  });

  // Blank days before start of the month
  for (let i = 0; i < monthStart.getDay(); i++) {
    const blank = document.createElement("div");
    calendarGrid.appendChild(blank);
  }

  // Days of the month
  for (let day = 1; day <= monthEnd.getDate(); day++) {
    const cell = document.createElement("div");
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

    cell.textContent = day;

    if (dateStr === today.toISOString().split('T')[0]) {
      cell.classList.add("today");
    }

    const hasTask = tasks.some(task => task.deadline === dateStr);
    if (hasTask) {
      cell.classList.add("has-task");
    }

    calendarGrid.appendChild(cell);
  }
}

function nextMonth() {
  currentDate.setMonth(currentDate.getMonth() + 1);
  renderCalendar();
}

function prevMonth() {
  currentDate.setMonth(currentDate.getMonth() - 1);
  renderCalendar();
}

// Load calendar component
if (typeof loadComponent !== "undefined") {
  const originalLoadComponent = loadComponent;
  loadComponent = function(name) {
    originalLoadComponent(name);
    if (name === "calendar") {
      setTimeout(renderCalendar, 100); // Delay to wait for DOM
    }
  };
}

// ========== Notes Logic ==========

function getNotes() {
  return JSON.parse(localStorage.getItem("notes") || "[]");
}

function saveNotes(notes) {
  localStorage.setItem("notes", JSON.stringify(notes));
}

function loadNotes() {
  const notes = getNotes();
  const list = document.getElementById("notes-list");
  const form = document.getElementById("note-form");
  if (!list || !form) return;

  list.innerHTML = "";

  notes.forEach((note, i) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <strong>${note.title}</strong><br/>
      <p>${note.content}</p>
      <button onclick="deleteNote(${i})" title="Delete">🗑️</button>
    `;
    list.appendChild(li);
  });

  form.onsubmit = function (e) {
    e.preventDefault();
    const note = {
      title: document.getElementById("note-title").value,
      content: document.getElementById("note-content").value
    };
    notes.push(note);
    saveNotes(notes);
    loadNotes();
    form.reset();
  };
}

function deleteNote(index) {
  const notes = getNotes();
  notes.splice(index, 1);
  saveNotes(notes);
  loadNotes();
}

// Enhance loadComponent to support notes
if (typeof loadComponent !== "undefined") {
  const originalLoadComponent = loadComponent;
  loadComponent = function(name) {
    originalLoadComponent(name);
    setTimeout(() => {
      if (name === "taskList") loadTasks();
      else if (name === "calendar") renderCalendar();
      else if (name === "notes") loadNotes();
    }, 100);
  };
}

// ========== Exam Reminder Logic ==========

function getExams() {
  return JSON.parse(localStorage.getItem("exams") || "[]");
}

function saveExams(exams) {
  localStorage.setItem("exams", JSON.stringify(exams));
}

function loadExams() {
  const exams = getExams();
  const list = document.getElementById("exam-list");
  const form = document.getElementById("exam-form");
  if (!list || !form) return;

  list.innerHTML = "";

  exams.forEach((exam, i) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <strong>${exam.subject}</strong><br/>
      <em>📅 Date: ${exam.date}</em>
      <button onclick="deleteExam(${i})" title="Delete">🗑️</button>
    `;
    list.appendChild(li);
  });

  form.onsubmit = function (e) {
    e.preventDefault();
    const exam = {
      subject: document.getElementById("exam-subject").value,
      date: document.getElementById("exam-date").value
    };
    exams.push(exam);
    saveExams(exams);
    loadExams();
    form.reset();
  };
}

function deleteExam(index) {
  const exams = getExams();
  exams.splice(index, 1);
  saveExams(exams);
  loadExams();
}

// Add to loadComponent handler
if (typeof loadComponent !== "undefined") {
  const originalLoadComponent = loadComponent;
  loadComponent = function (name) {
    originalLoadComponent(name);
    setTimeout(() => {
      if (name === "taskList") loadTasks();
      else if (name === "calendar") renderCalendar();
      else if (name === "notes") loadNotes();
      else if (name === "examReminder") loadExams();
    }, 100);
  };
}