import tasks from './tasks'
import isDisplayForm from './isDisplayForm'
import itemEditing from './itemediting'
import filterTable from './filterTable'
import search from './search'
import sort from './sort'
let redux = require('redux')

const myReducer = redux.combineReducers({

    tasks,
    isDisplayForm,
    itemEditing,
    filterTable,
    search,
    sort

})

export default myReducer