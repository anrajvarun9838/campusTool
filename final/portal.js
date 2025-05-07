document.getElementById('filterForm').addEventListener('submit', function (e) {
    e.preventDefault();
  
    const branch = document.getElementById('branchSelect').value;
    const year = document.getElementById('yearSelect').value;
  
    // Show relevant subject section based on the branch and year selected
    const section = document.getElementById('subjectSection');
    section.style.display = 'block';
});
