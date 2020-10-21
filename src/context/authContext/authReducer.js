//Import Actions
import { SIGN_OUT, SIGN_UP_USER } from './actions';

export default (state, action) => {
    switch (action.type) {
        case SIGN_UP_USER:
            return {
                ...state,
                currentUser: action.payload,
                loading: false
            }
        case SIGN_OUT: 
            return {
                ...state,
                currentUser: null,
                loading: false
            }    
        default:
            return state
    }
}
