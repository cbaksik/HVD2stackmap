/**
 * Created by samsan on 4/14/19.
 */
(function(){

    angular.module('viewCustom')
        .controller('stackmapPageCtrl', ['customService','customConfig', '$stateParams', '$location', function (customService, config, $stateParams, $location) {
            let vm=this;
            let params = $stateParams;
            let location = $location;
            let svconfig = config;
            let sv = customService;
            vm.library = params.library;
            vm.location = params.location;
            vm.pnxItem = {};
            vm.holding = {};
            vm.stackmapdata = {};

            let hideSearchBar = function() {
                let el = document.getElementsByTagName('prm-search-bar')[0];
                let el2 = document.getElementsByTagName('prm-topbar')[0];
                if(el) {
                    el.style.display = 'none';
                }
                if(el2) {
                    el2.style.display = 'none';
                }
            };

            let getStackMapData=function () {
                let url = svconfig.stackmapurl;
                let param = {callno: vm.callno, location: vm.location, library: vm.library};
                sv.getAjax(url,param,'get')
                    .then(function (res) {
                            if(res) {
                                vm.stackmapdata = res.data.results;
                            }
                        },
                        function (error) {
                            console.log('*** stackmapdata error ***');
                            console.log(error);
                        }
                    )
            };



            vm.$onInit= function() {
                vm.title = $location.$$search.title;
                vm.callno = $location.$$search.callno;
                vm.vid = $location.$$search.vid;
                getStackMapData();

            };

            vm.$onChanges=function() {
                hideSearchBar();
            };



        }]);



    angular.module('viewCustom')
        .component('stackmapPage', {
            bindings: {parentCtrl: '<'},
            controller: 'stackmapPageCtrl',
            controllerAs:'vm',
            templateUrl:['customConfig', (config)=>{
                return '/primo-explore/custom/' + config.vid + '/html/stackmap-page.html';
            }]

        });

})();