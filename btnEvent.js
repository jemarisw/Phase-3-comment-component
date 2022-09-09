export const btn = document.getElementById('btn');

const btn = document.querySelector('#btn');

btn.addEventListener('click', function () {
  let customElement = document.createElement('resuable-comment');
  document.body.appendChild(customElement);
});
