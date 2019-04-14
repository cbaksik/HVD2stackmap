/**
 * Created by samsan on 4/7/19.
 */


(function(){

    angular.module('viewCustom')
        .controller('stackmapComponentCtrl', ['customService','customConfig', function (customService, config) {
            let vm=this;
            let svconfig = config;
            vm.pnxItem = {};
            vm.holding = {};
            vm.stackmapdata = {};
            // initialize custom service search
            let sv=customService;
            vm.getStackMapData=function () {
                let url = svconfig.stackmapurl;
                let param = {callno: vm.holding.callno, location: vm.holding.location, library: vm.holding.library};
                sv.getAjax(url,param,'get')
                    .then(function (res) {
                            if(res) {
                                vm.stackmapdata = res.data.results;
                                console.log('*** data ***');
                                console.log(res.data);
                            }
                        },
                        function (error) {
                            console.log('*** stackmapdata error ***');
                            console.log(error);
                        }
                    )
            };


            vm.$onInit=()=>{

            };

            vm.$onChanges=function() {
                vm.pnxItem = vm.parentCtrl.item;
                console.log(vm.pnxItem);
                setTimeout(()=> {
                    if(vm.pnxItem.delivery) {
                        if(vm.pnxItem.delivery.holding) {
                            vm.holding = getHolding(vm.pnxItem.delivery.holding[0]);
                            vm.getStackMapData();
                        }
                    }
                }, 1000);


            };

            let getHolding = (holding) => {
                let callNumber = holding.callNumber;
                callNumber = callNumber.replace(/[\(\)]/g, '');
                let location = holding.subLocation;
                let library = holding.libraryCode;
                let newHolding = {callno: callNumber, location: location, library: library};
                return newHolding;
            };


            vm.openMap = function() {
               let title = '';
               if(vm.pnxItem.pnx) {
                   if(vm.pnxItem.pnx.display) {
                       title = vm.pnxItem.pnx.display.title[0];
                   }
               }
                let url='/primo-explore/stackmap/' + vm.holding.location + '/' + vm.stackmapdata.library;
                url = url + '?vid=' + svconfig.vid +'&callno=' + vm.holding.callno +'&title=' + title;

               window.open(encodeURI(url),'_blank');
            }

        }]);



    angular.module('viewCustom')
        .component('stackmapComponent', {
            bindings: {parentCtrl: '<'},
            controller: 'stackmapComponentCtrl',
            controllerAs:'vm',
            templateUrl:['customConfig', (config)=>{
               return '/primo-explore/custom/' + config.vid + '/html/stackmap-component.html';
            }]

        });

})();