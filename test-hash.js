const HashMap = require("./hash.js");
const test = new HashMap(16, 0.75);

test.set("apple", "red");
test.set("banana", "yellow");
test.set("carrot", "orange");
test.set("dog", "brown");
test.set("elephant", "gray");
test.set("frog", "green");
test.set("grape", "purple");
test.set("hat", "black");
test.set("ice cream", "white");
test.set("jacket", "blue");
test.set("kite", "pink");
test.set("lion", "golden");

//test.set("lion", "idk");
//console.log("::::", test.get("lion"));
//test.remove("lion");
//test.set("popo", "idk");
//console.log(test.has("lion"));
//console.log(test.has("skidpops"));
//console.log(test.length());
//console.log(test.keys());
//console.log(test.values());
//test.clear();
test.buckets.forEach((bucket) => console.log(bucket));
console.log(":::::::", test.capacity);

test.set("popo", "idk");
console.log(":::::::", test.capacity);
test.set("monkey", "white");

test.set("whale", "blue");
test.set("snake", "pink");
test.set("baby", "golden");
console.log(":::::::", test.get("baby"));
console.log(":::::::", test.has("lion"));
console.log(":::::::", test.has("baby"));
test.remove("baby");
console.log(":::::::", test.get("baby"));

test.buckets.forEach((bucket) => console.log(bucket));

console.log(":::::::", test.growthAlert);
console.log(":::::::", test.length());
