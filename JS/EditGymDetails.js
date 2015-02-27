var tempLink,tempTitle;
$(document).ready(function(){

var onclick=$('#BtnSave').attr('onclick');
if(onclick)
{
onclick=onclick.split('{')[0]+'{https://gymtrekker-public.sharepoint.com/SitePages/ViewGym.aspx?GymID='+ getURLParameter().GymID+'}\')';
$('#BtnSave').attr('onclick',onclick);
}

$('#AddHIButton').click(function () {
    EditGym.AddHIHandler();
});

$('#AddSdButton').click(function () {
    EditGym.AddSDHandler();
});

$('body').on('click', '.HIRow .ILCross', function () {
    EditGym.RemoveHIHandler(this);
});

$('body').on('click', '.SDRow .ILCross', function () {
    EditGym.RemoveSDHandler(this);
});
$('#SDBRowseButton').click(function (e) {
    EditGym.upload(e);
});
$('#HIBRowseButton').click(function (e) {
    EditGym.uploadHI(e);
});

$('.MembershipOffered input[type="checkbox"]').click(function (e){
	//$('.MembershipAmount').remove();
	//$('.MembershipOffered .ms-RadioText input:checked').each(function(){
	if(e.target.checked){
		var tempTitle = $(e.target).parent().attr("title");
		$(e.target).parent().append('<input type="text" placeholder="Enter the amount" class="MembershipAmount" title="'+tempTitle+'" >');
	}else{
		$(e.target).siblings('.MembershipAmount').remove();
	}
	//});	
});
$('.GymEquipment input[type="checkbox"]').click(function (e){
	//$('.MembershipAmount').remove();
	//$('.MembershipOffered .ms-RadioText input:checked').each(function(){
	if(e.target.checked){
		var tempTitle = $(e.target).parent().attr("title");
		$(e.target).parent().append('<input type="text" placeholder="Count" class="GymEquipmentCount" title="'+tempTitle+'" >');
	}else{
		$(e.target).siblings('.GymEquipmentCount').remove();
	}
	//});	
});

$(document).click(function(){
//Membership Amount
	var MAJson={};
	var tempTitle,tempValue,JSONchunk; 
	$('.MembershipAmount').each(function(){
		tempTitle = $(this).attr("title");
		tempValue = $(this).val();
		MAJson[tempTitle] = tempValue;
	});
	JSONchunk = JSON.stringify(MAJson);	
	var MAObj = $('textarea[title="Membership Amount"]');
	MAObj.html(JSONchunk);
	
//Gym Equipment Count
	var GECJson={}; 
	$('.GymEquipmentCount').each(function(){
		tempTitle = $(this).attr("title");
		tempValue = $(this).val();
		GECJson[tempTitle] = tempValue;
	});
	JSONchunk = JSON.stringify(GECJson);	
	var GECObj = $('textarea[title="Gym Equipment Count"]');
	GECObj.html(JSONchunk);
	
});
EditGym.MAHandler();
EditGym.HIHandler();
EditGym.SDHandler();
EditGym.GECHandler();
});

