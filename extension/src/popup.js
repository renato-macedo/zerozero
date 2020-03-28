function displayError(display) {
  if (display) {
    document.getElementById('error').style.display = 'flex';
  } else {
    document.getElementById('error').style.display = 'none';
  }
}

const loginOpt = document.querySelector('.login-option');
const signupOpt = document.querySelector('.signup-option');
const loginContainer = document.querySelector('.join');
const signupContainer = document.querySelector('.create');

displayError(false);
loginOpt.addEventListener('click', e => {
  loginOpt.classList.add('activate');
  signupOpt.classList.remove('activate');
  loginContainer.classList.remove('deactivate');
  signupContainer.classList.add('deactivate');
});

signupOpt.addEventListener('click', () => {
  loginOpt.classList.remove('activate');
  signupOpt.classList.add('activate');
  signupContainer.classList.remove('deactivate');
  loginContainer.classList.add('deactivate');
});

document.getElementById('create-btn').addEventListener('click', () => {
  const field = document.getElementById('room-code');

  const message = { type: 'create-room', payload: { username: 'renato' } };

  console.log('sending', message);
  // send message to the background.js
  chrome.runtime.sendMessage(message, response => {
    console.log(response);
    field.textContent = response.room;
  });
});

document.getElementById('join-btn').addEventListener('click', () => {
  const field = document.getElementById('join-input');

  if (field.value) {
    const message = {
      type: 'join-room',
      payload: { username: 'johndoe', room: field.value }
    };

    // send message to the background.js
    chrome.runtime.sendMessage(message, response => {
      console.log(response);
      field.textContent = 'ok';
    });
  }
});
