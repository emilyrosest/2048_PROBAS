<template>
    <div>
      <h2>Jouer avec des couleurs ?</h2>
      <div>
        <button @click="setColors(true)">Oui</button>
        <button @click="setColors(false)">Aléatoire</button>
      </div>
      <h2>Jouer avec 2 en puissance ?</h2>
      <div>
      <button @click="setPow(true)">Oui</button>
      <button @click="setPow(false)">Aléatoire</button>
    </div>
    <h3>Jouer ?</h3>
    <div>
    <button @click="setStart()">Oui</button>
</div>
    </div>
  </template>
  
  <script>
  import {colorOrNotColor, whichPow} from '@/services/probas.js';
  
  export default {
    name: "SettingssComponent",
    methods: {
      setColors(value) {
        if (value) {
          this.$emit('colorsChosen', 1); 
        } else {
          const colors = colorOrNotColor();
          this.$emit('colorsChosen', colors); 
        }
      },
      setPow(value) {
        if (value) {
            this.$emit('powChosen', 2);
        }
        else {
          const pow = whichPow();
          this.$emit('powChosen', pow); 
        }
      },
      setStart() {
        this.$emit('start', 1);
      }
    }
  }
  </script>


<style scoped>

</style>
