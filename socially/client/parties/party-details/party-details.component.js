/**
 * Created by chenxin on 2/25/2016.
 */
angular.module('socially').directive('partyDetails', function () {
    return {
        restrict: 'E',
        templateUrl: 'client/parties/party-details/party-details.html',
        controllerAs: 'partyDetails',
        controller: function ($scope, $stateParams,$reactive) {
            $reactive(this).attach($scope);
            this.subscribe('parties');
            this.subscribe('users');

            this.helpers({
                party: function(){
                    return Parties.findOne({ _id : $stateParams.partyId });
                },
                users:function(){
                    return Meteor.users.find({});
                }
            });

            this.save = function(){
                Parties.update({_id: $stateParams.partyId}, {
                    $set: {
                        name: this.party.name,
                        description: this.party.description,
                        'public': this.party.public
                    }
                },function(error){
                    if(error){
                        console.log('Oops, unable to update the party...');
                    }
                    else {
                        console.log('Done!');
                    }
                });
            };
        }
    }
});