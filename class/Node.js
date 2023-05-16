class Node {
  constructor(x, y, label, id) {
    this.x = x;
    this.y = y;
    this.label = label;
    this.id = id;
    this.distance = 99999;
  }

  // show outline circle
  show() {
    noFill();
    stroke(COLORS[this.label]);
    circle(this.x, this.y, DIAMETER);
    noStroke();
    fill(COLORS[this.label]);
    textAlign(CENTER, CENTER);
    text(this.id, this.x, this.y);
  }

  // show fill circle
  showFill() {
    noStroke();
    fill(COLORS[this.label]);
    circle(this.x, this.y, HOVERDIAMETER);
    fill("WHITE");
    textAlign(CENTER, CENTER);
    text(this.id, this.x, this.y);
  }

  // show connection line with neighbors
  showConnection(neighbors) {
    stroke(50);
    noFill();
    for (const neighbor of neighbors) {
      line(this.x, this.y, neighbor.x, neighbor.y);
    }
  }

  setXY(x, y) {
    this.x = x;
    this.y = y;
  }

  // function to calculate euclidean distance
  getDistance(node) {
    return dist(this.x, this.y, node.x, node.y);
  }

  // function to populate non-overlapped nodes
  static populate(size) {
    let dataset = [];

    for (let i = 0; i < size; i++) {
      let overlapped = true;
      let limit = 0;
      while (overlapped && limit < MAXLIMIT) {
        let newNode = new Node(
          floor(random(WIDTH)),
          floor(random(HEIGHT)),
          0,
          i + 1
        );
        overlapped = false;
        for (let j = 0; j < i; j++) {
          if (newNode.overlap(dataset[j])) {
            overlapped = true;
            break;
          }
        }
        if (!overlapped) dataset.push(newNode);
        limit++;
      }
    }

    // create patterns and assign labels for 2 labels
    if (noOfLabel === 2) {
      for (const node of dataset) {
        // center
        if (dist(node.x, node.y, WIDTH / 2, HEIGHT / 2) < 150) node.label = 0;
        // outside
        else node.label = 1;
      }
      // create patterns and assign labels for 3 labels
    } else if (noOfLabel === 3) {
      for (const node of dataset) {
        // 0->top left
        if (node.x < WIDTH / 2 && node.y < HEIGHT / 2 + 100) node.label = 0;
        // 1->top right
        else if (node.x > WIDTH / 2 && node.y < HEIGHT / 2 + 100)
          node.label = 1;
        // 2->bottom
        else node.label = 2;
      }
      // create patterns and assign labels for 4 labels
    } else if (noOfLabel === 4) {
      for (const node of dataset) {
        // 0->top left
        if (node.x < WIDTH / 2 && node.y < HEIGHT / 2) node.label = 0;
        // 1->top right
        else if (node.x > WIDTH / 2 && node.y < HEIGHT / 2) node.label = 1;
        // 2->bottom right
        else if (node.x > WIDTH / 2 && node.y > HEIGHT / 2) node.label = 2;
        // 3->bottom left
        else if (node.x < WIDTH / 2 && node.y > HEIGHT / 2) node.label = 3;
      }
    }

    return [...dataset];
  }

  // function to check if two nodes overlap
  overlap(node) {
    if (dist(this.x, this.y, node.x, node.y) < HOVERDIAMETER) return true;
    return false;
  }
}
