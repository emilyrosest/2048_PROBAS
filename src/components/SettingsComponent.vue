<template>
    <div>
      <h3>Jouer au 2048 de base ?</h3>
      <div>
        <button @click="setBase2048(true)">Oui</button>
      </div>
      <h3>Jouer au 2048 Aléatoire ?</h3>
      <div>
        <button @click="setRandom(true)">Oui</button>
      </div>
      <div v-if="random">
        <p>Choisir un paramètre : </p>
        <button :class="{ active: selectedProba === 'option1' }" @click="setProba('option1')">0.1</button>
        <button :class="{ active: selectedProba === 'option2' }" @click="setProba('option2')">0.2</button>
        <button :class="{ active: selectedProba === 'option3' }" @click="setProba('option3')">0.3</button>
      </div>
    </div>
  </template>
  
  <script>
  import {colorOrNotColor, whichPow, whichSize} from '@/services/probas.js';
  
  export default {
    name: "SettingssComponent",
    data() {
      return {
        random: false,
      }
    },
    methods: {
      setBase2048(value) {
        if (value) {
          this.$emit('colorsChosen', 1); 
          this.$emit('powChosen', 2);
          this.$emit('sizeChosen', 4);
        } 
        this.$emit('start', 1);
      },
      setRandom(value) {
        if (value) {
            const colors = colorOrNotColor();
            this.$emit('colorsChosen', colors);

            const pow = whichPow();
            this.$emit('powChosen', pow); 
        }
        this.random = true;
      },
      setProba(value) {
        const size = whichSize(value);
        this.$emit('sizeChosen', size);
        this.$emit('start', 1);
      }
    }
  }
  </script>


<style scoped>

</style>
