import { combineReducers } from "redux";
import {logindata} from './login'
import {userlist} from '@pages/Htusers/redux'
import {cover} from '@pages/Resource/Video/redux'
export default combineReducers({
    logindata,
    userlist,
    cover
});