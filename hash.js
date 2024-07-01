class LinkedList {
  constructor() {
    this.head = null;
  }
  prepend(key, value) {
    let prevHead = this.head;
    this.head = new Node(key, value);
    this.head.next = prevHead;
  }
  size() {
    let temp = this.head;
    let size = 0;
    while (temp != null) {
      temp = temp.next;
      size++;
    }
    return size;
  }
  at(index) {
    let temp = this.head;
    let i = 0;
    while (temp != null && i != index) {
      temp = temp.next;
      i++;
    }
    if (i == index) return temp;
    else return undefined;
  }
  contains(key) {
    let temp = this.head;
    while (temp != null) {
      if (temp["key"] == key) return true;
      temp = temp.next;
    }
    return false;
  }
  find(key) {
    let temp = this.head;
    let i = 0;
    while (temp != null) {
      if (temp["key"] == key) return i;
      temp = temp.next;
      i++;
    }
    return null;
  }
  getHead() {
    return this.head;
  }
  getNode(key) {
    let temp = this.head;
    while (temp != null) {
      if (temp["key"] == key) return temp;
      temp = temp.next;
    }
    return null;
  }
  insertAt(value, index) {
    let p = this.head;
    let r = p.next;
    let i = 1;
    if (index == 0) {
      let prevHead = this.head;
      this.head = new Node(value);
      this.head.next = prevHead;
    }
    while (r != null && i != index) {
      p = r;
      r = p.next;
      i++;
    }
    if (i == index) {
      p.next = new Node(value);
      p.next.next = r;
    } else return;
  }
  removeAt(index) {
    let p = this.head;
    let r = p.next;
    let i = 1;
    if (index == 0) {
      this.head = this.head.next;
    }
    while (r != null && i != index) {
      p = r;
      r = p.next;
      i++;
    }
    if (i == index) {
      p.next = r.next;
    } else return;
  }
}
class Node {
  constructor(key, value, next) {
    this["key"] = key || null;
    this["value"] = value || null;
    this.next = next || null;
  }
}

class HashMap {
  constructor(size = 16, loadFactor = 0.75) {
    this.capacity = size;
    this.buckets = new Array(this.capacity)
      .fill(null)
      .map(() => new LinkedList());

    this.loadFactor = loadFactor;
    this.long = 0; //num of keys
    this.growthAlert = this.capacity * loadFactor;
  }
  hash(key) {
    let hashCode = 0;
    let primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
      //or you could have used modulo here instead
    }

    return hashCode;
  }
  set(key, value) {
    let index = this.hash(key) % this.capacity;
    if (index < 0 || index >= this.buckets.length) {
      throw new Error("Trying to access index out of bound");
    }
    if (this.buckets[index].contains(key)) {
      this.buckets[index].getNode(key)["value"] = value;
    } else {
      this.buckets[index].prepend(key, value);
      this.long++;
      this.grow();
    }
  }
  grow() {
    if (this.growthAlert < this.length()) {
      this.capacity *= 2;
      this.growthAlert = this.capacity * this.loadFactor;
      let newBuckets = new Array(this.capacity)
        .fill(null)
        .map(() => new LinkedList());
      for (let i = 0; i < this.buckets.length; i++) {
        let node = this.buckets[i].head;
        while (node) {
          let newIndex = this.hash(node["key"]) % this.capacity;
          newBuckets[newIndex].prepend(node["key"], node["value"]);
          node = node.next;
        }
      }
      this.buckets = newBuckets;
    }
  }
  get(key) {
    let index = this.hash(key) % this.capacity;
    if (index < 0 || index >= this.buckets.length) {
      throw new Error("Trying to access index out of bound");
    }
    if (this.buckets[index].contains(key)) {
      return this.buckets[index].getNode(key)["value"];
    } else {
      return null;
    }
  }

  arrayLength() {
    return this.buckets.length;
  }
  has(key) {
    let index = this.hash(key) % this.capacity;
    if (index < 0 || index >= this.buckets.length) {
      throw new Error("Trying to access index out of bound");
    }
    if (this.buckets[index].contains(key)) {
      return true;
    } else {
      return false;
    }
  }
  remove(key) {
    let index = this.hash(key) % this.capacity;
    if (index < 0 || index >= this.buckets.length) {
      throw new Error("Trying to access index out of bound");
    }
    if (this.buckets[index].contains(key)) {
      let i = this.buckets[index].find(key);
      this.buckets[index].removeAt(i);
      this.long--;
      return true;
    } else {
      return false;
    }
  }
  length() {
    return this.long;
  }
  clear() {
    for (let i = 0; i < this.buckets.length; i++) {
      while (this.buckets[i].size() != 0) {
        this.buckets[i].removeAt(0);
      }
    }
    this.long = 0;
  }
  keys() {
    let arr = [];
    for (let i = 0; i < this.buckets.length; i++) {
      let currNode = this.buckets[i].head;
      while (currNode != null) {
        arr.push(currNode["key"]);
        currNode = currNode.next;
      }
    }
    return arr;
  }
  values() {
    let arr = [];
    for (let i = 0; i < this.buckets.length; i++) {
      let currNode = this.buckets[i].head;
      while (currNode != null) {
        arr.push(currNode["value"]);
        currNode = currNode.next;
      }
    }
    return arr;
  }
  entries() {
    let arr = [];

    for (let i = 0; i < this.buckets.length; i++) {
      let currNode = this.buckets[i].head;
      while (currNode != null) {
        let subArr = [];
        subArr.push(currNode["key"]);
        subArr.push(currNode["value"]);
        arr.push(subArr);
        currNode = currNode.next;
      }
    }
    return arr;
  }
}

module.exports = HashMap;
