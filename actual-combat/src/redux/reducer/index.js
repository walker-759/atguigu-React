import { combineReducers } from "redux";
import {menustatus} from '@layouts/Menu/redux'
import {home} from '@page/Home/redux'
import {video} from '@page/Videos/redux'
export default combineReducers({
  menustatus,
  home,
  video
});