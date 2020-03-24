const el = document.getElementById('primary');

if (el) {
  el.style.backgroundColor = 'red';
}
chrome.runtime.sendMessage({ message: 'create' }, response => {
  console.log(response);
});
