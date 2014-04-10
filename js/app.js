/**
 * Created by root on 09.04.14.
 */

	/* клиентская валидация
	 * Адаптивная верстка
	 * type for show: danger, warning, success, info
	 */

//куки токена
var t_cookie = $.cookie('token');

//узнаем адрес
var myLocation = function (ur) {
	var ar = ur.split('/');
	return ar[ar.length - 1];
};

//проверка на сущесвование
var undefCheck = function(check){
	return typeof check !== 'undefined';
}

//обработка массива ошибок с сервера
var showErrors = function (arr) {
	var makeErrorLog = '';
	var c = 0;
	arr.forEach(function (entry) {
		c += 1;
		makeErrorLog += c + ") " + entry + "<br/>";
	});
	show('danger', makeErrorLog, true);
};

//если токен существует устанавливаем хедеры в запросы
if(typeof t_cookie !== 'undefined'){
	$.ajaxSetup({
		headers:{Authorization: $.cookie('token')}
	})
}

//вывод сообщений
var show = function (type, message, c) {
	$('#top').after('<div class="alert alert-' + type + '" id="alert">' + message + '</div>');
	if (c) {
		$('#alert').click(function () {
			$(this).fadeOut(1000);
		})
	} else {
		$('#alert').slideUp(4000);
	}
};

//вывод сообщений с других страниц
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
			$.cookie('message_type',"info");
			$.cookie('message_mess','You are loged in');
			window.location.href = "../test/main.html";
		}
		break;

	case 'profile.html':
		if(typeof t_cookie === 'undefined'){
			$.cookie('message_type',"danger");
			$.cookie('message_mess','Please sing in or sing up');
			window.location.href = "../test/index.html";
		}else{
			$.ajax({
				type: 'GET',
				url: 'http://192.168.0.122/api/user/profile',
				success: function(data){
					$('#inp_mail').val(data.user['email']);
					$('#inp_first_name').val(data.user['first_name']);
					$('#inp_last_name').val(data.user['last_name']);
					$('#inp_phone').val(data.user['phone']);
					$('#inp_fb').val(data.user['facebook_id']);
				}
			});
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

//лог аут, вывод сообщения
$('#logout').click(function(){
	$.removeCookie('token');
	$.cookie('message_type',"info");
	$.cookie('message_mess','You are logout');
	window.location.href = "../test/index.html"
});


//авторизация, обработка ошибок сервера, вывод сообщения в случае успеха
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
				},
				error: function(data){
					showErrors(data.responseJSON.errors);
				}
			}
		);
	}
});

//регистрация обработка ошибок сервера, вывод сообщения в случае успеха
$('#btn_signup').click(function(){
	var form = $('#login').serialize();
	$.ajax({
		type: 'POST',
		url: 'http://192.168.0.122/api/user/signup',
		data: form,
		success: function(data){
			$.cookie('token',data.token);
			$.cookie('message_type',"info");
			$.cookie('message_mess','You are signed up');
			window.location.href = '../test/main.html'
		},
		error: function(data){
			showErrors(data.responseJSON.errors);
		}
	});
});


//update data обрабатывает ошибки сервера, выводит сообщение в случае успеха
$('#btn_update').click(function(){
	var form = $('#form_profile').serialize();
	$.ajax(
		{
			type: 'POST',
			url: 'http://192.168.0.122/api/user/update',
			data:form,
			success: function (data){
				$('#inp_mail').val(data.user['email']);
				$('#inp_first_name').val(data.user['first_name']);
				$('#inp_last_name').val(data.user['last_name']);
				$('#inp_phone').val(data.user['phone']);
				$('#inp_fb').val(data.user['facebook_id']);
				show('success','Success!',false);
			}
		}
	).fail(function(data,st1,st2){
			showErrors(data.responseJSON.errors);
		});
});
