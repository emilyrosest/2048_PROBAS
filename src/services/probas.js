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

function generateRandomTileTime(pow, gameTime) {
  const lambda = 1.0;

  const probability = lambda * Math.exp(-lambda * gameTime);

  if (Math.random() < probability) {
    return generateRandomTile(pow);
  } else {
    return null;
  }
}

function generateRandomTile(pow) {
  const lambda = 1;

  const tileOptions = [
    { value: 2 * pow, probability: poissonProbability(lambda, 0) },
    { value: 4 * pow, probability: poissonProbability(lambda, 1) },
    { value: 8 * pow, probability: poissonProbability(lambda, 2) }
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

function calculateScoreTime(gameTime) {
  const mu0 = 10.0; // Moyenne initiale de la distribution normale
  const sigma0 = 2.0; // Écart type initial de la distribution normale
  const timeFactor = 0.1; // Facteur d'ajustement du temps de jeu

  // Calcul d'un score aléatoire en fonction du temps de jeu
  const mu = mu0 + timeFactor * gameTime; // Nouvelle moyenne en fonction du temps de jeu
  const sigma = sigma0; // Écart type inchangé

  const score = Math.round(mu + sigma * generateRandomNormal());

  return score;
}

// Fonction pour générer un nombre aléatoire selon une distribution normale standard (moyenne 0, écart type 1)
function generateRandomNormal() {
  let u = 0.0;
  let v = 0.0;
  let w = 0.0;

  do {
    u = Math.random() * 2 - 1;
    v = Math.random() * 2 - 1;
    w = u * u + v * v;
  } while (w === 0 || w >= 1);

  const factor = Math.sqrt((-2 * Math.log(w)) / w);

  return u * factor;
}

export { colorOrNotColor, whichPow, generateRandomTile, generateRandomTileTime, calculateScoreTime };
