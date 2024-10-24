const colors = require('colors');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: 'ps-shell:>'.cyan,
  terminal: true
});

var username, pw;

// create a CLI for doing various things in powerschool
console.log('\nWelcome to the PowerSchool CLI developed by Avery Wagar and Nathan Laha. Type help for a list of commands.\n\n'.green);
rl.prompt();
rl.on('line', (line) => {
  switch (line.trim()) {
    // user entered uknown command
    default:
      console.log(`'${line.trim()}' is not valid command for the Powerschool Shell, please try again!`.red);
      rl.prompt();
      break;
      // login to powerschool
    case 'login':
      login();
      break;
      // shows help message
    case 'help':
      console.log('\nexit - exit the program\nlogin - login to powerschool\nhelp - shows this help message\n'.green);
      rl.prompt();
      break;
      // exit the CLI
    case 'exit':
      console.log('\nGoodbye!\n'.green);
      process.exit(0);
      break;
  }
});

// function gets called when user types login
function login() {
  // prompt username
  username();

  function username() {
    rl.question('\nWhat is your SPS Username?\n\n', (answer) => {
      // TODO: Log the answer in a database
      if (answer != "") {
        username = answer;
        password();
      } else {
        console.error('You are really bad at this :(\n\n');
        login();
      }
    });
  }
  // prompt password
  function password() {
    rl.question('\nWhat is your SPS password?\n\n', (answer) => {
      // TODO: Log the answer in a database
      pw = answer;
      rl.close();
      run();
    });
  }
  // login
  function run() {
    console.log('\nLogging in!\n'.green);
    require('./gradecheck').check(username, pw);
  }
}