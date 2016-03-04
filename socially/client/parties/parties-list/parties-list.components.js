/**
 * Created by chenxin on 2/25/2016.
 */
angular.module('socially').directive('partiesList', function() {
    return {
        restrict: 'E',
        templateUrl: 'client/parties/parties-list/parties-list.html',
        controllerAs: 'partiesList',
        controller: function($scope, $reactive,$modal) {
            $reactive(this).attach($scope);
            this.newParty = {};
            this.perPage = 3;
            this.page = 1;
            this.sort = {
                name: 1
            };
            this.orderProperty = '1';
            this.searchText = '';

            this.helpers({
                parties: function() {
                    return Parties.find({}, { sort : this.getReactively('sort') });
                },
                users: function(){
                    return Meteor.users.find({});
                },
                partiesCount: function(){
                    return Counts.get('numberOfParties');
                },
                isLoggedIn: function(){
                    return Meteor.userId() !== null;
                },
                currentUserId: function(){
                    return Meteor.userId();
                }
            });

            this.updateSort = function(){
                this.sort = {
                    name: parseInt(this.orderProperty)
                }
            };

            this.map = {
                center: {
                    latitude: 45,
                    longitude: -73
                },
                options: {
                    maxZoom: 10,
                    styles: [{
                        "featureType": "administrative",
                        "elementType": "labels.text.fill",
                        "stylers": [{"color": "#444444"}]
                    }, {
                        "featureType": "landscape",
                        "elementType": "all",
                        "stylers": [{"color": "#f2f2f2"}]
                    }, {
                        "featureType": "poi",
                        "elementType": "all",
                        "stylers": [{"visibility": "off"}]
                    }, {
                        "featureType": "road",
                        "elementType": "all",
                        "stylers": [{"saturation": -100}, {"lightness": 45}]
                    }, {
                        "featureType": "road.highway",
                        "elementType": "all",
                        "stylers": [{"visibility": "simplified"}]
                    }, {
                        "featureType": "road.arterial",
                        "elementType": "labels.icon",
                        "stylers": [{"visibility": "off"}]
                    }, {
                        "featureType": "transit",
                        "elementType": "all",
                        "stylers": [{"visibility": "off"}]
                    }, {
                        "featureType": "water",
                        "elementType": "all",
                        "stylers": [{"color": "#46bcec"}, {"visibility": "on"}]
                    }]
                },
                zoom: 8
            };

            this.subscribe('users');

            this.subscribe('parties',function(){
               return [
                   {
                       limit: parseInt(this.perPage),
                       skip: parseInt((this.getReactively('page')-1) * this.perPage),
                       sort: this.getReactively('sort')
                   },
                   this.getReactively('searchText')
               ]
            });

            this.addParty = function(){
                this.newParty.owner = Meteor.user()._id;
                Parties.insert(this.newParty);
                this.newParty = {};
            };

            this.removeParty = function(party){
                Parties.remove({_id: party._id});
            };

            this.pageChanged = function(newPage){
                this.page = newPage;
            };

            this.getPartyCreator = function(party){
                if(!party){
                    return '';
                }

                owner = Meteor.users.findOne(party.owner);

                if(!owner){
                    return 'nobody';
                }

                if(Meteor.userId() !== null && owner._id === Meteor.userId()){
                    return 'me';
                }

                return owner;
            };
            this.rsvp = function(partyId, rsvp) {
                Meteor.call('rsvp', partyId, rsvp, function(error){
                    if (error) {
                        console.log('Oops, unable to rsvp!');
                    }
                    else {
                        console.log('RSVP Done!');
                    }
                });
            };

            this.getUserById = function(userId) {
                return Meteor.users.findOne(userId);
            };

            this.outstandingInvitations = function(party){
                return _.filter(this.users, function(user) {
                        return (_.contains(party.invited, user._id) && !_.findWhere(party.rsvps, {user: user._id}));
                });
            };

            this.openAddNewPartyModal = function () {
                $modal.open({
                    animation: true,
                    template: '<add-new-party-modal></add-new-party-modal>'
                });
            };

            this.isRSVP = function(rsvp, party){
                if (Meteor.userId() == null) {
                    return false;
                }

                var rsvpIndex = party.myRsvpIndex;
                rsvpIndex = rsvpIndex || _.indexOf(_.pluck(party.rsvps, 'user'), Meteor.userId());

                if (rsvpIndex !== -1) {
                    party.myRsvpIndex = rsvpIndex;
                    return party.rsvps[rsvpIndex].rsvp === rsvp;
                }
            }
        }
    }
});