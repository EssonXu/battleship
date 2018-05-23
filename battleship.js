var view = 
{/*实现view对象*/
	displayMessage: function(msg)/*方法displayMessage接受一个参数————msg*/
	{
		var messageArea = document.getElementById("messageArea");/*获取网页中的元素messageAreaS*/
		messageArea.innerHTML = msg;/*将元素messageArea的innerHTML设置为msg,以更新该元素的文本*/
	},
	displayHit: function(location)/*别忘了，location是根据行号和列号生成的，它是一个<td>元素的id*/
	{
		var cell = document.getElementById(location);/*使用根据玩家猜测生成的id来获取要更新的元素*/
		cell.setAttribute("class", "hit");/*接下来，我们将这个<td>元素的class设置为hit。这将立即在这个元素中显示战舰图像*/
	},
	displayMiss: function(location)
	{
		var cell = document.getElementById(location);
		cell.setAttribute("class", "miss");/*在displayMiss中如法炮制，但将class特性设置为miss，在元素中显示MISS图像*/
	}
}; 

//view.displayMiss("00");/*别忘了，displayHit和displayMiss将一个游戏板中的位置作为参数*/
//view.displayHit("34");/*这个参数对应于一个单元格id，它是这样得到的：*/
//view.displayMiss("55");/*将一个字母和一个数字转换为由两个数字组成的字符串*/
//view.displayHit("12");
//view.displayMiss("25");
//view.displayHit("26");
//view.displayMessage("Tap tap,is this thing on?")/*这个测试很简单，使用任何消息都可以*/

// var ship1 =/*每艘船都是一个对象*/
// {/*这个对象包含属性locations和hits*/
//     locations:["10","20","30"],/*属性locations是一个数组，其中存储了战舰占据的游戏板单元格*/
//     hits:["","",""]/*属性hits也是一个数组，指出了战舰的各个部位是否被击中。我们将该数组的每个元素都初始化为空字符串，并在战舰的某个部位被击中时将相应的元素改为"hit"*/
// };
// var ship2 =/*每艘战舰都用两个数组表示，分别指出战舰占据的位置以及被集中的部位*/
// {
//     locations:["32","33","34"],
//     hits:["","",""]
// }
// var ship3 =
// {
//     locations:["63","64","65"],
//     hits:["","","hit"]
// };

var model = /*model是一个对象*/
{/*这三个属性让我们能避免使用硬编码值：*/
	boardSize: 7,/*游戏板网格的大小*/
	numShips: 3,/*游戏包含的战舰数*/
	shipLength: 3,/*每艘战舰占据多少个单元格*/
	shipsSunk: 0,/*属性shipsSunk(游戏开始时被初始化为0)指出玩家当前击沉了多少艘战舰*/
	ships:/*注意到变量名ships为复数形式|将一个数组赋给变量ships，这个数组存储了全部三艘战舰*/
	[
		{
			locations: [0, 0, 0],
			hits: ["", "", ""]
		},/*这是第一艘战舰*/
		{
			locations: [0, 0, 0],
			hits: ["", "", ""]
		},/*这是第二艘*/
		{/*稍后将随机地生成战舰占据的单元格，现在暂时以硬编码的方式指定它们，以简化游戏测试工作*/
			locations: [0, 0, 0],/*这是第三艘|这艘战舰位于游戏板单元格65的部位被击中*/
			hits: ["", "", ""]/*属性ships是一个ship的对象组，其中每个元素都存储了一艘战舰的位置和被击中的部位。注意到我们将ships从变量改成了model对象的属性。*/
		}
	],/*另外，对于数组locations和hits，我们以硬编码的方式指定其长度*/

	fire: function(guess)
	{
		for (var i = 0; i < this.numShips; i++)/*获得一艘战舰，接下来需要检查guess是否是该战舰占据的位置之一*/
		{
			var ship = this.ships[i];
			var index = ship.locations.indexOf(guess);//告诉视图，玩家的猜测击中了战舰
			if (ship.hits[index] === "hit")
			{
				view.displayMessage("Oops, you already hit that location!");
				return true;
			} else if (index >= 0)
			{
				ship.hits[index] = "hit";
				view.displayHit(guess);
				view.displayMessage("HIT!");//并让试图显示消息"HIT"

				if (this.isSunk(ship))//确定战舰被击中后，执行这个检查。如果战舰被击沉，就将击沉的战舰数(存储在model对象的睡醒shipsSunk中)加1
				{
					view.displayMessage("You sank my battleship!");
					this.shipsSunk++;
				}
				return true;/*由于击中了战舰，需要返回true*/
			}
		}
		view.displayMiss(guess);//告诉视图，玩家的猜测没有击中战舰
		view.displayMessage("You missed.");//让视图显示消息"You missed"
		return false;//如果遍历所有战舰后，也没有发现被击中的战舰，就说明没有击中任何战舰，因此返回false
	},

	isSunk: function(ship)
	{
		for (var i = 0; i < this.shipLength; i++) //这个方法将一艘战舰作为参数，并检查是否其每个部位都被击中
		{
			if (ship.hits[i] !== "hit")
			{
				return false;//只要有任何部位未被击中，战舰就还浮在水面上，因此返回false。
			}
		}
	    return true;//否则，战舰已被击沉，因此返回true
	},

	generateShipLocations: function()//我们将在model对象中添加这个方法
	{
		var locations;
		for (var i = 0; i < this.numShips; i++)//循环次数与要为其生成位置的战舰数相同
		{
			do//这里使用了do while循环
			{
				locations = this.generateShip();//生成战舰占据的一系列位置
			} while (this.collision(locations));//并检查这些位置与游戏板中既有战舰的位置是否重叠。如果重叠，就需要再次尝试，不断地生成新位置，直到不重叠为止
			this.ships[i].locations = locations;
		}
		console.log("Ships array: ");
		console.log(this.ships);
	},

	generateShip: function()
	{
		var direction = Math.floor(Math.random() * 2);//使用Math.random来生成一个0~1的随机数，再将结果乘以2，得到一个0~2(但不包括2)的随机数。然后，使用Math.floor将这个随机数转换成0或1
		var row, col;
		if (direction === 1)//如果direction为1，就意味着要创建一艘水平放置的战舰
		{
			row = Math.floor(Math.random() * this.boardSize);
			col = Math.floor(Math.random() * (this.boardSize - this.shipLength + 1));
		}
		else//如果direction为0，就意味着要创建一艘垂直放置的战舰
		{ 
			row = Math.floor(Math.random() * (this.boardSize - this.shipLength + 1));
			col = Math.floor(Math.random() * this.boardSize);
		}

		var newShipLocations = [];//为创建新战舰的locations属性，我们首先创建一个空数组，再在其中逐一添加位置
		for (var i = 0; i < this.shipLength; i++)//我们使用一个循环，其循环次数为战舰占据的单元格数
		{
			if (direction === 1)
			{
				newShipLocations.push(row + "" + (col + i));
			} else {
				newShipLocations.push((row + i) + "" + col);
			}
		}
		return newShipLocations;//生成所属有的位置后返回这个数组
	},

	collision: function(locations)
	{
		for (var i = 0; i < this.numShips; i++)
		{
			var ship = this.ships[i];
			for (var j = 0; j < locations.length; j++)
			{
				if (ship.locations.indexOf(locations[j]) >= 0)
				{
					return true;
				}
			}
		}
		return false;
	}
}; 

