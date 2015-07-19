$(function(){
	var app_id = '516027895216770';
	var scopes = 'email, user_friends, user_online_presence';

	var btn_login = '<a href="#"><i style="font-size: 50px;" class="ion-social-facebook"></i></a>';

	var div_session = "<div id='facebook-session'>"
					+ "<strong></strong>"
					+ "<img>"
					+ "<a href='#' id='logout' class='btn btn-danger'> Log out</a>"
					+ "<div>";


window.fbAsyncInit = function() {
	
	FB.init({
		appId      : app_id,
		status 		: true,
		cookie     : true,
		xfbml      : true,
		version    : 'v2.2'
	});

	FB.getLoginStatus(function(response) {
		statusChangeCallback(response);
	});

};

 var statusChangeCallback = function(response, callback) {
    console.log('statusChangeCallback');
    console.log(response);

    if (response.status === 'connected') {
    	getFacebookData(); 
    } else {
      	callback(false);
    }
  }

  var  checkLoginState = function(callback) {
    FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
    });
  }
  var getFacebookData = function(){
  		FB.api('/me', function(response){
  			$('#login').after('div_session');
  			$('#login').remove();
  			$('#facebook-session strong').text("Welcome, " + response.name);
  			$('#facebook-session img').attr('src', 'https://graph.facebook.com/' + response.id + '/picture?type=large');
  		})
  }

  var facebookLogin = function(){
  	checkLoginState(function(response){
  		if(!response){
  			FB.login(function(response){
  				if(response.status === 'connected'){
  					getFacebookData();
  				}
  			}, {scope: scopes});
  		}
  
  	})
  }

  #(document).on('click', '#login', function(e){
  	e.prevenDefault();

  	facebookLogin();
  })

})




// (function(d, s, id) {
//     var js, fjs = d.getElementsByTagName(s)[0];
//     if (d.getElementById(id)) return;
//     js = d.createElement(s); js.id = id;
//     js.src = "//connect.facebook.net/en_US/sdk.js";
//     fjs.parentNode.insertBefore(js, fjs);
//   }(document, 'script', 'facebook-jssdk'));