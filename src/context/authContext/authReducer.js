//Import Actions
import { SIGN_UP_USER } from './actions';

export default (state, action) => {
    switch (action.type) {
        case SIGN_UP_USER:
            return {
                ...state,
                currentUser: action.payload,
                loading: false
            }
        default:
            return state
    }
}
