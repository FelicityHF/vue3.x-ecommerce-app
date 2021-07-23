import { createStore } from 'vuex'
import { getCartList } from '@/network/cart.js'

export default createStore({
  state: {
    isLogin: localStorage.getItem('isLogin'),
    currentUser: '',
    cartCount: 0
  },
  mutations: {
    userState(state, user) {
      console.log('payload', user);
      if (user) {
        state.isLogin = true;
        state.currentUser = user;
        localStorage.setItem('isLogin', 'true');
        // localStorage.setItem('currentUser', `${user}`);
      } else {
        state.isLogin = false;
        // state.currentUser = '';
        // localStorage.setItem('isLogin', '');
      }
    },

    addCart(state, payload) {
      state.cartCount = payload.count;
    }
  },

  actions: {
    updateCart({ commit }) {
      getCartList().then(res => {
        // commit('addCart', { count: res.data.length || 0 })
        commit('addCart', {
          count: res.data.reduce((sum, item) => {
            sum += item.num;
            return sum;
          }, 0)
        })

      })
    }


  },
  modules: {
  }
})