var EditGym = {

SDHandler: function () {
    var SdObj = $('textarea[title="Supporting Images"]');
    var SDChunk = SdObj.html();
    var parsedSD = JSON.parse('{"SD":[' + SDChunk + ']}');
    $.each(parsedSD.SD, function (index, value) {
        $('.SDcontainerAll').append($('<div>').attr({ 'class': 'SDRow', 'id': 'SDRow' + index }));
        //get current Box id
        $currBoxId = '#SDRow' + index;
        var tempLink1 = value.link;
        $($currBoxId).append('<a href="' + tempLink1 + '" target="_blank"/>');
        $($currBoxId + ' a').append($('<img>').attr({ "class": "ImageContainer", "src": tempLink1 })); //.html($('<a>').attr({ 'class': '', 'href': tempLink1 }).html(value.title)));
        $($currBoxId).append($('<div>').attr({ 'class': 'ILCross' }).text("x"));
    });
},

AddSDHandler: function () {
	if($('.SDInput').val()!==""){
    var sText,
       sLink,
       JSONString,
       jsonSD,
       SdObj,
       JSONchunk;
    sLink = $('.SDInput').attr('data-link');
    sText = $('.SDInput').attr('data-title');
    SdObj = $('textarea[title="Supporting Images"]');
    JSONchunk = SdObj.html();
    var index = $('.SDRow').length + 1;
    $('.SDcontainerAll').append($('<div>').attr({ 'class': 'SDRow', 'id': 'SDRow' + index }));
    //get current Box id
    $currBoxId = '#SDRow' + index;
    $($currBoxId).append('<a href="' + sLink + '" target="_blank"/>');
    $($currBoxId+' a').append($('<img>').attr({ "class": "ImageContainer", "src": sLink })); //.html($('<a>').attr({ 'class': '', 'href': tempLink1 }).html(value.title)));
    $($currBoxId).append($('<div>').attr({ 'class': 'ILCross' }).text("x"));
    jsonSD = {
        'title': sText,
        'link': sLink
    };
    if (JSONchunk === "") {
        JSONchunk = JSON.stringify(jsonSD);
    }
    else {
        JSONchunk = JSONchunk + ',' + JSON.stringify(jsonSD);
    }

    SdObj.html(JSONchunk);
    //clear input button
    $('.SDInput').attr({
        'data-link': "",
        'data-title': ""
    }).val("");
    }
},

RemoveSDHandler: function (sourceObject) {
    $(sourceObject).parent('.SDRow').remove();
    var sText="",
   sDesc="",
   sLink = "",
   JSONString,
   jsonSD,
   SDObj,
   JSONchunk = "",
   sDocIcon,
   docObject;
   SDObj = $('textarea[title="Supporting Images"]');
    $('.SDRow a').each(function () {
        sText = $(this).html();
        sLink = $(this).attr('href');
        jsonSD = {
            'title': sText,
            'link': sLink
        };
        if (JSONchunk === "") {
            JSONchunk = JSON.stringify(jsonSD);
        }
        else {
            JSONchunk = JSONchunk + ',' + JSON.stringify(jsonSD);
        }
    });

    SDObj.html(JSONchunk);
},

HIHandler: function () {
    var HIObj = $('textarea[title="Upload Header Images"]');
    var HIChunk = HIObj.html();
    var parsedHI = JSON.parse('{"HI":[' + HIChunk + ']}');
    $.each(parsedHI.HI, function (index, value) {
        $('.HIcontainerAll').append($('<div>').attr({ 'class': 'HIRow', 'id': 'HIRow' + index }));
	    //get current Box id
        $currBoxId = '#HIRow' + index;
        var tempLink1 = value.link;
        $($currBoxId).append('<a href="' + tempLink1 + '" target="_blank"/>');
        $($currBoxId + ' a').append($('<img>').attr({ "class": "ImageContainer", "src": tempLink1 })); //.html($('<a>').attr({ 'class': '', 'href': tempLink1 }).html(value.title)));
        $($currBoxId).append($('<div>').attr({ 'class': 'ILCross' }).text("x"));
    });
},

AddHIHandler: function () {
	if($('.HIInput').val()!==""){
    var sText,
       sLink,
       JSONString,
       jsonHI,
       HIObj,
       JSONchunk;
    sLink = $('.HIInput').attr('data-link');
    sText = $('.HIInput').attr('data-title');
    HIObj = $('textarea[title="Upload Header Images"]');
    JSONchunk = HIObj.html();
    var index = $('.HIRow').length + 1;
    $('.HIcontainerAll').append($('<div>').attr({ 'class': 'HIRow', 'id': 'HIRow' + index }));
    //get current Box id
    $currBoxId = '#HIRow' + index;
    $($currBoxId).append('<a href="' + sLink + '" target="_blank"/>');
    $($currBoxId+' a').append($('<img>').attr({ "class": "ImageContainer", "src": sLink })); //.html($('<a>').attr({ 'class': '', 'href': tempLink1 }).html(value.title)));
    $($currBoxId).append($('<div>').attr({ 'class': 'ILCross' }).text("x"));
    jsonHI = {
        'title': sText,
        'link': sLink
    };
    if (JSONchunk === "") {
        JSONchunk = JSON.stringify(jsonHI);
    }
    else {
        JSONchunk = JSONchunk + ',' + JSON.stringify(jsonHI);
    }
    HIObj.html(JSONchunk);
    //clear input button
    $('.HIInput').attr({
        'data-link': "",
        'data-title': ""
    }).val("");
    }
},

RemoveHIHandler: function (sourceObject) {
    $(sourceObject).parent('.HIRow').remove();
   var sText="",
   sDesc="",
   sLink = "",
   JSONString,
   jsonHI,
   HIObj,
   JSONchunk = "",
   docObject;
   HIObj = $('textarea[title="Upload Header Images"]');
    $('.HIRow a').each(function () {
        sText = $(this).html();
        sLink = $(this).attr('href');
        jsonHI = {
            'title': sText,
            'link': sLink
        };
        if (JSONchunk === "") {
            JSONchunk = JSON.stringify(jsonHI);
        }
        else {
            JSONchunk = JSONchunk + ',' + JSON.stringify(jsonHI);
        }
    });
    HIObj.html(JSONchunk);
},

MAHandler:function(){
	$('.MembershipOffered .ms-RadioText input:checked').each(function(){
		var tempTitle = $(this).parent().attr("title");
		$(this).parent().append('<input type="text" placeholder="Enter the amount" class="MembershipAmount" title="'+tempTitle+'" >');
	});
	var MAObj = $('textarea[title="Membership Amount"]');
	var MAChunk = MAObj.html();
	var parsedMA = JSON.parse(MAChunk);
    $.each(parsedMA, function (index, value) {
    	$('.MembershipAmount[title="'+index+'"]').val(value);
    });
},

GECHandler:function(){
	$('.GymEquipment .ms-RadioText input:checked').each(function(){
		var tempTitle = $(this).parent().attr("title");
		$(this).parent().append('<input type="text" placeholder="Count" class="GymEquipmentCount" title="'+tempTitle+'" >');
	});
	var GECObj = $('textarea[title="Gym Equipment Count"]');
	var GECChunk = GECObj.html();
	var parsedGEC = JSON.parse(GECChunk);
    $.each(parsedGEC, function (index, value) {
    	$('.GymEquipmentCount[title="'+index+'"]').val(value);
    });
},


uploadHI:function(e){
    e.preventDefault();
    e.stopPropagation();
    urlString = "https://gymtrekker-public.sharepoint.com/Gym%20Images/Forms/Upload.aspx";
    var options = {
        url: urlString,
        dialogReturnValueCallback: function (dialogResult) {
            tempLink = arguments[1].newFileUrl;
            tempTitle = tempLink.split('/')
            tempTitle = tempTitle[tempTitle.length - 1];
            $('.HIInput').attr('data-link', tempLink);
            $('.HIInput').attr('data-title', tempTitle);
            $('.HIInput').append("<a>").attr('src', tempLink).val(tempTitle);
        }
    };
    SP.UI.ModalDialog.showModalDialog(options);
},

upload:function(e){
    e.preventDefault();
    e.stopPropagation();
    urlString = "https://gymtrekker-public.sharepoint.com/Gym%20Images/Forms/Upload.aspx";
    var options = {
        url: urlString,
        dialogReturnValueCallback: function (dialogResult) {
            tempLink = arguments[1].newFileUrl;
            tempTitle = tempLink.split('/')
            tempTitle = tempTitle[tempTitle.length - 1];
            $('.SDInput').attr('data-link', tempLink);
            $('.SDInput').attr('data-title', tempTitle);
            $('.SDInput').append("<a>").attr('src', tempLink).val(tempTitle);
        }
    };
    SP.UI.ModalDialog.showModalDialog(options);
}
}


