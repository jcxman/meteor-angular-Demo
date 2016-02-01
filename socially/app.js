/**
 * Created by chenxin on 2/1/2016.
 */

Parties = new Mongo.Collection("parties");

if (Meteor.isClient) {
    angular.module('socially', [
        'angular-meteor',
        'ui.router'
    ]);
    angular.module('socially').config(function ($urlRouterProvider, $stateProvider, $locationProvider) {
        $locationProvider.html5Mode(true);

        $stateProvider
            .state('parties', {
                url: '/parties',
                template: '<parties-list></parties-list>'
            })
            .state('partyDetails', {
                url: '/parties/:partyId',
                template: '<party-details></party-details>'
            });

        $urlRouterProvider.otherwise("/parties");
    });
    angular.module('socially').directive('partiesList', function() {
        return {
            restrict: 'E',
            templateUrl: 'parties-list.html',
            controllerAs: 'partiesList',
            controller: function($scope, $reactive) {
                $reactive(this).attach($scope);
                this.newParty = {};
                this.helpers({
                        parties: function() {
                            return Parties.find({});
                        }
                });
                this.addParty = function(){
                    Parties.insert(this.newParty);
                    this.newParty = {};
                };

                this.removeParty = function(party){
                    Parties.remove({_id: party._id});
                }
            }
        }
    });
    angular.module('socially').directive('partyDetails', function () {
        return {
            restrict: 'E',
            templateUrl: 'party-details.html',
            controllerAs: 'partyDetails',
            controller: function ($scope, $stateParams) {
                this.partyId = $stateParams.partyId;
            }
        }
    });
}