/**
 * Created by root on 09.04.14.
 */

	//$.cookie('token')
	//клиентская валидация
	//
	//ответы от сервера
	/*
	 * type for show: danger, warning, success, info
	 */
var t_cookie = $.cookie('token');
//узнаем адрес
var myLocation = function(ur){
	var ar = ur.split('/');
	return ar[ar.length -1];
}
//проверка на сущесвование
var undefCheck = function(check){
	if(typeof check !== 'undefined')
		return true;
	else
		return false;
}
//если токен существует устанавливаем хедеры в запросы
if(typeof t_cookie !== 'undefined'){
	$.ajaxSetup({
		headers:{Authorization: $.cookie('token')}
	})
}
//вывод общих сообщений
var show = function(type, message){
	$('#top').after('<div class="alert alert-' + type + '" id="alert">' + message + '</div>');
	$('#alert').slideUp(4000);
}

if(undefCheck($.cookie('message_type'))&&undefCheck($.cookie('message_mess'))){
	show($.cookie('message_type'), $.cookie('message_mess'));
	$.removeCookie('message_type');
	$.removeCookie('message_mess');
}

//redirects
switch(myLocation(window.location.href)){
	case 'index.html':
		if(typeof t_cookie !=='undefined'){
			$.cookie('message_type',"info");
			$.cookie('message_mess','You are loged in');
			window.location.href = "../test/main.html";
		}
		break;
	case 'signup.html':
		if(typeof t_cookie !=='undefined'){
			$.cookie('message_type',"info");
			$.cookie('message_mess','You are loged in');
			window.location.href = "../test/main.html";
		}
		break;
	case 'signin.html':
		if(typeof t_cookie !=='undefined'){
			window.location.href = "../test/main.html";
		}
		break;

	case 'profile.html':
		if(typeof t_cookie === 'undefined'){
			$.cookie('message_type',"danger");
			$.cookie('message_mess','Please sing in or sing up');
			window.location.href = "../test/index.html";
		}
		break;
	case 'main.html':
		if(typeof t_cookie ==='undefined'){
			$.cookie('message_type',"danger");
			$.cookie('message_mess','Please sing in or sing up');
			window.location.href = "../test/index.html";
		}
		break;
}

//лог аут
$('#logout').click(function(){
	$.removeCookie('token');
	window.location.href = "../test/index.html"
});


//авторизация
$('#btn_login').click(function(){
	var flag1 = false;
	var flag2 = false;
	if($('#inp_mail').val().length>5){
		flag1 = true;
	}
	if($('#inp_pass').val().length>5){
		flag2 = true;
	}
	if(flag1&&flag2){
		$.ajax(
			{
				type: 'POST',
				url: 'http://192.168.0.122/api/user/signin',
				headers:{'Authorization':'Basic '+ btoa($('#inp_mail').val()+':'+$('#inp_pass').val())},
				success: function (data){
					$.cookie('token',data.token);
					$.cookie('message_type','success');
					$.cookie('message_mess','Welcome!');
					window.location.href= '../test/main.html';
				}
			}
		);
	}
});

//регистрация
$('#btn_signup').click(function(){
	
});

/*
auth
	$('#c1').click(function(){
		alert(24);
		$.ajax(
			{
				type: 'POST',
				url: 'http://192.168.0.122/api/user/signin',
				headers:{'Authorization':'Basic '+ btoa('client@mail.com:123456')},
				success: function (data){
					$.cookie('token',data.token);
					$('#tok').val('Basic ' + $.cookie('token'));
				}
			}
		);


	});

//get datas
	$('#c2').click(function()
	{
		$('#tok').val('Token ' + $.cookie('token'));
		$.ajax(
			{
				type: 'GET',
				url: 'http://192.168.0.122/api/user/profile',
				headers:{Authorization: $.cookie('token')}
			}
		).done(function(){
				alert("FAIL");
			}).fail();
	});


//send data
	$('#c3').click(function()
	{
		$.ajax(
			{
				type: 'POST',
				url: 'http://192.168.0.122/api/user/update',
				headers:{Authorization: $.cookie('token')},
				data:{'first_name':'12'},
				success: function (data){
					console.log(data);
				}
			}
		).fail(function(){
				alert("FAIL");
			});
	});

$('#c4').click(function(){
	alert('removed');
	$(this).html('c4');
	$.removeCookie('token');
});

*/