setTimeout(function() {
	$('a').each(function () {
	$(this).attr({"target":"_blank"})
});
      // Do something after 5 seconds
}, 5000);

function getURLParameter() {
    var url = window.location.href,
    retObject = {},
    parameters,
    urlLocation, urlLocationLength, pageName, urlParam;
    if (url.indexOf('?') === -1) {
        return null;
    }
    urlLocation = url.split('?')[0];
    urlLocationLength = url.split('/').length - 1;
    pageName = url.split('/')[urlLocationLength].split('.')[0];
    urlParam = url.split('?')[1];
    parameters = urlParam.split('&');
    for (var i = 0; i < parameters.length; i++) {
        retObject[parameters[i].split('=')[0]] = parameters[i].split('=')[1];
    }
    retObject["PageName"] = pageName;
    return retObject;
}

function UpdateTitle(){
	$('.Help').each(function () {
		var temp = $(this).attr('data-id')
		$(this).attr({'title':temp+' Help'});
	});
}

function OpenViewBestPractices() {
    window.open("https://microsoft.sharepoint.com/teams/GGA/Pages/ViewBestPractice.aspx?itemid=" + getURLParameter().itemid, "_self");
}

function OpenBestPractice(){
window.open("https://microsoft.sharepoint.com/teams/GGA/Pages/BestPractice.aspx","_self");
}

$(document).click(function (e) {
	var onclick=$('.svBtn').attr('onclick');
	if(onclick)
	{
		var gtitle = getURLParameter().gym;
		var glocality = getURLParameter().locality;
		var gid = getURLParameter().GymID;
		if(gid){
			onclick=onclick.split('{')[0]+'{https://gymtrekker-public.sharepoint.com/SitePages/viewGym.aspx?gymID='+gid+'}\')';	
		}
		else
		{
			onclick=onclick.split('{')[0]+'{https://gymtrekker-public.sharepoint.com/SitePages/viewGym.aspx?gym='+gtitle+'&locality='+glocality+'}\')';
		}
		$('.svBtn').attr('onclick',onclick);
	}
});
