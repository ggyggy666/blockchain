# blockchain

开始学习blockchain~

（学习自《大话区块链》）

代码在：https://github.com/ggyggy666/blockchain

## blockchain文件夹

myblockchain.js

`node myblockchain.js`, 运行一个简单的区块链，并使用JSON格式输出。思路：

```
1. 导入SHA256函数以便调用加密，使用当前系统日期作为时间戳。
2. 构造一个区块类，构造函数对区块索引值，时间戳，区块交易数据和上一个区块的哈希进行赋值。
3. 创建一个加密函数，对上述初始化后的值进行SHA256加密。
4. 创建一个挖矿函数，用来挖矿，通过修改nonce值，从而修改hash值，判断是否一致来进行挖矿。
5. 创建一个区块链类，构造函数中初始化区块，即生成创世区块，让挖矿难度为4.而生成创世区块就需要放到一个函数中，这个函数就生成一个区块的实例，传参，索引值就得是0。由于没有上一个区块，因此上一个区块的哈希值也是0.
6. 该区块链类需要将区块连接在一块，那么就需要有添加区块进链的操作。创建一个数组，它存储的内容就是一个个区块。创世区块就是在下标0的位置。添加区块函数中，形参就是区块，然后为了让它连在区块链上，就得设置这个新的区块内包含的上一个区块的哈希值等于现在链上的最后一个区块的哈希值，同时设置好挖矿难度，将它push进链数组中。
7. 6中提到需要获得当前链上的最后一个区块的哈希值，因此需要有一个函数执行这个操作。直接：return this.chain[this.chain.length-1]。就能获得最后一个区块的对象。
8. 还需要检查区块链的有效性，遍历链上的所有区块，每次获取当前区块和上一个区块，比较当前保存的哈希值与计算出来的当前区块的哈希值是否相等，再比较当前区块保存的上一个区块哈希值与上一个区块保存的哈希值是否相等。
9. 进入测试。实例化区块链对象，往里添加区块，之后使用JSON.stringify打印出来。
```

调用SHA256需要使用`npm install -save crypto-js`。

## truffle-v1

DAPP的开发。

环境：

- Remix在线环境。remix.ethereum.org。
- Metamask，一个谷歌插件，在谷歌商店中获取。
- Rinkeby，申请代币的地方。https://faucet.rinkeby.io
- truffle, 测试智能合约的环境。npm install -g truffle
- Ganache, 配合测试的一个以太坊网络的模拟器。百度到官网下载即可。

truffle需要下载一个pet-shop, 但是经测试无法直接使用: `truffle unbox pet-shop`下载，会报错。需要到GitHub下载pet-shop。不过我已经将其与DAPP代码上传到了我的GitHub的truffle-v1。

## truffle使用

- 在truffle文件夹下，打开git bash。命令都在这里输入。

- 智能合约sol文件放到contracts文件夹下。

- 在Migrations文件夹下新建部署文件: 2_deploy_contracts.js。用数字2进行编号，以便其按顺序执行。

- 启动Ganache，然后truffle migrate部署合约，就可以看到Ganache的账号状态发生了改变。

- truffle console, 进入控制台可以与智能合约交互。

- Election.deployed().then(function(instance){app = instance}), 获取合约对象，然后：`app.candidate()`就可以打印出候选人信息。正常说明环境没问题。

- 修改智能合约后，重新部署：`truffle migrate -reset`, 需要扣以太币的。。

- 在test文件夹下编写election.js, 用作测试文件，写好后，使用：`truffle test`, 即可测试智能合约是否正确。

- 加入前端代码。src文件夹下的index.html文件中编写前端代码，然后编写APP.js，创建接口与智能合约交互。完成后需要重新部署。

- Lite-Server是pet-shop内置的web服务器，使用前先打开bs-config.json，确认路径为src，打开package.json，添加：

  ```
  "scripts":{
  	"dev": "lite-server",
  	"test": "echo error && exit 1"
  },
  ```

  配置web服务器名字是dev, 之后：`npm run dev`，启动服务，即可自动打开浏览器。

- 打开前端后，需要连接Metamask, 因此需要在Metamask中选择自定义RPC，输入名称，URL配置成：http://127.0.0.1:7545, 链ID随便写比如12345. 之后保存。

- ![image-20210310212231065](C:\Users\29924\AppData\Roaming\Typora\typora-user-images\image-20210310212231065.png)

  注意，链接时出现的端口并不是7545，我的是3000.连接即可。

- 连接后，到Ganache中，点击右侧钥匙，复制私钥，然后Metamask导入账户时粘贴私钥，即可导入账户并拥有代币。前端进行投票就可以在Metamask中确认了。前端代码修改后会实时显示，不需要重新部署。