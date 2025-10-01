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
  const path = window.location.pathname;

  // Pattern 1: /projects/PROJECT_KEY/...
  let match = path.match(/^\/projects\/([^\/?#]+)/);
  if (match) {
    return match[1];
  }

  // Pattern 2: /view/PROJECT_KEY-123
  match = path.match(/^\/view\/([^\-]+)-\d+/);
  if (match) {
    return match[1];
  }

  // Pattern 3: Search in the DOM for a link to the project home, e.g., in the header.
  const projectLink = document.querySelector('a[href*="/projects/"]');
  if (projectLink) {
    match = projectLink.pathname.match(/^\/projects\/([^\/?#]+)/);
    if (match) {
      return match[1];
    }
  }
  
  // Pattern 4: Look for the "Add Issue" link.
  const addIssueLink = document.querySelector('a[href*="/add/"]');
  if (addIssueLink) {
    match = addIssueLink.pathname.match(/^\/add\/([^\/?#]+)/);
    if (match) {
      return match[1];
    }
  }

  return null;
}
