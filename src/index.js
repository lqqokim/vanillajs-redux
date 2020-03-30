import { createStore } from 'redux';

const form = document.querySelector('form');
const input = document.querySelector('input');
const ul = document.querySelector('ul');

const ADD_TODO = 'ADD_TODO';
const DELETE_TODO = 'DELETE_TODO';

/**
 * action creator (return only object)
 * @param {*} text 
 */
const addToDo = text => {
    return {
        type: ADD_TODO,
        text
    }
};

/**
 * action creator (return only object)
 * @param {*} id 
 */
const deleteToDo = id => {
    return {
        type: DELETE_TODO,
        id
    }
};

/**
 * reducer (function?)
 * @param {*} state 
 * @param {*} action 
 */
const reducer = (state = [], action) => {
    switch (action.type) {
        case ADD_TODO:
            const newToDoObj = { text: action.text, id: Date.now() };
            return [newToDoObj, ...state];
        case DELETE_TODO:
            const cleaned = state.filter(toDo => toDo.id !== parseInt(action.id));
            return cleaned;
        default:
            return state;
    }
}

/**
 * define store
 */
const store = createStore(reducer);

const dispatchAddToDo = text => {
    // action creator를 사용하여 action을 dispatch.
    store.dispatch(addToDo(text));
};

const dispatchDeleteToDo = e => {
    const id = parseInt(e.target.parentNode.id);
    store.dispatch(deleteToDo(id));
}

/**
 * - state 변경시 repatin를 하게되면 느려질수 있다.
 * - react로 해결가능
 */
const paintToDos = () => {
    const toDos = store.getState();
    ul.innerHTML = '';

    toDos.forEach(toDo => {
        const li = document.createElement('li');
        const btn = document.createElement('button');
        btn.innerText = 'DEL';
        btn.addEventListener('click', dispatchDeleteToDo);
        li.id = toDo.id;
        li.innerText = toDo.text;
        li.appendChild(btn);
        ul.appendChild(li);
    });
}

store.subscribe(paintToDos);

const onSumit = e => {
    e.preventDefault();
    const toDo = input.value;

    console.log(toDo);

    input.value = "";
    dispatchAddToDo(toDo);
}

form.addEventListener('submit', onSumit);