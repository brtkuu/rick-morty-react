import { createStore } from "redux";
import favoritesReducer from "./reducers/counter";

export const store = createStore(favoritesReducer);

store.subscribe(() => console.log(store.getState()));
