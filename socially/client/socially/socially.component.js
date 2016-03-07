/**
 * Created by chenxin on 3/6/2016.
 */
angular.module('socially').directive('socially', function () {
    return {
        restrict: 'E',
        templateUrl: 'client/socially/socially.html',
        controllerAs: 'socially',
        controller: function ($scope, $reactive) {
            $reactive(this).attach($scope);

            this.helpers({
                isLoggedIn: function(){
                    return Meteor.userId() !== null;
                },
                currentUser: function(){
                    return Meteor.user();
                }
            });

            this.logout = function() {
                Accounts.logout();
            }
        }
    }
});