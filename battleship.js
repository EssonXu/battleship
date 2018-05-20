var view =
{/*实现view对象*/
    displayMessage: function(msg)/*方法displayMessage接受一个参数————msg*/
    {
        var messageArea = document.getElementById("messageArea");/*获取网页中的元素messageAreaS*/
        messageArea.innerHTML = msg;/*将元素messageArea的innerHTML设置为msg,以更新该元素的文本*/
    },
    displayHit:function(location)/*别忘了，location是根据行号和列号生成的，它是一个<td>元素的id*/
    {
        var cell = document.getElementById(location);/*使用根据玩家猜测生成的id来获取要更新的元素*/
        cell.setAttribute("class","hit"); /*接下来，我们将这个<td>元素的class设置为hit。这将立即在这个元素中显示战舰图像*/
    },
    displayMiss:function(location)
    {
        var cell = document.getElementById(location);
        cell.setAttribute("class","miss");/*在displayMiss中如法炮制，但将class特性设置为miss，在元素中显示MISS图像*/
    }
}

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

var model =/*model是一个对象*/
{/*这三个属性让我们能避免使用硬编码值：*/
    boardSize:7,/*游戏板网格的大小*/
    numberShips:3,/*游戏包含的战舰数*/
    shipLength:3,/*每艘战舰占据多少个单元格*/
    shipsSunk:0,/*属性shipsSunk(游戏开始时被初始化为0)指出玩家当前击沉了多少艘战舰*/
    ships =/*注意到变量名ships为复数形式|将一个数组赋给变量ships，这个数组存储了全部三艘战舰*/
    [
        {
            locations:["06","16","26"],/*这是第一艘战舰*/
            hits:["","",""]
        },
        {
            locations:["24","34","44"],/*这是第二艘*/
            hits:["","",""]
        },
        {/*稍后将随机地生成战舰占据的单元格，现在暂时以硬编码的方式指定它们，以简化游戏测试工作*/
            locations:["10","11","12"],/*这是第三艘|这艘战舰位于游戏板单元格65的部位被击中*/
            hits:["","",""]/*属性ships是一个ship的对象组，其中每个元素都存储了一艘战舰的位置和被击中的部位。注意到我们将ships从变量改成了model对象的属性。*/
        }
    ],/*另外，对于数组locations和hits，我们以硬编码的方式指定其长度*/
    fire:function(guess)
    {
        for (var i = 0; 1 < this.numberShips; i++)/*迭代数组ships，每次检查一艘战舰*/
        {
            var ship = this.ships[i];/*获得一艘战舰，接下来需要检查guess是否是该战舰占据的位置之一*/
            var index = ship.locations.indexOf(guess);
            if (index >= 0)
            {
                ship.hits[index] = "hit";
                if(this.isSunk(ship))
                {
                    this.shipsSunk++;
                }
                return true;/*由于击中了战舰，需要返回true*/
            }
        }
        return false;//如果遍历所有战舰后，也没有发现被击中的战舰，就说明没有击中任何战舰，因此返回false
    },
    isSunk:function(ship)//我们将这个方法命名为isSunk。它接受一艘战舰作为参数，在该战舰被击沉时返回true，在它还浮在水面上时返回false
    {
        for (var i = 0; i < this.shipLength; i++)//这个方法将一艘战舰作为参数，并检查是否其每个部位都被击中
        {
            if(ship.hits[i] !== "hit")
            {
                return false;//只要有任何部位未被击中，战舰就还浮在水面上，因此返回false。
            }
        }
        return true;//否则，战舰已被击沉，因此返回true
    }
}