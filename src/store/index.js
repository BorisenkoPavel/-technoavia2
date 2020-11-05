import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    rovers: [],
    photos: [],
    background: null,
    api_key: '94j5QBM9GbC7xt5LOsUHsCwvm6EoA13NdPgi35FD',
    baseRoute: 'https://api.nasa.gov/mars-photos/api/v1/rovers',
  },
  mutations: {
    setRovers(state, payload) {
      state.rovers = payload
    },
    setPhotos(state, payload) {
      state.photos = payload
    },
    setBackground(state, payload) {
      state.background = payload
    }
  },
  actions: {
    async fetchRovers({ commit, state }) {
      const response = await fetch(state.baseRoute + '?api_key=' + state.api_key)
      const { rovers } = await response.json()
      commit('setRovers', rovers)
    },
    async fetchPhotos({ commit, state }, { rover, camera, date}) {
      const response = await fetch(state.baseRoute + `/${rover}/photos?camera=${camera}&earth_date=${date}&api_key=` + state.api_key)
      const { photos } = await response.json()
      commit('setPhotos', photos)
    },
    async fetchBackground({commit, state}, date) {
      const response = await fetch(`https://api.nasa.gov/planetary/apod&api_key=${state.api_key}`)
      const background = await response.json()
      commit('setBackground', background)
    }
  },
  getters: {
    getRovers(state) {
      return state.rovers
    },
    getPhotos(state) {
      return state.photos
    }
  }
})
