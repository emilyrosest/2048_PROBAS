<template>
    <div :class="getCellClasses()" :style="cellColor">
      {{ number || '' }}
    </div>
  </template>
  
  <script>
  export default {
    name: 'CellComponent',
    props: {
      number: {
        default: null
      },
      colors: {
        type: Boolean,
        default: true
      }
    },
    computed: {
      cellColor() {
        return this.colors ? this.$parent.getCellColor(this.number) : {};
      }
    },
    methods: {
      getCellClasses() {
        return {
          cell: true,
          color: this.colors
        };
      }
    },
    created() {
      if (this.colors) {
        this.$el.style.backgroundColor = this.cellColor.backgroundColor;
      }
    },
    watch: {
      cellColor(newColor) {
        this.$el.style.backgroundColor = newColor.backgroundColor;
      }
    }
  };
  </script>
  
  <style scoped>
  .cell {
    border-style: solid;
    border-radius: 6px;
    width: 100px;
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
  }
  
  .color {
    background-color: transparent;
  }
  </style>