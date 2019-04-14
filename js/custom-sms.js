/**
 * Created by samsan on 2/13/18.
 * This component is to create text sms icon by inserting it dynamic at prm-action-list-after.js
 */

(function(){

angular.module('viewCustom')
    .controller('customSmsCtrl',['customService',function (customService) {
        var vm=this;
        var cs=customService;
        // display prm-action-container-after when a user click text sms icon
        vm.sendsms=()=> {
            vm.parentCtrl.activeAction='textsms';
            vm.parentCtrl.selectedAction='textsms';
            vm.parentCtrl.expandedAction='';
        }

    }]);

angular.module('viewCustom')
    .component('customSms',{
        bindings:{parentCtrl:'<'},
        controller: 'customSmsCtrl',
        controllerAs:'vm',
        templateUrl:['customConfig', (config) => {
            return '/primo-explore/custom/'+config.vid+'/html/custom-sms.html';
        }]
    });

})();