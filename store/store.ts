import { createStore } from 'redux'
import IAction from './IAction'

const reducer = (state: any = [], action: IAction) => {
    if (action.type === 'ADD') {
        if (state.indexOf(action.payload) === -1) {
            return [...state, action.payload]
        }
    } else if (action.type === 'REMOVE') {
        if (state.indexOf(action.payload) !== -1) {
            return state.filter((item: any) => item !== action.payload)
        }
    }
}
export const favouriteStore = createStore(reducer, [])
