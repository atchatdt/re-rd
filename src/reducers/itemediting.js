import * as types from '../constants/actiontypes'


let initalState = {
    id: '',
    name: '',
    status: false
}


var myReducer = (state = initalState, action) => {

    switch (action.type) {
        case types.EDIT_TASK:
            return action.task
        default:
            return state
    }
}

export default myReducer