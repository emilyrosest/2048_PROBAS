<template>
    <div>
      <h3>Statistiques de la Chaîne de Markov</h3>
      <p>Probabilité de changer d'état : {{ sumOutgoingProbabilities }}</p>
      <p>Probabilité moyenne de transition : {{ averageProbability }}</p>
      <p>Ecart par rapport à la probabilité moyenne : {{ averageDeviation }}</p>
    </div>
  </template>
  
  <script>
  export default {
    name: "StatsComponent",
    props: {
      pow: {
        type: Number,
      },
    },
    data() {
      return {
        markovChain: null,
        sumOutgoingProbabilities: null,
        averageProbability: null,
        averageDeviation: null,
      };
    },
    created() {
      this.init();
      this.calculs();
    },
    methods: {
      init() {
        this.markovChain = [
          [0.6, 0.3, 0.1],
          [0.1, 0.5, 0.4],
          [0.1, 0.2, 0.7],
        ];
      },
      calculs() {
        let totalProbability = 0;
        let totalDeviation = 0;
        let numTransitions = 0;
  
        for (let i = 0; i < this.markovChain.length; i++) {
          const transitionProbabilities = this.markovChain[i];
          for (let j = 0; j < transitionProbabilities.length; j++) {
            totalProbability += transitionProbabilities[j];
            const deviation = Math.abs(
              transitionProbabilities[j] - this.averageProbability
            );
            totalDeviation += deviation;
            numTransitions++;
          }
        }
  
        this.sumOutgoingProbabilities = totalProbability / this.markovChain.length;
        this.averageProbability = totalProbability / numTransitions;
        this.averageDeviation = totalDeviation / numTransitions;
      },
    },
  };
  </script>
  