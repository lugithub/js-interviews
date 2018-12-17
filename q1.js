const a = [1, 2, 3, 4, 5];
// Implement this
// a.multiply();
// console.log(a); // [1, 2, 3, 4, 5, 1, 4, 9, 16, 25]

function multiply() {
  const multiplied = this.map(i => i * i);
  this.push(...multiplied);
  return this;
}

Array.prototype.multiply = multiply;
console.log(a.multiply());