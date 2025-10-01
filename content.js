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
      // Logic to jump to the task will be added here
      console.log(`Jump to task: ${input.value}`);
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
