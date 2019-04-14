/**
 * Created by samsan on 3/26/18.
 * This header will use for image component page and image detail page
 */


(function () {

    angular.module('viewCustom')
        .controller('customHeaderCtrl',[function () {
            let vm=this;

        }]);

    angular.module('viewCustom')
        .component('customHeader',{
            bindings:{parentCtrl:'<'},
            controller: 'customHeaderCtrl',
            controllerAs:'vm',
            templateUrl:['customConfig', (config) => {
             return '/primo-explore/custom/'+ config.vid + '/html/custom-header.html'
            }]
        });

})();
