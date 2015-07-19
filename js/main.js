var logged_in = false;

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
  					logged_in = true;
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
});

$(document).ready(function() {

	console.log("check if user is logged in: " + logged_in);

	$.ajax({
		url				: "https://api-us.clusterpoint.com/100911/poi/_search.json",
		type			: "POST",
		dataType	: "json",
		data			: '{"query": "*", "docs" : "100"}',
		beforeSend: function (xhr) {
			xhr.setRequestHeader('Authorization', 'Basic ' + btoa('app:asdf1234'));
		},
		success		: function (data) {

				 for (var i = 0; i < data.documents.length; i++) {
					 //print latitude
					 console.log(data.documents[i].lat);


				 }

		},
		fail		: function (data) {
				alert (data.error);

					fail(data);

		}

	});
});
