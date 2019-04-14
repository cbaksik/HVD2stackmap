/**
 * Created by samsan on 8/9/17.
 * It remove old logo and replace it with new logo
 */

(function(){

angular.module('viewCustom')
    .controller('prmLogoAfterCtrl',[function () {
        var vm=this;
        vm.$onInit=function () {

        };

    }]);

angular.module('viewCustom')
    .component('prmLogoAfter',{
        bindings:{parentCtrl:'<'},
        controller: 'prmLogoAfterCtrl',
        controllerAs:'vm',
        templateUrl:['customConfig', (config) => {
            return '/primo-explore/custom/' + config.vid + '/html/prm-logo-after.html';
        }]

    });

})();