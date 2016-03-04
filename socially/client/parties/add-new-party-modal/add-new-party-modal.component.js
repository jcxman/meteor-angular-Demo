/**
 * Created by chenxin on 3/4/2016.
 */
angular.module('socially').directive('addNewPartyModal', function () {
    return {
        restrict: 'E',
        templateUrl: 'client/parties/add-new-party-modal/add-new-party-modal.html',
        controllerAs: 'addNewPartyModal',
        controller: function ($scope, $stateParams, $reactive) {
            $reactive(this).attach($scope);

            this.helpers({
                    isLoggedIn: function(){
                    return Meteor.userId() !== null;
            }
        });

            this.newParty = {};

            this.addNewParty = function(){
                this.newParty.owner = Meteor.userId();
                Parties.insert(this.newParty);
                this.newParty = {};
                $scope.$close();
            };
        }
    }
});