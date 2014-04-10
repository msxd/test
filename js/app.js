
var myLocation = function(ur){
	console.log(ur);
	var ar = ur.split('/');
	console.log(ar);
	return ar[ar.length -1];
}

var t_cookie = $.cookie('token');

if(typeof t_cookie !== 'undefined'){
	$.ajaxSetup({
		headers:{Authorization: $.cookie('token')}
	})
}



//redirects
switch(myLocation(window.location.href)){
	case 'index.html':
		if(typeof t_cookie !=='undefined'){
			window.location.href = "../test/main.html";
		}
		break;
	case 'signup.html':
		if(typeof t_cookie !=='undefined'){
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
			window.location.href = "../test/index.html";
		}
		break;


	case 'main.html':
		if(typeof t_cookie ==='undefined'){
			window.location.href = "../test/index.html";
		}
		break;
}
