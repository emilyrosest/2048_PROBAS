function colorOrNotColor() {
  // Loi de Bernoulli
  return Math.random() < 1 / 2 ? 0 : 1;
}

function whichPow() {
  // Loi uniforme
  let pow = 0;
  let result = Math.random();
  if (result < 0.25)
      pow = 2;
  if (result >= 0.25 && result < 0.5)
      pow = 3;
  if (result >= 0.5 && result < 0.75)
      pow = 5;
  if (result >= 0.75)
      pow = 10;
  return pow;
}

function whichSize(probability) {
  //Loi géométrique
  let count = 0;
  while (Math.random() >= probability) {
    count++;
  }

  if (count < 7) {
    return 4;
  } else if (count >=7 && count < 9) {
    return 5;
  } else {
    return 3; 
  }
}

function generateRandomTileTime(pow, gameTime) {
  //Loi exmponentielle
  const lambda = 1.0;

  const probability = lambda * Math.exp(-lambda * gameTime);

  if (Math.random() < probability) {
    return generateRandomTile(pow * Math.pow(2, 9));
  } else {
    return generateRandomTile(pow);
  }
}

function generateRandomTile(pow) {
  //Loi de Poisson
  const lambda = 1;

  const tileOptions = [
    { value: pow, probability: poissonProbability(lambda, 0) },
    { value: 2 * pow, probability: poissonProbability(lambda, 1) },
    { value: 4 * pow, probability: poissonProbability(lambda, 2) }
  ];

  let totalProbability = 0;
  for (const tile of tileOptions) {
    totalProbability += tile.probability;
  }

  let randomNumber = Math.random() * totalProbability;
  let cumulativeProbability = 0;

  for (const tile of tileOptions) {
    cumulativeProbability += tile.probability;
    if (randomNumber <= cumulativeProbability) {
      return tile.value;
    }
  }

  return 2 * pow;
}

function poissonProbability(lambda, k) {
  const numerator = Math.pow(lambda, k) * Math.exp(-lambda);
  const denominator = factorial(k);
  return numerator / denominator;
}

function factorial(n) {
  if (n === 0 || n === 1) {
    return 1;
  }
  return n * factorial(n - 1);
}

function generateRandomTileTime2048(pow, gameTime) {
  //Loi normale
  const mean = 100; 
  const standardDeviation = 20;

  const probability = normalDistribution(gameTime, mean, standardDeviation);

  if (Math.random() < probability) {
    return generateRandomTile(pow * Math.pow(2, 9));
  } else {
    return generateRandomTile(pow);
  }
}

function normalDistribution(x, mean, standardDeviation) {
  const exponent = -((x - mean) ** 2) / (2 * standardDeviation ** 2);
  const coefficient = 1 / (Math.sqrt(2 * Math.PI) * standardDeviation);
  return coefficient * Math.exp(exponent);
}


const markovChain = [
  [0.6, 0.3, 0.1], 
  [0.1, 0.5, 0.4],   
  [0.1, 0.2, 0.7]   
];

function generateRandomTileMarkov(pow, currentState) {
  // Chaîne de Markov
  const stateIndex = (currentState / pow); 
  let markovIndex = 0;
  if (stateIndex == 2) {
    markovIndex = 1;
  }
  if (stateIndex == 4) {
    markovIndex = 2;
  }

  const transitionProbabilities = markovChain[markovIndex];
  const nextStateIndex = selectNextState(transitionProbabilities);
  const nextState = Math.pow(2, nextStateIndex) * pow; 

  return nextState;
}

function selectNextState(transitionProbabilities) {
  const randomNumber = Math.random();
  let cumulativeProbability = 0;

  for (let nextState = 0; nextState < 3; nextState++) {
    cumulativeProbability += transitionProbabilities[nextState];
    if (randomNumber <= cumulativeProbability) {
      return nextState;
    }
  }
  return 0; 
}

function collectMarkovStatistics() {
  const markovStats = {};

  for (let stateIndex = 0; stateIndex < markovChain.length; stateIndex++) {
    const transitionProbabilities = markovChain[stateIndex];
    const sumProbabilities = transitionProbabilities.reduce((sum, prob) => sum + prob, 0);
    const currentState = Math.pow(2, stateIndex + 1);
    markovStats[currentState] = sumProbabilities;
  }

  return markovStats;
}


function displayMarkovStatistics() {
  const markovStats = collectMarkovStatistics();

  console.log('Markov Chain Statistics:');
  for (const state in markovStats) {
    console.log(`State ${state}: Sum of Outgoing Probabilities = ${markovStats[state]}`);
  }
}


export { colorOrNotColor, whichPow, whichSize, generateRandomTile, generateRandomTileTime, generateRandomTileTime2048, generateRandomTileMarkov, collectMarkovStatistics, displayMarkovStatistics };
