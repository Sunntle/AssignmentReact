import { legacy_createStore as createStore } from "redux";
import rootReducer from "./reduces";
const store = createStore(rootReducer);
export default store;
