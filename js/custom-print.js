/**
 * Created by samsan on 9/5/17.
 * custom print page
 */

(function () {
    angular.module('viewCustom')
    .controller('customPrintCtrl',['$window','$stateParams',function ($window,$stateParams) {
        var vm=this;
        var params=$stateParams;

        vm.print=function () {
            var url='/primo-explore/printPage/'+vm.parentCtrl.context+'/'+vm.parentCtrl.pnx.control.recordid;
            url+='?vid='+params.vid;
            $window.open(url,'_blank');
        }

    }]);

    angular.module('viewCustom')
    .component('customPrint',{
        bindings:{parentCtrl:'<'},
        controller: 'customPrintCtrl',
        controllerAs:'vm',
        templateUrl: ['customConfig', (config) => {
            return '/primo-explore/custom/' + config.vid + '/html/custom-print.html';
        }]
    });

})();