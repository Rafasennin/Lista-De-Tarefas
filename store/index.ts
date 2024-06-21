import { createStore } from 'vuex';

export default createStore({
  state: {
    isAdding: false,
    isLoading: false,
    isLogged: false,
    isFetching: false,
  },
  mutations: {
    SET_ADDING(state, status) {
      console.log('SET_ADDING mutation called with:', status);
      state.isAdding = status;
      console.log('Updated isAdding state:', state.isAdding);
    },
    SET_LOADING(state, status) {
      console.log('SET_LOADING mutation called with:', status);
      state.isLoading = status;
      console.log('Updated isLoading state:', state.isLoading);
    },
    SET_LOGGED(state, status) {
      console.log('SET_LOGGED mutation called with:', status);
      state.isLogged = status;
      console.log('Updated isLogged state:', state.isLogged);
    },
    SET_FETCHING(state, status) {
      console.log('SET_FETCHING mutation called with:', status);
      state.isFetching = status;
      console.log('Updated isFetching state:', state.isFetching);
    },
  },
  actions: {},
  modules: {},
});
