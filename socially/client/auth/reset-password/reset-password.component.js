angular.module("socially").directive('resetpw', function() {
    return {
        restrict: 'E',
        templateUrl: 'client/auth/reset-password/reset-password.html',
        controllerAs: 'resetpw',
        controller: function ($scope, $reactive, $state) {
            $reactive(this).attach($scope);

            this.credentials = {
                email: ''
            };

            this.error = '';

            this.reset = function(){
                Accounts.forgotPassword(this.credentials, function(err){
                    if (err) {
                        this.error = err;
                    }
                    else {
                        $state.go('parties');
            }
            });
            };
        }
    }
});