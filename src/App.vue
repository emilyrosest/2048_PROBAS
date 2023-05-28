<template>
  <div id="app">
    <h1 class="title">2048 Aléatoire</h1>
    <SettingsComponent v-if="showSettings" @colorsChosen="handleColorsChosen" @powChosen="handlePowChosen" @sizeChosen="handleSizeChosen" @start="handleStart"></SettingsComponent>
    <div class="game" v-show="!gameOver && !showSettings">
      <GridComponent :size="size" :colors="colors" @gameOver="handleGameOver" :pow="pow" :key="pow"></GridComponent>
    </div>
    <div v-if="gameOver" class="game-over">Game Over</div>
    <StatsComponentVue v-if="!showSettings" :pow="pow"></StatsComponentVue>
  </div>
</template>

<script>
import GridComponent from './components/GridComponent.vue'
import SettingsComponent from './components/SettingsComponent.vue'
import StatsComponentVue from './components/StatsComponent.vue';

export default {
  name: 'App',
  components: {
    GridComponent,
    SettingsComponent,
    StatsComponentVue,
  },
  data() {
    return {
      gameOver: false,
      showSettings: true,
      colors: true,
      pow: 2,
      size: 4
    };
  },
  methods: {
    handleGameOver() {
      this.gameOver = true
    },
    handleColorsChosen(chosenColors) {
      this.colors = chosenColors;
    },
    handlePowChosen(chosenPow) {
      this.pow = chosenPow;
    },
    handleSizeChosen(chosenSize) {
      this.size = chosenSize;
    },
    handleStart() {
      this.showSettings = false;
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.title {
  margin-bottom: 60px;
}

.game {
  display: flex;
  justify-content: center;
}
</style>
