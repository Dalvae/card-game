//crear una clase stack para la pila de cartas
export class Stack<T> {
  private items: T[];

  constructor(initialItems: T[] = []) {
    this.items = initialItems;
  }

  push(item: T): void {
    this.items.push(item);
  }

  pop(): T | undefined {
    return this.items.pop();
  }

  peek(): T | undefined {
    return this.items[this.items.length - 1];
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }

  size(): number {
    return this.items.length;
  }

  toArray(): T[] {
    return [...this.items];
  }
  setItems(items: T[]): void {
    this.items = items;
  }

  clone(): Stack<T> {
    const clonedStack = new Stack<T>();
    clonedStack.items = [...this.items]; // Shallow copy the items
    return clonedStack;
  }
}
