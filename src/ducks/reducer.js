const HANDLE_LOG_IN = 'HANDLE_LOG_IN';

const initial_state = {
    loggedIn: false
}

export default function reducer(state=initial_state, action){
    console.log(state, action);
    switch(action.type){
        case HANDLE_LOG_IN:
            return Object.assign({}, state, {loggedIn: action.payload});
        default:
            return state;
    }
}

export function logIn(payload){
    return {
        type: HANDLE_LOG_IN,
        payload
    }
}