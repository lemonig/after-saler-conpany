export const TAB_ACTION = "TAB_ACTION";

export const tabAction = {
  selectTab: (value) => {
    return {
      type: TAB_ACTION,
      value,
    };
  },
};
