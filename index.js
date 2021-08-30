//Binary search tree

const w = document.body.clientWidth * .9
const gap = w / 80

const page = document.getElementById('BST')
const style = document.createElement('style');
document.getElementsByTagName('head')[0].appendChild(style);


let nodeExistMap = {}

function creatAvailableArr() {
  let i = -100
  while (i < 101) {
    nodeExistMap[i] = false
    i++
  }
}
creatAvailableArr()

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
    this.nodeClicked = false
  }
  baseAddNewNode(value) {
    if (!nodeExistMap[value]) {
      nodeExistMap[value] = true
      if (this.root && this.root.value === value) {
        return this
      } else {
        const newNode = document.createElement("button");
        newNode.setAttribute("class", ` node node-${value}`);
        newNode.innerText = value;
        newNode.onclick = this.deletNode.bind(this, [newNode, value])
        page.appendChild(newNode)
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
              if (currNode.left === null) {
                const newLevel = level + 1
                const numberOfGap = (128 / Math.pow(2, level + 1)) / 2
                const left = currNode.loc[1] - (numberOfGap * gap)
                const top = currNode.loc[0] + 40

                const leftLine = document.createElement("div")
                leftLine.setAttribute("class", "line left" + ` ${value}`);
                leftLine.style.top = `${currNode.loc[0]+8}px`;
                leftLine.style.width = `${(numberOfGap * gap)}px`;
                leftLine.style.left = `${currNode.loc[1]-((numberOfGap * gap))}px`;
                leftLine.style.height = "45px"
                page.appendChild(leftLine)

                currNode.left = new Node(value, level + 1, currNode, "left", [top, left])
                newNode.style.top = `${top}px`;
                newNode.style.left = `${left-5}px`;
                return this
              } else {
                currNode = currNode.left
                level++
              }
            }
          }
        }
      }
    }
  }
  animateAddNewNode(value) {
    if (!nodeExistMap[value]) {
      nodeExistMap[value] = true

      let traversalNodes = [
        [0, 0]
      ]
      if (this.root && this.root.value === value) {
        return this
      } else {
        const newNode = document.createElement("button");
        newNode.setAttribute("class", ` node node-${value}`);
        newNode.innerText = value;
        newNode.onclick = this.deletNode.bind(this, [newNode, value, ])
        page.appendChild(newNode)

        let currNode = this.root
        let level = 1

        while (currNode) {

          if (currNode.value === value) return
          if (currNode.value < value) {
            traversalNodes.push(currNode.loc)
            if (currNode.right === null) {
              const newLevel = level + 1
              const numberOfGap = (128 / Math.pow(2, newLevel)) / 2
              const left = currNode.loc[1] + (numberOfGap * gap)
              const top = currNode.loc[0] + 40
              traversalNodes.push([top, left])

              let keyFrames = `
            @keyframes frame${value} {
           
              `
              let addsOn = `
            0% {
              background - color: red;
              left: 0 px;
              top: 0 px;
              color:#16A1FF;
            }
            `
              const nodeToTravel = traversalNodes.length
              const percentage = 100 / (nodeToTravel - 1)
              let completed = percentage

              for (let i = 1; i < nodeToTravel; i++) {
                i + 1 === nodeToTravel ?
                  addsOn += ` 
                100% {
                    left:${traversalNodes[i][1]}px;
                    top:${traversalNodes[i][0]}px;
                    background-color:${i+1===nodeToTravel?"16a144":"#16A1FF"};
                }` :
                  addsOn += ` 
            ${completed}% {
                left:${traversalNodes[i][1]}px;
                top:${traversalNodes[i][0]}px;
                background-color:${i+1===nodeToTravel?"16a144":"#16A1FF"};
            }`
                completed += percentage
              }
              keyFrames += addsOn + "}"
              style.innerHTML += keyFrames
              newNode.style.animationName = `frame${value}`;
              setTimeout(function () {
                const rightLine = document.createElement("div")
                rightLine.setAttribute("class", "line right" + ` ${value}`);
                rightLine.style.top = `${currNode.loc[0]+8}px`;
                rightLine.style.width = `${numberOfGap * gap}px`;
                rightLine.style.left = `${currNode.loc[1]+15}px`;
                rightLine.style.height = "45px"
                page.appendChild(rightLine)
              }, 4000)

              currNode.right = new Node(value, newLevel, currNode, "right", [top, left])

              return this
            } else {
              currNode = currNode.right
              level++
            }
          } else if (currNode.value > value) {
            traversalNodes.push(currNode.loc)
            if (currNode.left === null) {
              const newLevel = level + 1
              const numberOfGap = (128 / Math.pow(2, newLevel)) / 2
              const left = currNode.loc[1] - (numberOfGap * gap)
              const top = currNode.loc[0] + 40

              traversalNodes.push([top, left])
              let keyFrames = `
            @keyframes frame${value} {
              `
              let addsOn = `
            0% {
              background - color: red;
              left: 0 px;
              top: 0 px;
              color:#16A1FF;
            }
            `
              const nodeToTravel = traversalNodes.length
              const percentage = 100 / (nodeToTravel - 1)
              let completed = percentage

              for (let i = 1; i < nodeToTravel; i++) {

                i + 1 === nodeToTravel ?
                  addsOn += ` 
              100% {
                  left:${traversalNodes[i][1]}px;
                  top:${traversalNodes[i][0]}px;
                  background-color:${i+1===nodeToTravel?"16a144":"#16A1FF"};
              }` :
                  addsOn += ` 
              ${completed}% {
                  left:${traversalNodes[i][1]}px;
                  top:${traversalNodes[i][0]}px;
                  background-color:${i+1===nodeToTravel?"16a144":"#16A1FF"};
              }`
                completed += percentage
              }
              keyFrames += addsOn + "}"
              style.innerHTML += keyFrames
              newNode.style.animationName = `frame${value}`;
              setTimeout(function () {
                const leftLine = document.createElement("div")
                leftLine.setAttribute("class", "line left" + ` ${value}`);
                leftLine.style.top = `${currNode.loc[0]+8}px`;
                leftLine.style.width = `${(numberOfGap * gap)}px`;
                leftLine.style.left = `${currNode.loc[1]-((numberOfGap * gap))}px`;
                leftLine.style.height = "45px"
                page.appendChild(leftLine)
              }, 4000)
              currNode.left = new Node(value, level + 1, currNode, "left", [top, left])
              return this
            } else {
              currNode = currNode.left
              level++
            }
          }
        }
      }
    }
  }
  delete(nodeToDelet, elementToDelet, value) {

    if (!nodeToDelet.left && !nodeToDelet.right) {
      nodeToDelet.parent[nodeToDelet.parentSide] = null
      nodeToDelet = null
      nodeExistMap[value] = false
      page.removeChild(elementToDelet);
      const lineToRemove = document.getElementsByClassName(`${value}`)[0]
      page.removeChild(lineToRemove);
    } else if (!nodeToDelet.left && nodeToDelet.right) {
      this.updateSubTree(nodeToDelet.right)
      nodeToDelet = null
    } else if (nodeToDelet.left && !nodeToDelet.right) {
      this.updateSubTree(nodeToDelet.left)
      nodeToDelet = null
    } else if (nodeToDelet.left && nodeToDelet.right) {
      let currNode = nodeToDelet.right;
      while (currNode.left !== null) {
        currNode = currNode.left;
      }
      const valueReplacement = currNode.value
      const elReplacement = document.getElementsByClassName(`node-${valueReplacement}`)[0]
      const lineToRemove = document.getElementsByClassName(`${valueReplacement}`)[0]
      const currEl = document.getElementsByClassName(`node-${value}`)[0]
      const currLine = document.getElementsByClassName(`${value}`)[0]
      currEl.innerText = valueReplacement
      currEl.onclick = this.deletNode.bind(this, [currEl, valueReplacement])
      nodeToDelet.value = valueReplacement
      currNode.parent[currNode.parentSide] = null
      currNode = null
      nodeExistMap[value] = false
      page.removeChild(elReplacement);
      page.removeChild(lineToRemove);
      currEl.className = ` node node-${valueReplacement}`
      currLine ? currLine.className = `line ${nodeToDelet.parentSide}  ${valueReplacement}` : null

    }
  }
  deletNode(args, e) {
    if (this.root.value === args[1]) {
      const newTree = this.preOrderTraversal(this.root)
      newTree.shift()
      page.innerHTML = ""
      this.root = null
      const length = newTree.length
      console.log(nodeExistMap[newTree[0]])
      for (let i = 0; i < length; i++) {
        nodeExistMap[newTree[i]] = false
        this.baseAddNewNode(newTree[i])
      }
    } else {

      const nodeToDelet = this.findNode(args[1])
      const elementToDelet = args[0]
      const value = args[1]
      this.delete(nodeToDelet, elementToDelet, value)
    }
  }
  postOrderTraversal(node) {
    if (node.left) this.postOrderTraversal(node.left);
    if (node.right) this.postOrderTraversal(node.right);
    const elToDelete = document.getElementsByClassName(`node-${node.value}`)[0]
    this.deletNode([elToDelete, node.value]);
  }
  preOrderTraversal(node) {
    let subValues = []

    function traversal(node) {
      subValues.push(node.value)
      if (node.left) traversal(node.left);
      if (node.right) traversal(node.right);
    }
    traversal(node)
    return subValues
  }
  updateSubTree(subTree) {
    let subValues = []

    function preOrderTraversal(node) {
      subValues.push(node.value)
      if (node.left) preOrderTraversal(node.left);
      if (node.right) preOrderTraversal(node.right);
    }
    preOrderTraversal(subTree)
    this.postOrderTraversal(subTree.parent)
    const length = subValues.length
    for (let i = 0; i < length; i++) {
      this.baseAddNewNode(subValues[i])
    }

  }
  findNode(value) {
    if (this.root === null) return false;
    var current = this.root,
      found = false;
    while (current && !found) {
      if (value < current.value) {
        current = current.left;
      } else if (value > current.value) {
        current = current.right;
      } else {
        found = true;
      }
    }
    if (!found) return undefined;
    return current;

  }
}
window.onbeforeunload = () => {}

const tree = new BinarySearchTree()
tree.root = tree.baseAddNewNode(60)
tree.baseAddNewNode(65)
tree.baseAddNewNode(70)
tree.baseAddNewNode(50)
tree.baseAddNewNode(45)
tree.baseAddNewNode(43)
tree.baseAddNewNode(42)
tree.baseAddNewNode(44)
tree.baseAddNewNode(46)


function throttled(fn, delay) {
  let lastCall = 0;
  return function (...args) {
    const now = (new Date).getTime();
    if (now - lastCall < delay) {
      return;
    }
    lastCall = now;
    return fn(...args);
  }
}
const debouncedAddNode =
  throttled(function (e) {
    if (e.keyCode === 32) {
      console.log("spacebar was clicked to add a random node")
      const randomNumber = Math.floor(Math.random() * (201)) - 100
      console.log(randomNumber)
      tree.animateAddNewNode(randomNumber)

    }
  }, 2500);

document.body.addEventListener('keyup', debouncedAddNode)
