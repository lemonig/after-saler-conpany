const initState = {};

function mapReducer(state = initState, action) {
  switch (action.type) {
    case "SELECT_ADDRESS":
      return {
        ...state,
        value: action.value,
      };

    default:
      return state;
  }
}

export default mapReducer;
