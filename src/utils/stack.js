class Node {
    constructor(current){
        this.current = current
        this.previous = null
    }
}

class HistoricalStack {
    constructor (){
        this.top = null
    }

    push(value){
        const node = new Node(value)
        if (this.isEmpty()) {
            this.top = node
        } else {
            node.previous = this.top
            this.top = node
        }
    }

    pop(){
        if (this.isEmpty()) {
            return null
        } else {
            const current = this.top.current
            this.top = this.top.previous
            return current
        }
    }

    isEmpty(){
        return this.top === null
    }

    peek(){
        return this.top === null ? null : this.top.current
    }

    clear(){
        this.top = null
    }
}

module.exports = HistoricalStack