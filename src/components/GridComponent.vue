<template>
  <div class="grid-container">
    <CellComponent :number="cell.number" v-for="(cell, index) in cellObjects" :key="index"/>
  </div>
</template>

<script>
import CellComponent from './CellComponent.vue';
import {ArrowDown, ArrowLeft, ArrowRight, ArrowUp, checkTurns, shuffle} from '@/services/game.js';

export default {
  name: "GridComponent",
  props: {
    size: {
      type: Number,
      default: 4
    }
  },
  components: {CellComponent},
  emits: ['gameOver'],
  data() {
    return {
      cells: [],
      score: 0,
      filledCellAtInit: 2,
      gameOver: false
    };
  },
  created() {
    this.init();
    window.addEventListener('keydown', (event) => {
      this.onKeyDown(event, this.cells, this.score);
      this.cells = [...this.cells];
    });
  },
  computed: {
    cellObjects() {
      return this.cells.map((number, index) => ({number, index}));
    }
  },
  methods: {
    init() {
      let numberOfEmpty = (this.size * this.size) - this.filledCellAtInit;

      let tempCells = [];
      for (let i = 0; i < this.filledCellAtInit; i++) tempCells.push(2);
      for (let i = 0; i < numberOfEmpty; i++) tempCells.push(0);

      this.cells = shuffle(tempCells);
    },

    onKeyDown(e, cells, score) {
      const arrowsNameAndEvents = [
        {'key': 'ArrowLeft', 'event': ArrowLeft},
        {'key': 'ArrowRight', 'event': ArrowRight},
        {'key': 'ArrowDown', 'event': ArrowDown},
        {'key': 'ArrowUp', 'event': ArrowUp},
      ];

      arrowsNameAndEvents.forEach((arrow) => {
        if (e.code.includes(arrow.key)) {
          let cellsBeforeChanges = [...this.cells]

          let array = [];
          for (let k = 1; k <= 4; k++) {
            arrow.event(cells, score, k, array)
          }

          // The JSON stringify is used to compare both arrays !
          if (JSON.stringify(cellsBeforeChanges) !== JSON.stringify([...this.cells]))
            this.addCells(cells);
        }
      })
    },

    addCells() {
      let emptyCells = [];
      this.cells.forEach((cell, index) => {
        if (cell === 0) emptyCells.push(index);
      });

      if (emptyCells.length > 0) {
        let index = shuffle(emptyCells)[0];
        this.cells[index] = 2;
        return;
      }

      this.checkRemainingTurn();
    },

    checkRemainingTurn() {
      let turnLeft = false;
      for (let i = 0; i < 16; i++) {
        if (checkTurns(this.cells, i)) {
          turnLeft = true;
          break;
        }
      }
      if (!turnLeft)
        this.$emit('gameOver', true);
    }
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
