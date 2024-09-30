export class Queue<Type> {
  items: Type[];
  constructor() {
    this.items = [];
  }

  public enqueue(element: Type): void {
    this.items.push(element);
  }

  public dequeue(): Type | undefined {
    if (!this.isEmpty()) {
      return this.items.shift();
    }
    return undefined;
  }

  public first(): Type | undefined {
    if (this.isEmpty()) {
      return undefined;
    }
    return this.items[0];
  }

  public last(): Type | undefined {
    if (this.isEmpty()) {
      return undefined;
    }
    return this.items[this.items.length - 1];
  }

  public isEmpty(): boolean {
    return this.items.length === 0;
  }

  public size(): number {
    return this.items.length;
  }
}
