//this is my first blockchain
const SHA256=require('crypto-js/sha256');	//导入sha256函数
var dt = new Date();	//获取当前系统时间戳
var timestamp = dt.toString();

//构建一个区块
class Block{
	/**
	*默认构造函数
	*@param index	[区块索引值]
	*@param timestamp	[时间戳]
	*@param data	[区块交易数据]
	*@param previousHash	[之前区块的哈希]
	*/
	constructor(index, timestamp, data, previousHash){
		this.index = index;
		this.timestamp = timestamp;
		this.data = data;
		this.previousHash = previousHash;
		this.hash = this.calculateHash();
		this.nonce = 0;
	}

	/**
	*计算哈希值并返回
	*/
	calculateHash(){
		return SHA256(this.index + this.previousHash + this.timestamp + this.data + this.nonce).toString();
	}

	/**
	*挖矿
	*@param difficulty	[挖矿的难度]
	*/
	mineBlock(difficulty){
		while(this.hash.substring(0, difficulty) != Array(difficulty+1).join("0")){
			this.nonce++;
			this.hash = this.calculateHash();
		}
		console.log("Block mined: " + this.hash);
	}
}

/**
*构造区块链对象
*/
class Blockchain{
	/**
	*区块链对象默认构造函数
	*/
	constructor(){
		this.chain = [this.createGenesis()];
		this.difficulty = 4;
	}

	/**
	*创建创世区块
	*/
	createGenesis(){
		return new Block(0, timestamp, "Genesis block", "0");
	}

	/**
	*获得最新区块
	*/
	getLatestBlock(){
		return this.chain[this.chain.length-1];
	}

	/**
	*增加新区块
	*/
	addBlock(newBlock){
		newBlock.previousHash = this.getLatestBlock().hash;
		newBlock.mineBlock(this.difficulty);
		this.chain.push(newBlock);
	}

	/**
	*检查区块链的有效性
	*/
	checkValid(){
		for(let i=1; i<this.chain.length; i++){
			const currentBlock = this.chain[i];
			const previousHash = this.chain[i-1];
			if(currentBlock.hash != currentBlock.calculateHash()){
				return false;
			}
			if(currentBlock.previousHash != previousHash.hash){
				return false;
			}
		}
		return true;
	}
}


//创建用例进行区块链测试
let testChain = new Blockchain();
console.log("Mining block...");
testChain.addBlock(new Block(1, timestamp, "This is block 1"));
console.log("Mining block...");
testChain.addBlock(new Block(2, timestamp, "This is block 2"));
console.log(JSON.stringify(testChain, null, 4));
console.log("Is Blockchain valid?" + testChain.checkValid().toString());
