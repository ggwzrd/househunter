angular.module("houseHunterApp", [])

.run(['$rootScope', '$window', 'authSrv',
  function($rootScope, $window, authSrv) {

    $rootScope.user = {};
    $(".fb-login-btn").css("top","0");
    $window.fbAsyncInit = function() {
      // Executed when the SDK is loaded

      FB.init({

        appId: '1250395821686383',
        channelUrl: "//connect.facebook.net/en_US/all.js",
        status: true,
        cookie: true,
        xfbml: true,
        version: 'v2.3'
      });

      authSrv.watchLoginChange();
    };

    (function(d){
      // load the Facebook javascript SDK

      var js,
      id = 'facebook-jssdk',
      ref = d.getElementsByTagName('script')[0];

      if (d.getElementById(id)) {
        return;
      }

      js = d.createElement('script');
      js.id = id;
      js.async = true;
      js.src = "//connect.facebook.net/en_US/all.js";

      ref.parentNode.insertBefore(js, ref);

    }(document));

}]);
