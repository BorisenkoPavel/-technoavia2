<template>
  <div class="gallery">
    <div v-if="getPhotos.length" class="gallery__photos" >
      <div
        class="gallery__item"
        v-for="photo in getPhotos"
        :key="photo.id"
        :style="`background-image: url(${photo.img_src})`"
      />
    </div>
    <div v-else class="gallery__not-found gallery__photos">Фотографий по выбранным<br> фильтрам не найдены</div>
    <form class="gallery__options" @submit.prevent="findPhoto">
      <div class="gallery__option">
        <label>Марсоход</label>
        <select v-model="currentRover" class="gallery__input">
          <option
            v-for="rover in getRovers"
            :key="rover.id"
            :value="rover"
          >{{ rover.name }}</option>
        </select>
      </div>
      <div class="gallery__option">
        <label>Камера</label>
        <select v-model="currentCamera" class="gallery__input">
          <option
            v-for="camera in currentCameras"
            :key="camera.id"
            :value="camera"
          >{{camera.full_name}}</option>
        </select>
      </div>
      <div class="gallery__option">
        <datepicker
            ref="DatepickerRef"
            wrapper-class="date-picker__wrapper"
            input-class="date-picker__input "
            initial-view="year"
            calendar-button-icon="icon-calendar"
            calendar-button
            monday-first
            :language="ru"
            v-model="earthDate"
        />
      </div>
      <div class="gallery__option">
        <button class="gallery__search" type="submit">Искать</button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Datepicker from 'vuejs-datepicker'
import {ru} from 'vuejs-datepicker/dist/locale'

export default {
  name: 'gallery',
  components: {
    Datepicker
  },
  data() {
    return {
      ru,
      currentRover: null,
      currentCamera: null,
      earthDate: null
    }
  },
  watch: {
    currentRover () {
      this.currentCamera = this.currentCameras[0]
    }
  },
  async mounted() {
    if (this.getRovers && this.getRovers.length) {
      this.currentRover = this.getRovers[0]

      if (this.currentCameras && this.currentCameras.length) {
          this.currentCamera = this.currentCameras[0]
      }
    }
  },
  computed: {
    ...mapGetters(["getPhotos", "getRovers"]),
    currentCameras () {
      return this.currentRover && this.currentRover.cameras
    }
  },
  methods: {
    ...mapActions(['fetchPhotos', 'fetchBackground']),
    async findPhoto () {
      let date = new Date(this.earthDate)
      date = this.$moment(date).format('YYYY-MM-DD')
      const data = {
        rover: this.currentRover.name && this.currentRover.name.toLowerCase(),
        camera: this.currentCamera.name && this.currentCamera.name.toLowerCase(),
        date
      }
      try {
        await this.fetchPhotos(data)
        await this.fetchBackground(date)
      } catch (e) {
        console.error('error', e)
      }
    }
  }
}
</script>

<style lang="scss" src="./style.scss" />
