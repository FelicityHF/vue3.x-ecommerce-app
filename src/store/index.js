import { createStore } from 'vuex'

export default createStore({
  state: {
    isLogin: localStorage.getItem('isLogin'),
    currentUser: localStorage.currentUser
  },
  mutations: {
    userState(state, user) {
      console.log('payload', user);
      if (user) {
        state.isLogin = true;
        state.currentUser = user;
        localStorage.setItem('isLogin', 'true');
        localStorage.setItem('currentUser', `${user}`);

      } else {
        state.isLogin = false;
        state.currentUser = '';
        // localStorage.setItem('isLogin', '');
      }
    }
  },
  actions: {

  },
  modules: {
  }
})
