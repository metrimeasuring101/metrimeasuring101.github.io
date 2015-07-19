$(function(){
	var app_id = '459754380852628';
	var scopes = 'email, user_friends';

	var btn_login = '<a href="#" id="login" class="ion-social-facebook"></i></a>';

	var div_session = "<div id='facebook-session'>"
					+ "<strong></strong><br>"
					+ "<img><br>"
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
        callback(response);
    });
  }
  var getFacebookData = function(){
  		FB.api('/me', function(response){
  			$('#login').after(div_session);
  			$('#login').remove();
  			$('#facebook-session strong').text("Welcome, " + response.name);
  			$('#facebook-session img').attr('src', 'https://graph.facebook.com/' + response.id + '/picture?type=large');
  		})
  }

  var facebookLogin = function(){
  	checkLoginState(function(response){
  		if(response.status !== 'connected'){
  			FB.login(function(response){
  				if(response.status === 'connected'){
  					getFacebookData();
  				}
  			}, {scope: scopes});
  		}
  
  	})
  }

  var facebookLogout = function(){

    FB.getLoginStatus(function(response) {
      if(response.status === 'connected') {
        $('#facebook-session').before(btn_login);
        $('#facebook-session').remove(); 
      }     
    })
  }

  $(document).on('click', '#login', function(e){
    e.preventDefault();

    facebookLogin();
  })

  $(document).on('click', '#logout', function(e){
    e.preventDefault();


    if(confirm("Sure?"))
      facebookLogout();
    else
      return false;
  })
})