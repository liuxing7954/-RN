// const ADD_TODO = 'ADD';
//
// export function addTodo(text) {
//     return {
//         type: ADD_TODO,
//         payload: text
//     }
// }

export const add = {
    type: 'ADD',
};

export const addDouble = postTitle => (dispatch, getState) => {
    // alert(getState());
    dispatch(add);
    return dispatch(add);
};

export const addThree =
    (dispatch, postTitle) => new Promise(function () {
        dispatch(add);
        return dispatch(add)
            .then(dispatch(add));
    });