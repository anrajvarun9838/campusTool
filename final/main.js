// main.js

const resources = {
    CSE: {
      1: {
        1: ['Maths-I', 'Programming Fundamentals', 'Physics'],
        2: ['Maths-II', 'Data Structures', 'Electronics']
      },
      2: {
        3: ['DBMS', 'OOPs', 'Computer Networks'],
        4: ['OS', 'Theory of Computation', 'Microprocessors']
      }
      // Continue for other years...
    },
    ME: {
      1: {
        1: ['Maths-I', 'Engineering Drawing', 'Physics'],
        2: ['Maths-II', 'Mechanics', 'Thermodynamics']
      }
      // Add more as needed
    }
    // Add other branches similarly
  };
  
  document.getElementById('filterForm').addEventListener('submit', function (e) {
    e.preventDefault();
  
    const branch = document.getElementById('branchSelect').value;
    const year = document.getElementById('yearSelect').value;
    const sem = document.getElementById('semSelect').value;
  
    const subjectList = document.getElementById('subjects');
    subjectList.innerHTML = '';
  
    if (resources[branch] && resources[branch][year] && resources[branch][year][sem]) {
      const subjects = resources[branch][year][sem];
      subjects.forEach(subject => {
        const li = document.createElement('li');
        li.textContent = `${subject} - [Download PDF]`;
        subjectList.appendChild(li);
      });
    } else {
      subjectList.innerHTML = '<li>No data available for selected options.</li>';
    }
  });
  // main.js

document.getElementById('filterForm').addEventListener('submit', function (e) {
    e.preventDefault();
  
    // Just show the subject section after selection
    const section = document.getElementById('subjectSection');
    section.style.display = 'block';
  });
  
  // PDF preview functionality
  document.querySelectorAll('.subject-entry input[type="file"]').forEach((input) => {
    input.addEventListener('change', function () {
      const file = input.files[0];
      if (file && file.type === 'application/pdf') {
        const fileURL = URL.createObjectURL(file);
        const viewLink = input.parentElement.querySelector('.view-link');
        viewLink.href = fileURL;
        viewLink.style.display = 'inline-block';
      }
    });
  });
  document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('filterForm');
    const subjectSection = document.getElementById('subjectSection');
  
    form.addEventListener('submit', function (e) {
      e.preventDefault();
  
      const branch = document.getElementById('branchSelect').value;
      const year = document.getElementById('yearSelect').value;
      const sem = document.getElementById('semSelect').value;
  
      if (branch && year && sem) {
        subjectSection.style.display = 'block';
      } else {
        alert('Please select Branch, Year, and Semester.');
      }
    });
  });
  