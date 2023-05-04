<template>
  <div id="app">
    <h1>2048</h1>
    <div class="game" v-show="!gameOver">
      <GridComponent :size="4" @gameOver="handleGameOver"></GridComponent>
    </div>
    <div v-if="gameOver" class="game-over">Game Over</div>
  </div>
</template>

<script>
import GridComponent from './components/GridComponent.vue'

export default {
  name: 'App',
  components: {
    GridComponent
  },
  data() {
    return {
      gameOver: false,
    };
  },
  methods: {
    handleGameOver() {
      this.gameOver = true
    },
  },
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
