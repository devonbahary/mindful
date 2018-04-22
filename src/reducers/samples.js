const initialState = {};

export default (prevState = initialState, action) => {
    switch (action.type) {
        case 'ADD_SAMPLE':
            return prevState;
        default:
            return prevState;
    }
};
