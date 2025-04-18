const { spawn } = require('child_process');
const path = require('path');

// Start frontend development server
const frontend = spawn('npm', ['run', 'dev'], {
  stdio: 'inherit',
  shell: true
});

// Start backend server
const backend = spawn('node', [path.join(__dirname, 'src', 'backend', 'server.js')], {
  stdio: 'inherit',
  shell: true
});

// Handle process termination
process.on('SIGINT', () => {
  frontend.kill('SIGINT');
  backend.kill('SIGINT');
  process.exit();
});

frontend.on('close', (code) => {
  console.log(`Frontend process exited with code ${code}`);
  backend.kill('SIGINT');
  process.exit(code);
});

backend.on('close', (code) => {
  console.log(`Backend process exited with code ${code}`);
  frontend.kill('SIGINT');
  process.exit(code);
});
