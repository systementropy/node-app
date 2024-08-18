const myElement = document.createElement("iframe")
myElement.setAttribute("src","/body.html")
myElement.setAttribute("width",'410'); 
myElement.setAttribute("id",'loading_iframe');
myElement.setAttribute("height",'335'); 
myElement.setAttribute("style",'overflow:hidden; border:none');
document.body.appendChild(myElement);

const myhandler = (e) => {
    var iframe = document.querySelector('#loading_iframe');
    iframe.contentWindow.postMessage({
        sourceType: 'NODE_APP',
        event: 'saveCardDetails'
    }, '*' )
}