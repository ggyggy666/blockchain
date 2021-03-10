```
echo "dd" >> README.md	#在工作区新建一个文件
git init	#git初始化
git add README.md	#将工作区文件添加到暂存区
git commit -m "first commit"	#将暂存区的文件提交到本地仓库，并添加描述“first commit”
git remote add origin 'git的地址'	#需要在GitHub新建一个仓库，然后复制那个仓库地址。origin是这个地址的描述。
git push -u origin master	#将origin添加到master分支。
```

git remote这个只需要第一次连接时才用。之后就不用了。如果是添加或者修改文件，不用分支的话，只需要:

```
git add xxx
git commit -m "xx"
git push
```

通过建立分支，可以方便获取每次修改的文件内容，即：

```
git checkout -b content	#创建并切换到content分支
这个时候去修改文件内容，完之后。
git status	#查看文件的状态
git add xxx	#将工作区文件添加到暂存区
git commit -m "xxx"	#提交到本地仓库，这个时候可以描述是"second commit"
git checkout master	#切换回master分支
git merge content	#将content分支合并到master分支。这样在content分区修改了的内容就会被合并到master分支
git log	#查看文件日志
git push	#推送到GitHub
```

其它操作：

```
git clone 网址
git mv [原文件] [新文件]	#修改文件名
git rm [文件名]	#删除文件
git pull [远程主机别名]<远程分支名称>:[本地分支名称]	#下载代码并快速合并
git push [远程主机别名][本地分支名称]:<远程分支名称>

```

遇到一个问题，git无法连接上GitHub了，搞了一下午，最后终于解决了。使用SSH连接。

```
1.  git remote set-url origin git@github.com:xxx（仓库ssh地址）
 2.https://blog.csdn.net/YanceChen2013/article/details/82218356
3.第二步会遇到问题，看下面链接：https://blog.csdn.net/argleary/article/details/100638560
```



