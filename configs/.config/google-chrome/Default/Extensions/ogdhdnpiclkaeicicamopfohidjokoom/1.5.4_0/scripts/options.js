var bkg = chrome.extension.getBackgroundPage();
var root = bkg.com.mieux.jonCooperBackground;

$(function() {
    $(document).on('click', '.submitButton', saveOptions);
    $('#currentDate').html(new Date().getFullYear());
});

function saveOptions(){
    var formId = 'registrationForm';
    var inputs = document.getElementById(formId).querySelectorAll('input');
    var inputLength= inputs.length;

    for(var i=0;i<inputLength;i++) {
        var inputName = inputs[i].name;
        var inputType = inputs[i].type;
        var inputValue = inputs[i].checked;

        if(inputType=='radio') {
            itemValue = $('input[name=' + inputName + ']:checked').val();
            root.setItem(inputName, itemValue);
            continue;
        }
        if(inputValue) {
            root.setItem(inputName, 1);
        } else {
            root.setItem(inputName, 0);
        }
    }
    document.location.reload(true);
}

function restoreOptions(){
    var formId = 'registrationForm';
    var inputs = document.getElementById(formId).querySelectorAll('input');
    var inputLength= inputs.length;

    for(var i=0;i<inputLength;i++){
        var inputName = inputs[i].name;
        var inputType = inputs[i].type;
        var storageValue = root.getItem(inputName);

        if(inputType=='text') continue;

        if(inputType=='radio' &&  storageValue) {
            $('input[name="' + inputName+ '"][value="'+storageValue+'"]').prop('checked', true);
            continue;
        }
        if(storageValue) {
            inputs[i].checked = true;
        } else {
            inputs[i].checked = false;
        }
        if(storageValue==null && inputName=='inOutLinks') {
            inputs[i].checked = true;
            root.setItem(inputName,1);
        }
    }

    checkAuth();
}
function checkAuth(){
    root.cookieHandler();
    var ahref_access_token = root.getItem('access_token');
    var moz_access_token = root.getItem('moz_access_token');
    var majestic_access_token = root.getItem('majestic_access_token');

    var ahrefAuthBlock = $('#jon_cooper_chrome_extension_ahrefs_auth_status');
    var mozAuthBlock = $('#jon_cooper_chrome_extension_moz_auth_status');
    var majesticAuthBlock = $('#jon_cooper_chrome_extension_majestic_auth_status');

    var ahrefRovkeAuthBlock = $('#jon_cooper_chrome_extension_ahrefs_auth_revoke');
    var mozRovkeAuthBlock = $('#jon_cooper_chrome_extension_moz_auth_revoke');
    var majesticRovkeAuthBlock = $('#jon_cooper_chrome_extension_majestic_auth_revoke');


    //$('#jon_cooper_chrome_extension_majestic_new_tab').attr('href',root.majesticAuthUrl);
    //majesticAuthBlock.show();
    //
    //$('#jon_cooper_chrome_extension_new_tab').attr('href', root.ahrefsAuthUrl);
    //ahrefAuthBlock.show();

    var dataProvider = root.getItem('dataProvider');
    // if(dataProvider == 'majestic') {
        if(!majestic_access_token){
            $('#jon_cooper_chrome_extension_majestic_new_tab').attr('href',root.majesticAuthUrl);
            majesticAuthBlock.show();
        } else {
            majesticRovkeAuthBlock.show();
            majesticAuthBlock.hide();
        }

    if(!moz_access_token){
        $('#jon_cooper_chrome_extension_moz_new_tab').attr('href','https://moz.com/products/api/keys');
        mozAuthBlock.show();
    } else {
        mozRovkeAuthBlock.show();
        mozAuthBlock.hide();
    }
    // }
    // else if(dataProvider == 'ahref') {
        if (!ahref_access_token) {
            $('#jon_cooper_chrome_extension_new_tab').attr('href', root.ahrefsAuthUrl);
            ahrefAuthBlock.show();
        } else {
            ahrefRovkeAuthBlock.show();
            ahrefAuthBlock.hide();
        }
    // }
}

