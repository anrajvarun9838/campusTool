const tableBody = document.getElementById("notificationTableBody");

// Manually defined notifications (admin adds here)
const notifications = [
  {
    title: "Midterm Exam Schedule",
    url: "Aktu.pdf",
    relatedTo: "Exam",
    date: "2025-05-01",
    month: 5,
    year: 2025
  },
  {
    title: "Library Orientation Notice",
    url: "n.pdf",
    relatedTo: "General",
    date: "2025-04-15",
    month: 4,
    year: 2025
  },
  {
    title: "Annual Day Event Schedule",
    url: "n2.pdf",
    relatedTo: "Event",
    date: "2025-03-28",
    month: 3,
    year: 2025
  }
];

function renderTable(data) {
  tableBody.innerHTML = "";
  data.forEach((notif, index) => {
    const tr = document.createElement("tr");

    const tdNo = document.createElement("td");
    tdNo.textContent = index + 1;

    const tdTitle = document.createElement("td");
    const link = document.createElement("a");
    link.href = notif.url;
    link.target = "_blank";
    link.textContent = notif.title;
    tdTitle.appendChild(link);

    const tdDate = document.createElement("td");
    tdDate.textContent = notif.date;

    tr.appendChild(tdNo);
    tr.appendChild(tdTitle);
    tr.appendChild(tdDate);
    tableBody.appendChild(tr);
  });
}

function filterNotifications() {
  const keyword = document.getElementById("searchKeyword").value.toLowerCase();
  const month = document.getElementById("searchMonth").value;
  const year = document.getElementById("searchYear").value;
  const relatedTo = document.getElementById("searchRelated").value;

  const filtered = notifications.filter(n => {
    return (
      n.title.toLowerCase().includes(keyword) &&
      (!month || n.month == month) &&
      (!year || n.year == year) &&
      (!relatedTo || n.relatedTo === relatedTo)
    );
  });

  renderTable(filtered);
}

function resetFilters() {
  document.getElementById("searchKeyword").value = "";
  document.getElementById("searchMonth").value = "";
  document.getElementById("searchYear").value = "";
  document.getElementById("searchRelated").value = "";
  renderTable(notifications);
}

// Initial render
document.addEventListener("DOMContentLoaded", () => {
  renderTable(notifications);
});
