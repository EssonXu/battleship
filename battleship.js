var view =/*实现view对象*/
{
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

var ships =/*注意到变量名ships为复数形式|将一个数组赋给变量ships，这个数组存储了全部三艘战舰*/
[
    {
        locations:["10","20","30"],/*这是第一艘战舰*/
        hits:["","",""]
    },
    {
        locations:["32","33","34"],/*这是第二艘*/
        hits:["","",""]
    },
    {
        locations:["63","64","65"],/*这是第三艘|这艘战舰位于游戏板单元格65的部位被击中*/
        hits:["","","hit"]
    },
];