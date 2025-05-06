let currentType = localStorage.getItem("activeAttendanceType") || "college";
let storageKey = getStorageKey(currentType);

window.onload = function () {
    setTitle(currentType);
    loadAttendance();
};

function switchAttendanceType(type) {
    currentType = type;
    localStorage.setItem("activeAttendanceType", type);
    storageKey = getStorageKey(type);
    setTitle(type);
    reloadTable();
}

function setTitle(type) {
    const titleMap = {
        college: "College Attendance",
        lab: "Lab Attendance",
        library: "Library Attendance"
    };
    document.getElementById("main-title").textContent = titleMap[type] || "Attendance Tracker";
}

function getStorageKey(type) {
    return `attendanceRecords_${type}`;
}

function addAttendance() {
    const nameInput = document.getElementById("student-name");
    const name = nameInput.value.trim().toLowerCase();
    const status = document.getElementById("attendance-status").value;

    if (!name) {
        alert("Please enter a student name.");
        return;
    }

    const attendance = { name, status };
    let records = getAttendanceFromStorage();
    records.push(attendance);
    saveAttendanceToStorage(records);

    nameInput.value = "";
    document.getElementById("attendance-status").value = "present";
    reloadTable();
}

function reloadTable() {
    const tbody = document.getElementById("attendance-list").getElementsByTagName("tbody")[0];
    tbody.innerHTML = "";
    loadAttendance();
}

function loadAttendance() {
    const records = getAttendanceFromStorage();

    // Group by name
    const studentMap = {};
    records.forEach(r => {
        const name = r.name;
        if (!studentMap[name]) {
            studentMap[name] = { total: 0, present: 0 };
        }
        studentMap[name].total++;
        if (r.status === "present") {
            studentMap[name].present++;
        }
    });

    const tbody = document.getElementById("attendance-list").getElementsByTagName("tbody")[0];
    Object.keys(studentMap).forEach(name => {
        const row = tbody.insertRow();
        const stats = studentMap[name];
        const percentage = ((stats.present / stats.total) * 100).toFixed(2);

        row.insertCell(0).textContent = capitalize(name);
        row.insertCell(1).textContent = stats.total;
        row.insertCell(2).textContent = stats.present;
        row.insertCell(3).textContent = percentage + "%";
    });

    updateOverallSummary(records);
}

function updateOverallSummary(records) {
    const total = records.length;
    const present = records.filter(r => r.status === "present").length;
    const percentage = total > 0 ? ((present / total) * 100).toFixed(2) : 0;

    document.getElementById("total-count").textContent = total;
    document.getElementById("present-count").textContent = present;
    document.getElementById("present-percentage").textContent = `${percentage}%`;
}

function saveAttendanceToStorage(records) {
    localStorage.setItem(storageKey, JSON.stringify(records));
}

function getAttendanceFromStorage() {
    return JSON.parse(localStorage.getItem(storageKey)) || [];
}

function searchAttendance() {
    const filter = document.getElementById("search-bar").value.toLowerCase();
    const rows = document.getElementById("attendance-list").getElementsByTagName("tbody")[0].rows;

    for (let i = 0; i < rows.length; i++) {
        const name = rows[i].cells[0].textContent.toLowerCase();
        rows[i].style.display = name.includes(filter) ? "" : "none";
    }
}

function capitalize(name) {
    return name.charAt(0).toUpperCase() + name.slice(1);
}