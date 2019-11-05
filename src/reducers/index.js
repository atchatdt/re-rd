import tasks from './tasks'
import isDisplayForm from './isDisplayForm'
import itemEditing from './itemediting'

let redux = require('redux')

const myReducer = redux.combineReducers({

    tasks,
    isDisplayForm,
    itemEditing

})

export default myReducer