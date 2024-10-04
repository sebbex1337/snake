export class Queue {
  head = null;
  tail = null;
  count = 0;

  enqueue(data) {
    const newNode = new Node(data, null);
    // Tjek om køen er tom
    if (this.head === null) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      // Hvis køen ikke er tom, så sæt den nye node til at være den næste node i køen
      this.tail.next = newNode;
      // Opdater halen til at være den nye node
      this.tail = newNode;
    }
    this.count++;
  }

  dequeue() {
    // Hvis køen er tom, så returner null
    if (this.head === null) {
      return null;
    }
    // Fjern hovedet fra køen
    const currentHead = this.head.data;
    // Opdater hovedet til at være den næste node i køen
    this.head = this.head.next;
    // Hvis det nye hovedet er null, så er køen tom, og vi opdaterer halen til at være null
    if (this.head === null) {
      this.tail = null;
    }
    this.count--;
    return currentHead;
  }

  peek() {
    return this.head;
  }

  size() {
    return this.count;
  }

  get(index) {
    // Hvis index er udenfor vores liste, så returner null
    if (index < 0 || index >= this.count) {
      return null;
    }
    // Starter med at kigge på hovedet
    let lookAt = this.head;
    // Itererer igennem listen indtil vi når den ønskede index
    let i = 0;
    while (lookAt !== null) {
      // Hvis vi har nået den ønskede index, så returner dataen
      if (i === index) {
        return lookAt.data;
      }
      // Hvis ikke, så gå til næste node
      lookAt = lookAt.next;
      i++;
    }
    // Hvis vi ikke finder den ønskede index, så returner null
    return null;
  }
}

class Node {
  next = null;
  data = null;

  constructor(data, next) {
    this.data = data;
    this.next = next;
  }
}
