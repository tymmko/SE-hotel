export const createMockStore = (initialState = {}, dispatchMock = jest.fn()) => {
    return {
      getState: () => initialState,
      dispatch: dispatchMock,
      subscribe: jest.fn(),
      replaceReducer: jest.fn(),
    };
  };
  