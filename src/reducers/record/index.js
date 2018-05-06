const record = (state = [], action) => {
    switch (action.type) {
        case 'ADD_REC':
            return {
                ...state,
                [action.key]:{
                ...action.payload
                }
            };
        case 'DEL_REC':
            return Object.keys(state).filter(item => item !== action.key)
            ;
        default:
            return state
    }
};

export default record

