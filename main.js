const button = document.querySelector('.btn');
const list = document.querySelector('.list');
const input = document.querySelector('.input');

///////// WRITING TO LOCAL STORAGE /////////
button.addEventListener('click', () => {
  let storageArray = getLocalStorage();
  // console.log(storageArray);
  if (storageArray === null) {
    storageArray = [];
  }

  storageArray.push(input.value);
  setLocalStorage(storageArray);
  location.reload();
});

function getLocalStorage() {
  return JSON.parse(localStorage.getItem('fruits'));
}

function setLocalStorage(fruitsArray) {
  const data = JSON.stringify(fruitsArray);
  return localStorage.setItem('fruits', data);
}

///////// READING FROM LOCAL STORAGE /////////
const storage = getLocalStorage();
console.log(storage);
renderFruits(storage);

function renderFruits(storage) {
  storage?.map((fruit) => {
    const container = document.createElement('div');
    const fruitName = document.createElement('p');
    const closeIcon = document.createElement('span');

    closeIcon.classList.add('closeSpan');

    fruitName.innerHTML = fruit;
    closeIcon.innerHTML = '&#x2715';

    container.appendChild(fruitName);
    container.appendChild(closeIcon);
    list.appendChild(container);
  });

  const deleteButtons = Array.from(document.querySelectorAll('.closeSpan'));
  console.log(deleteButtons);

  deleteButtons.forEach((button, i) => {
    button.dataset.name = storage[i];
  });

  deleteButtons.forEach((button, i) => {
    button.addEventListener('click', function () {
      const storage = getLocalStorage('fruits');
      const newStorage = storage.filter((fruit) => fruit !== storage[i]);
      setLocalStorage(newStorage);
      location.reload();
    });
  });
}
