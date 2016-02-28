/**
 * Created by chenxin on 2/28/2016.
 */
angular.module('socially').filter('displayName',function(){
   return function (user){
       if(!user){
           return '';
       }

       if (user.profile && user.profile.name){
           return user.profile.name;
       }
       else if(user.emails) {
           return user.emails[0].address;
       }
       else {
           return user;
       }
   }
});