$(function() {
    $('#saveMajesticKey').click(function(){
        var accessToken = $('#majesticAccessToken').val();
        if(accessToken){
            root.setItem('majestic_access_token', accessToken);
            $('#jon_cooper_chrome_extension_majestic_auth_status').hide();
            $('#jon_cooper_chrome_extension_majestic_auth_revoke').show();
        } else {
            alert('access token is empty or invalid');
        }
    });
    $('#saveMozKey').click(function(){
        var mozAccessToken = $('#mozAccessToken').val();
        var secretKey = $('#mozSecretKey').val();
        if(mozAccessToken && secretKey){
            root.setItem('moz_access_token', mozAccessToken);
            root.setItem('moz_secret_key', secretKey);
            $('#jon_cooper_chrome_extension_moz_auth_status').hide();
            $('#jon_cooper_chrome_extension_moz_auth_revoke').show();
        } else {
            alert('access token or secret key are empty or invalid');
        }
    });
    $('.unauth').click(function(){
        var provider = $(this).data('provider');
        if(provider){
            removeAccessToken(provider);
        }

    });
    $('.linkMinerAuth').click(function(){
        var dataProvider = root.getItem('dataProvider');
        var provider = $(this).data('provider');
        if(!dataProvider) {
            $(":radio[value="+provider+"]").attr('checked',true);
            root.setItem('dataProvider',provider);
        }
    });

    $('#jon_cooper_chrome_extension_majestic_new_tab').click(function(){
        $('#majestic_save_box').show();
        return true;
    });
    $('#jon_cooper_chrome_extension_moz_new_tab').click(function(){
        $('#moz_save_box').show();
        return true;
    });
$('#selectMoz').click(function(){
    alert("Caution: if you're using a free API account, Moz limits you to pulling 10 results every 10 seconds, so consider using a different data provider for checking the links of specific pages if speed is a priority.");
});

//     $("#apiProvider input[name='dataProvider']").click(function(){
//     root.cookieHandler();
//     var ahref_access_token = root.getItem('access_token');
//     var majestic_access_token = root.getItem('majestic_access_token');
//     var ahrefAuthBlock = $('#jon_cooper_chrome_extension_ahrefs_auth_status');
//     var majesticAuthBlock = $('#jon_cooper_chrome_extension_majestic_auth_status');

//     var ahrefRovkeAuthBlock = $('#jon_cooper_chrome_extension_ahrefs_auth_revoke');
//     var majesticRovkeAuthBlock = $('#jon_cooper_chrome_extension_majestic_auth_revoke');

//     var provider = $('input:radio[name=dataProvider]:checked').val()
//             ahrefAuthBlock.hide();
//             ahrefRovkeAuthBlock.hide();
//             majesticAuthBlock.hide();
//             majesticRovkeAuthBlock.hide();

//     if(provider == "ahref"){
//         if(ahref_access_token) {
//             ahrefRovkeAuthBlock.show();
//         } else{
//             ahrefAuthBlock.show();
//         }
//     } else if(provider=='majestic'){
//         if(majestic_access_token) {
//             majesticRovkeAuthBlock.show();
//         } else{
//             majesticAuthBlock.show();
//         }
//     }
// });
    //console.log( "ready!" );
});

function removeAccessToken(type){
    //alert('provider type:'+type);
    //access_token,majestic_access_token

    var p = type.charAt(0).toUpperCase() + type.slice(1);
    if(!confirm('Are you sure to Un-authorize '+p)) return false;

    switch(type){
        case 'ahref':
            root.deleteLocalStorageAndCookie();
            //root.deleteApiDataFromLocalStorage();
            break;

        case 'majestic':
            localStorage.removeItem("majestic_access_token");
            break;
        case 'mozseo':
            localStorage.removeItem("moz_access_token");
            localStorage.removeItem("moz_secret_key");
    }
    document.location.reload(true);
}



document.addEventListener('DOMContentLoaded', function() {
    restoreOptions();
    // document.querySelector('button').addEventListener('click', saveOptions);
});