var controller =
{
	guesses: 0,//这里定义了controller对象，它包含一个属性guesses，这个属性被初始化为0
	processGuess: function(guess)//这是方法processGuess的方法头，它将一个格式为"A0"的猜测位置作为参数
	{
		var location = parseGuess(guess);//使用parseGuess来验证玩家猜测的有效性。
		if (location)//只要返回的不是null，就说明获得的位置是有效的。
		{
			this.guesses++;
			var hit = model.fire(location);//接下来，我们以字符串的方式将行号和列号传递给model对象的方法fire。别忘了，仅当击中了战舰时，方法fire才返回true
			if (hit && model.shipsSunk === model.numShips)//如果击中了战舰，且击沉的战舰数与游戏包含的战舰数目相等，就向玩家显示一条消息，指出他击沉了所有的战舰
			{
				view.displayMessage("You sank all my battleships, in " + this.guesses + " guesses");//我们还向玩家指出，它经过多少次猜测就击沉了所有的战舰。其中的guesses是this对象(即controller对象)的一个属性
			}
		}
	}
}

function parseGuess(guess)//将猜测的位置赋给形参guess
{
	var alphabet = ["A", "B", "C", "D", "E", "F", "G"];//一个数组，它包含可出现在有效猜测中的所有字母

	if (guess === null || guess.length !== 2)//然后检查guess不为null且长度为2
	{
		alert("Oops, please enter a letter and a number on the board.");//如果不是这样的，就提醒玩家
	}
	else
	{
		var firstChar = guess.charAt(0);//如果不是这样的，就提醒玩家
		var row = alphabet.indexOf(firstChar);//再使用indexOf获取0~6的数字，它时这个字母在数组中的位置。为明白其中的工作原理，请尝试几个这样的示例
		var column = guess.charAt(1);//获取字符串中的第二个字符，它表示列号
		if (isNaN(row) || isNaN(column))//使用函数isNaN检查row和column是否都是数字
		{
			alert("Oops, that isn't on the board.");
		}
		else if (row < 0 || row >= model.boardSize ||
				   column < 0 || column >= model.boardSize)
		{
			alert("Oops, that's off the board!");
		}
		else
		{
			return row + column;
		}
	}
	return null;//如果执行到了这里，说明有检查是失败的，因此返回null
}

function handleFireButton()//每当玩家单击Fire！按钮时，都将调用这个函数
{
	var guessInput = document.getElementById("guessInput");//首先，使用这个表单元素的id(guessinput)来获取一个指向它的引用
	var guess = guessInput.value.toUpperCase();//然后，从这个表单元素中获取猜测，它存储在这个表单元素的属性value中
	controller.processGuess(guess);//我们将玩家的猜测交给控制器，然后一切就像魔术一样发生了！
	guessInput.value = "";//这行代码将表单输入元素的值充值为空字符串。这样玩家再次猜测时，就无需选择并删除前一次的猜测了，否则将让玩家很恼火
}

function handleKeyPress(e)
{
	var fireButton = document.getElementById("fireButton");
	if (e.keyCode === 13)
	{
		fireButton.click();
		return false;
	}
}

window.onload = init;

function init()//需要将这些代码放在一个地方，因此我们创建一个名为init的函数
{
	var fireButton = document.getElementById("fireButton");//首先，使用Fire！按钮的id获取一个指向它的应用
	fireButton.onclick = handleFireButton;//然后，给这个按钮添加单击事件处理程序handleFireButton
	var guessInput = document.getElementById("guessInput");//添加一个新的处理程序，用于处理HTML输入字段的按键事件
	guessInput.onkeypress = handleKeyPress;
	model.generateShipLocations();
}