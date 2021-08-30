const w = document.body.clientWidth * .9
const gap = w / 80

const page = document.getElementById('BST')



class Node {
  constructor(value, level, parent, parentSide, loc) {
    this.value = value;
    this.loc = loc;
    this.level = level;
    this.parent = parent;
    this.parentSide = parentSide
    this.left = null;
    this.right = null;
  }
}
class BinarySearchTree {
  constructor() {
    this.root = null;
  }
  baseAddNewNode(value) {
    if (this.root && this.root.value === value) {
      return this
    } else {
      const newNode = document.createElement("button");
      newNode.setAttribute("class", ` node node-${value}`);
      newNode.innerText = value;
      newNode.onclick = this.deletNode.bind(this, [newNode, value])
      page.appendChild(newNode)
      //   availableNums[value + 100]=null;
      if (this.root === null) {
        this.root = new Node(value, 1, null, "", [0, w / 2 - 12.5])
        newNode.style.top = "0px";
        newNode.style.left = `${w / 2 - 10}px`;
        return this.root
      } else {
        let currNode = this.root
        let level = 1
        while (currNode) {
          if (currNode.value === value) return
          if (currNode.value < value) {
            if (currNode.right === null) {
              const newLevel = level + 1
              const numberOfGap = (128 / Math.pow(2, level + 1)) / 2
              const left = currNode.loc[1] + (numberOfGap * gap)
              const top = currNode.loc[0] + 40
              const rightLine = document.createElement("div")
              rightLine.setAttribute("class", "line right" + ` ${value}`);
              rightLine.style.top = `${currNode.loc[0]+8}px`;
              rightLine.style.width = `${numberOfGap * gap}px`;
              rightLine.style.left = `${currNode.loc[1]+15}px`;
              rightLine.style.height = "45px"
              page.appendChild(rightLine)
              currNode.right = new Node(value, newLevel, currNode, "right", [top, left])
              newNode.style.top = `${top}px`;
              newNode.style.left = `${left}px`;
              return this
            } else {
              currNode = currNode.right
              level++
            }
          } else if (currNode.value > value) {

          }
        }
      }
    }
  }
}


const tree = new BinarySearchTree()
tree.root = tree.baseAddNewNode(60)
