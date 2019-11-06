import * as types from '../constants/actiontypes'


let initalState = {
    by: 'name',
    value: 1
}


var myReducer = (state = initalState, action) => {

    switch (action.type) {
        case types.SORT:
            return action.sort
        default:
            return state
    }
}

export default myReducer