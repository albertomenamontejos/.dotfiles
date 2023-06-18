if (!com)
    var com = {};
if (!com.pointBlank)
    com.pointBlank = {};
com.pointBlank.popup = {
    checkOrCreateDiv: function () {
        if (document.getElementById('linkMinerPopupDiv')) {
            return true;
        } else {
            var div = document.createElement('div');
            div.setAttribute('id', 'linkMinerPopupDiv');
            div.setAttribute('class', 'linkMinerPopupDivBottomRight');

            var closeButton = document.createElement("a");
            closeButton.setAttribute('class', ' linkMinerPopupClose');
            closeButton.appendChild(document.createTextNode('X'));
            closeButton.addEventListener('click', this.closeButton.bind(this), false);
            div.appendChild(closeButton);


            var msg = document.createElement('div');
            msg.setAttribute('id','linkMinerMsgContainer');
            msg.setAttribute('class','linkMinerMsgContainer');
            div.appendChild(msg);

            document.body.appendChild(div);

            return false;
        }
    },
    closeButton:function(){
        $('#linkMinerPopupDiv').remove();
    },
    showPopup:function(provider,msg){
        //alert('error msg = '+msg);
        this.checkOrCreateDiv();
        document.getElementById('linkMinerMsgContainer').innerHTML ='<h3>'+provider+'</h3><br/>' +msg;

    }
}
