import { createStore } from 'redux';

const add = document.getElementById('add');
const minus = document.getElementById('minus');
const number = document.querySelector('span');

const countModifier = (state = 0) => {
    return state;
};
const countStore = createStore(countModifier);

console.log(countStore.getState());

// let count = 0;
// number.innerText = count;

// const updateText = () => {
//     number.innerText = count;
// }

// const handleAdd = () => {
//     count = count + 1;
//     updateText();
// }

// const handleMinus = () => {
//     count = count - 1;
//     updateText();
// }

// add.addEventListener('click', handleAdd);
// minus.addEventListener('click', handleMinus);