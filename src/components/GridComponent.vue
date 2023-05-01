<template>
  <div class="grid-container">
    <CellComponent :number="cell.number" v-for="(cell, index) in cellObjects" :key="index"></CellComponent>
    <div v-if="gameOver" class="game-over">Game Over</div>
  </div>
</template>

<script>
import CellComponent from './CellComponent.vue';
import { shuffle, onKeyDown } from '@/services/game.js';

export default {
    name: "GridComponent",
    props: {
      size: {
        type: Number,
        default: 4
      }
    },
    components: { CellComponent },
    data() {
      return {
        cells: [],
        score: 0,
        //gameOver: false
      };
    },
    created() {
      this.init();
      window.addEventListener('keydown', (event) => {
        onKeyDown(event, this.cells, this.score);
        this.cells = [...this.cells];
      });
    },
    computed: {
      cellObjects() {
        return this.cells.map((number, index) => ({ number, index }));
      }
    },
    methods: {
      init() {
        let numberOf2 = 2;
        let numberOf0 = (this.size * this.size) - numberOf2;
        let tab = [];
        for (let i = 0; i < numberOf2; i++) {
            tab.push(2);
        }
        for (let i = 0; i < numberOf0; i++) {
            tab.push(0);
        }
        this.cells = shuffle(tab);
      },
    }
}
</script>


<style scoped>
h3 {
  margin: 40px 0 0;
}
a {
  color: #42b983;
}
.grid-container {
  border-radius: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  width: 500px;
  padding: 0;
}
</style>
