var view =/*实现view对象*/
{
    displayMessage:function(msg)/*方法displayMessage接受一个参数————msg*/
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

view.displayMiss("00");/*别忘了，displayHit和displayMiss将一个游戏板中的位置作为参数*/
view.displayHit("34");/*这个参数对应于一个单元格id，它是这样得到的：*/
view.displayMiss("55");/*将一个字母和一个数字转换为由两个数字组成的字符串*/
view.displayHit("12");
view.displayMiss("25");
view.displayHit("26");
view.displayMessage("Tap tap,is this thing on?")/*这个测试很简单，使用任何消息都可以*/

