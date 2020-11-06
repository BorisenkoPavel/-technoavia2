<template>
  <div id="app" :style="`background-image: url(${getBackground})`">
    <gallery />
  </div>
</template>

<script>
import gallery from './components/gallery'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'App',
  components: {
    gallery
  },
  async mounted () {
    await this.fetchRovers()
    let date = new Date()
    date = this.$moment(date).format('YYYY-MM-DD')
    this.fetchBackground(date)
  },
  methods: {
    ...mapActions(['fetchRovers', 'fetchBackground'])
  },
  computed: {
    ...mapGetters(['getBackground'])
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
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
