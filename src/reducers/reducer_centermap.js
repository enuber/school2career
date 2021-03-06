import { CENTER_COORDS } from '../actions/actions_types';

const defaultState = {center : {}};

// reducer for the center coordinates. Initially set to an empty object.
export default function(state = defaultState, action){
    switch(action.type){
        case CENTER_COORDS:
            return { ...state, center: action.payload };
        default:
            return state;
    }
}
