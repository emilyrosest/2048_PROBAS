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
        <p><b>Avec 0.1 : </b></p>
        <p>probabilité d'avoir 4 = {{Proba4for01}}</p>
        <p>probabilité d'avoir 5 = {{Proba5for01}}</p>
        <p><b>Avec 0.2 : </b></p>
        <p>probabilité d'avoir 4 = {{Proba4for02}}</p>
        <p>probabilité d'avoir 5 = {{Proba5for02}}</p>
        <p><b>Avec 0.3 : </b></p>
        <p>probabilité d'avoir 4 = {{Proba4for03}}</p>
        <p>probabilité d'avoir 5 = {{Proba5for03}}</p>
      </div>
    </div>
  </template>
  
  <script>
  import {colorOrNotColor, whichPow, whichSize, calculateProbability} from '@/services/probas.js';
  
  export default {
    name: "SettingssComponent",
    data() {
      return {
        random: false,
        Proba5for01: null,
        Proba4for01: null,
        Proba5for02: null,
        Proba4for02: null,
        Proba5for03: null,
        Proba4for03: null,
      }
    },
    created() {
      this.Proba5for01 = calculateProbability(0.1);
      this.Proba4for01 = 1 - this.Proba5for01;
      this.Proba5for02 = calculateProbability(0.2);
      this.Proba4for02 = 1 - this.Proba5for02;
      this.Proba5for03 = calculateProbability(0.3);
      this.Proba4for03 = 1 - this.Proba5for03;
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
      },
    }
  }
  </script>


<style scoped>

</style>
