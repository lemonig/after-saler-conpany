const initState = 0;

function tabReducer(state = initState, action) {
  switch (action.type) {
    case "TAB_ACTION":
      return {
        value: action.value,
      };

    default:
      return state;
  }
}

export default tabReducer;
