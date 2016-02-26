/**
 * Created by chenxin on 2/25/2016.
 */
angular.module('socially').directive('partiesList', function() {
    return {
        restrict: 'E',
        templateUrl: 'client/parties/parties-list/parties-list.html',
        controllerAs: 'partiesList',
        controller: function($scope, $reactive) {
            $reactive(this).attach($scope);
            this.newParty = {};

            this.subscribe('parties');

            this.helpers({
                parties: function() {
                    return Parties.find({});
                }
            });
            this.addParty = function(){
                this.newParty.owner = Meteor.user()._id;
                Parties.insert(this.newParty);
                this.newParty = {};
            };

            this.removeParty = function(party){
                Parties.remove({_id: party._id});
            }
        }
    }
});