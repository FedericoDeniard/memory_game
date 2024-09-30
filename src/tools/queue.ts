export class Queue<Type> {
  items: Type[];
  constructor() {
    this.items = [];
  }

  public enqueue(element: Type): void {
    this.items.push(element);
  }

  public dequeue(): void {
    if (!this.isEmpty()) {
      this.items.shift();
    }
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
