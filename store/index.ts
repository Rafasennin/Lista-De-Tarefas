import { createStore } from 'vuex';

export default createStore({
  state: {
    isAdding: false,
    isLoading: false,
    isLogged: false,
    isFetching: false,
  },
  mutations: {
    SET_USER_NAME(state, status) {
      state.isUserName = status;
    },
    SET_ADDING(state, status) {
      state.isAdding = status;
    },
    SET_LOADING(state, status) {
      state.isLoading = status;
    },
    SET_LOGGED(state, status) {
      state.isLogged = status;
    },
    SET_FETCHING(state, status) {
      state.isFetching = status;
    },
  },
  actions: {},
  modules: {},
});
