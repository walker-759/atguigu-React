import {MENUBARSTATUS} from './constants'

export function entertoroute(val) {
    return dispatch=>{
        dispatch({
            type: MENUBARSTATUS,
            data: val
        })
    }
}