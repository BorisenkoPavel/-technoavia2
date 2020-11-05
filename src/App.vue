<template>
  <div id="app">
    <gallery msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import gallery from './components/gallery'
import { mapActions } from 'vuex'

export default {
  name: 'App',
  components: {
    gallery
  },
  async mounted () {
    await this.fetchRovers()
  },
  methods: {
    ...mapActions(['fetchRovers'])
  }
}
</script>

<style lang="scss">
@import '~materialize-css/dist/css/materialize.min.css';

* {
  box-sizing: border-box;
}

html, body, #app {
  height: 100%;
  margin: 0;
}

#app {
  background: url("~@/assets/bg.jpg") no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
