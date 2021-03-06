const SHA256 = require('crypto-js/sha256');
class Block {
    constructor(index, timestamp, data, previousHash = '') {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = '';
    }
    calculateHash() {
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
    }
}

class Blockchain {
    constructor() {
        this.chain = [this.createGenesisBlock()];
    }
    createGenesisBlock() {
        return new Block(0, "01/01/2020", "Genesis block", "0");
    }
    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock) {
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }
    isChainValid() {
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];
            if (currentBlock.hash !== currentBlock.calculateHash()) {
                return false;
            }
            if (currentBlock.previousHash !== previousBlock.hash) {
                return false;
            }
        }
        return true;
    }
}

let rajCoin = new Blockchain();
rajCoin.addBlock(new Block(1, "02/02/2020", { amount: 4 }));
rajCoin.addBlock(new Block(2, "03/02/2020", { amount: 10 }));

//uncomment to try to tamper with blockchain and see the results.
// rajCoin.chain[1].data = { amount: 100 };
// rajCoin.chain[1].hash = rajCoin.chain[1].calculateHash();

console.log("Is chain valid:" + rajCoin.isChainValid());
console.log(JSON.stringify(rajCoin));