'use strict';

document.addEventListener('keydown', (event) => {
  if (event.key === '#') {
    event.preventDefault();
    showTaskInput();
  }
});

function showTaskInput() {
  // Avoid creating multiple input boxes
  if (document.getElementById('backlog-task-jumper-input')) {
    return;
  }

  const input = document.createElement('input');
  input.id = 'backlog-task-jumper-input';
  input.type = 'text';
  input.placeholder = 'Enter issue number';
  document.body.appendChild(input);
  input.focus();

  input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      const issueNumber = input.value.trim();
      if (issueNumber) {
        const projectKey = getProjectKey();
        if (projectKey) {
          const url = `${window.location.origin}/view/${projectKey}-${issueNumber}`;
          if (event.ctrlKey) {
            window.open(url, '_blank');
          } else {
            window.location.href = url;
          }
        }
      }
      document.body.removeChild(input);
    } else if (event.key === 'Escape') {
      document.body.removeChild(input);
    }
  });

  input.addEventListener('blur', () => {
    // Remove the input if it loses focus
    if (document.body.contains(input)) {
      document.body.removeChild(input);
    }
  });
}

function getProjectKey() {
  // URL path is like /projects/PROJECT_KEY or /view/PROJECT_KEY-123
  const path = window.location.pathname;
  const projectMatch = path.match(/^\/projects\/([^\/]+)/);
  if (projectMatch) {
    return projectMatch[1];
  }
  const viewMatch = path.match(/^\/view\/([^\-]+)-\d+/);
  if (viewMatch) {
    return viewMatch[1];
  }
  return null;
}
