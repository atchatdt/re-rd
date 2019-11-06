import * as types from '../constants/actiontypes'


let initalState = {
    name: '',
    status: -1
}


var myReducer = (state = initalState, action) => {

    switch (action.type) {
        case types.FILTER_TABLE:
            return action.filter
        default:
            return state
    }
}

export default myReducer