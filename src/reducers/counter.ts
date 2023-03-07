const initialState: Array<number | undefined> = [];

type ActionType = {
	type: string;
	payload?: number;
};

const favoritesReducer = (
	state: Array<number | undefined> = initialState,
	action: ActionType
) => {
	switch (action.type) {
		case "ADD_FAVORITE":
			return [...state, action.payload];
		default:
			return state;
	}
};

export default favoritesReducer;
