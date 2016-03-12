/**
 * Created by chenxin on 3/4/2016.
 */
angular.module('socially').directive('addNewPartyModal', function () {
    return {
        restrict: 'E',
        templateUrl: 'client/parties/add-new-party-modal/add-new-party-modal.html',
        controllerAs: 'addNewPartyModal',
        controller: function ($scope, $stateParams, $reactive, $mdDialog) {
            $reactive(this).attach($scope);

            this.helpers({
                    isLoggedIn: function(){
                    return Meteor.userId() !== null;
            }
        });

            this.newParty = {};

            this.addNewParty = function(){
                this.newParty.owner = Meteor.userId();
                this.newParty.images = (this.newParty.images || {}).map(function(image){
                        return image._id;
                });

                Parties.insert(this.newParty);
                this.newParty = {};
                $mdDialog.hide();
            };
            this.close = function(){
                $mdDialog.hide();
            };
            this.addImages = function(files){
                if(files.length > 0){
                    var reader = new FileReader();

                    reader.onload = function(e){
                        $scope.$apply(function(){
                            this.cropImgSrc = e.target.result;
                        this.myCroppedImage = '';
                    });
                    };

                    reader.readAsDataURL(files[0]);
                }
                else {
                    this.cropImgSrc = undefined;
                }
            }

            this.saveCroppedImage = function(){
                if (this.myCroppedImage !== '') {
                    Images.insert(this.myCroppedImage, function(err, fileObj){
                        if (!this.newParty.images) {
                        this.newParty.images = [];
                    }

                    this.newParty.images.push(fileObj);
                    this.cropImgSrc = undefined;
                    this.myCroppedImage = '';
                });
                }
            };
        }
    }
});