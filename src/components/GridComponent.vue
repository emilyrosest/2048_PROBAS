<template>
  <div>
  <p v-if="colors == true">With colors</p>
  <p v-if="colors == false">Without colors</p>
  <p>Number : {{ pow }}</p>
  <p>Size : {{size}}</p>
  <p>GameTime : {{gameTime}}</p>
  <div class="grid-container">
    <CellComponent :number="cell.number" v-for="(cell, index) in cellObjects" :key="index" :colors="colors"/>
  </div>
  <p>Added Tile : {{ addedTile }}</p>
  <p>Game State : {{ gameState }}</p>
  </div>
</template>

<script>
import CellComponent from './CellComponent.vue';
import {ArrowDown, ArrowLeft, ArrowRight, ArrowUp, checkTurns, shuffle} from '@/services/game.js';
import {generateRandomTileTime, generateRandomTileTime2048, generateRandomTileMarkov} from '@/services/probas.js';

export default {
  name: "GridComponent",
  props: {
    size: {
      type: Number,
      default: 4,
    },
    colors: {
      type: Boolean,
      default: false,
    },
    pow: {
      type: Number,
    }
  },
  components: {CellComponent},
  emits: ['gameOver'],
  data() {
    return {
      cells: [],
      score: 0,
      filledCellAtInit: 2,
      gameOver: false,
      gameTime: 0,
      currentState: 2,
      addedTile: null,
      gameState: null,
    };
  },
  created() {
    this.init();
    this.currentState = this.pow;
    window.addEventListener('keydown', (event) => {
      this.onKeyDown(event, this.cells, this.score);
      this.cells = [...this.cells];
    });

    setInterval(() => {
      this.gameTime++;
    }, 1000);
  },
  computed: {
    cellObjects() {
      return this.cells.map((number, index) => ({number, index}));
    },
  },
  methods: {
    init() {
      let numberOfEmpty = (16) - this.filledCellAtInit;
      console.log(this.pow);
      let tempCells = [];
      for (let i = 0; i < this.filledCellAtInit; i++) tempCells.push(this.pow);
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
        else if (cell === (this.pow * Math.pow(2, 10))) {
          this.gameState = 3;
        }
        else if (cell === (this.pow * Math.pow(2, 8))) {
          this.gameState = 2;
        } else {
          this.gameState = 1;
        }
      });

      if (emptyCells.length > 0) {
        let index = shuffle(emptyCells)[0];

        if (this.gameState === 3) {
          this.cells[index] = generateRandomTileTime2048(this.pow, this.gameTime);
        } else if (this.gameState === 2){
          this.cells[index] = generateRandomTileTime(this.pow, this.gameTime);
        } else {
          this.cells[index] = generateRandomTileMarkov(this.pow, this.currentState);
        }

        this.currentState = this.cells[index];  
        this.addedTile = this.cells[index];

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
