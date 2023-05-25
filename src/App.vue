<template>
  <div id="app">
    <h1>2048 Aléatoire</h1>
    <SettingsComponent v-if="showSettings" @colorsChosen="handleColorsChosen" @powChosen="handlePowChosen" @start="handleStart"></SettingsComponent>
    <div class="game" v-show="!gameOver && !showSettings">
      <GridComponent :size="4" :colors="colors" @gameOver="handleGameOver" :pow="pow" :key="pow"></GridComponent>
    </div>
    <div v-if="gameOver" class="game-over">Game Over</div>
  </div>
</template>

<script>
import GridComponent from './components/GridComponent.vue'
import SettingsComponent from './components/SettingsComponent.vue'

export default {
  name: 'App',
  components: {
    GridComponent,
    SettingsComponent
  },
  data() {
    return {
      gameOver: false,
      showSettings: true,
      colors: true,
      pow: 2,
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

.game {
  display: flex;
  justify-content: center;
}
</style>
