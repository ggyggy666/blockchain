//编写智能合约——投票
//指定编译器>=0.4.0 <0.6.0
pragma solidity >=0.4.0<0.6.0;

//定义一个合约
contract Election{
	//定义一个候选人结构体
	struct Candidate{
		uint id;	//无符号整形ID
		string name;	//名字
		uint voteCount;	//投票数量
	}

	//记录选民账户的投票状态
	mapping(address=>bool)public voters;
	//定义键值对映射关系的存储结构来存储候选人
	mapping(uint=>Candidate)public candidates;
	//候选人的数量
	uint public candidatesCount;
	//投票事件
	event votedEvent(uint indexed_candidateId);

	//默认构造函数, 增加3个候选人
	constructor() public {
		addCandidate("Eric");
		addCandidate("Mike");
		addCandidate("Elena");
	}

	//增加候选人
	function addCandidate(string memory _name) private {
		candidatesCount++;
		candidates[candidatesCount] = Candidate(candidatesCount, _name, 0);
	}

	//投票
	function vote(uint _candidateId) public {
		//确保选民之前没有投票
		require(!voters[msg.sender]);
		//确保候选人的合法性
		require(_candidateId>0 && _candidateId<=candidatesCount);
		//记录选民的投票状态
		voters[msg.sender] = true;
		//更新候选人票数
		candidates[_candidateId].voteCount++;
		//触发投票事件
		emit votedEvent(_candidateId);
	}
}