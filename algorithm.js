let dataset = {};
let labels = {};
let testNode = [220, 80];
const K = 5;
const SIZE = 30;
const WIDTH = 500;
const HEIGHT = 500;

// populate dataset
for (let i = 0; i < SIZE; i++) {
  dataset[`n${i}`] = [Math.random() * WIDTH, Math.random() * HEIGHT];
}

// assign labels
for (let key in dataset) {
  if (dataset[key][0] > WIDTH / 2) labels[key] = 1;
  else labels[key] = 0;
}

function euclideanDistance(node1, node2) {
  let total = 0;
  for (let i = 0; i < node1.length; i++) {
    total += Math.pow(node1[i] - node2[i], 2);
  }
  return Math.sqrt(total);
}

function classify(testNode, dataset, labels, k) {
  let distances = [];

  // calculate all the distances between neighbors and testNode
  for (let key in dataset) {
    let dist = euclideanDistance(dataset[key], testNode);
    distances.push([dist, key]);
  }

  // sort all the distances between neighbors and testNode
  distances.sort((a, b) => a[0] - b[0]);

  // take only the k closest points
  let neighbors = distances.slice(0, k);

  let label0 = 0;
  let label1 = 0;

  // calculate no of each labels around k neighbors
  neighbors.forEach((neighbor) => {
    let key = neighbor[1];
    if (labels[key] === 0) label0 += 1;
    else if (labels[key] === 1) label1 += 1;
  });

  // testNode will be classified as the label that has maximum no of counts
  if (label1 > label0) return 1;
  else return 0;
}

// console.log(dataset);
// console.log(labels);
console.log(classify(testNode, dataset, labels, K));
