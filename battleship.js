var view =/*实现view对象*/
{
    displayMessage:function(msg)/*方法displayMessage接受一个参数————msg*/
    {
        var messageArea = document.getElementById("messageArea");/*获取网页中的元素messageAreaS*/
        messageArea.innerHTML = msg;/*将元素messageArea的innerHTML设置为msg,以更新该元素的文本*/
    },
    displayHit:function(location)
    {

    },
    displayMiss:function(location)
    {
        
    }
}