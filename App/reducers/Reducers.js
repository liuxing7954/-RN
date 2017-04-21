const defaultState = 0;
export const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'ADD':
            // alert("ADD:" + state);
            return state + 1;
        default:
            return state;
    }
};

// const state = reducer(1, {
//     type: 'ADD',
//     payload: 2
// });