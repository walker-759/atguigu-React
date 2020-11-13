import {MENUBARSTATUS} from './constants'
const menustatusinit={
    num:false
}
export function menustatus(state=menustatusinit,action){
    switch(action.type){
        case MENUBARSTATUS:
            return {
                num:action.data
            }
        default :
            return state
    }
}