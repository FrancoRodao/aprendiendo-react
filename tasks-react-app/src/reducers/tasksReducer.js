export const taskReducer = (state, {type, payload})=>{
    switch (type) {
        case "add": 
        
            return [...state, payload]

        case "edit":

            return state.map(task => task.id === payload.id ? payload:task)

        default:
            return state
    }
}