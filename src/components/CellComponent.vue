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
        if (this.colors) {
          const hue = 180; // Aqua
          const saturation = "100%";
          const lightness = 50 + (this.number)*0.2; // Variation de luminosité en fonction du nombre

          return {
            backgroundColor: `hsl(${hue}, ${saturation}, ${lightness}%)`
          };
        } else {
          return {};
        }
      }
    },
    methods: {
      getCellClasses() {
        return {
          cell: true,
          color: this.colors
        };
      },
      getCellColor(number) {
      if (this.colors) {
        // Calcul de la couleur basée sur le nombre
        const hue = number * 30 % 360; // Variation de teinte en fonction du nombre
        const saturation = "100%"; // Saturation maximale
        const lightness = "50%"; // Luminosité fixe

        return `hsl(${hue}, ${saturation}, ${lightness})`;
      } else {
        // Pas de couleur si colors est false
        return "";
      }
    },
    },
    created() {
      if (this.colors) {
        this.$el.style.background = 'aqua';
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
    background: transparent;
  }
  </style>