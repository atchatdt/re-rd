import * as types from '../constants/actiontypes'

let data = JSON.parse(localStorage.getItem('tasks'))
var initalState = data ? data : []


let s4 =() => {
    return  Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
}

let guid =() =>{
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}


let findIndex = (state,id) => {
   
    let result = -1;
    state.forEach((task,index) => {
        if(task.id === id){
            result = index
            return result
            
        }
    })
    return result;
}

var myReducer = (state=initalState, action)=>{

    switch(action.type){
        case types.LIST_ALL:
            return state
        case types.ADD_TASK:
            let newTask ={
                id: guid(),
                name: action.task.name,
                status: action.task.status === 'true' ? true : false
            }
            state.push(newTask)
            localStorage.setItem('tasks',JSON.stringify(state))
            return [...state]
        case types.UPDATE_STATUS:
            return state
        case types.UPDATE_STATUS_TASK:
            // console.log(action)
            var index = findIndex(state,action.id);
            // state[index].status = !state[index].status
            state[index] = {...state[index], status : !state[index].status} // hoặc dùng tasks: state.tasks ở phần connect file tương ứng
            localStorage.setItem('tasks',JSON.stringify(state))
            return [...state]
        case types.DELETE_TASK:
            state = state.filter( x=> x.id !== action.id )
            localStorage.setItem('tasks',JSON.stringify(state))
            return [...state]
        default: return state
    }
}

export default myReducer