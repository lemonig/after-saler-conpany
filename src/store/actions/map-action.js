export const SELECT_ADDRESS = "SELECT_ADDRESS";

export const mapAction = {
  selectAddress: (value) => {
    return {
      type: SELECT_ADDRESS,
      value,
    };
  },
};
