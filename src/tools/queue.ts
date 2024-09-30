export class Queue {
  items: any[];
  constructor() {
    this.items = [];
  }

  enqueue(element: any) {
    this.items.push(element);
  }

  dequeue() {
    if (this.isEmpty()) {
      return "La cola está vacía";
    }
    return this.items.shift();
  }

  front() {
    if (this.isEmpty()) {
      return "La cola está vacía";
    }
    return this.items[0];
  }

  back() {
    if (this.isEmpty()) {
      return "La cola está vacía";
    }
    return this.items[this.items.length - 1];
  }

  isEmpty() {
    return this.items.length === 0;
  }

  size() {
    return this.items.length;
  }
}
