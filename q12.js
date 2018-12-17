const a = {
    key1: Symbol(),
    key2: 10
}
// What will happen?
console.log(JSON.stringify(a));