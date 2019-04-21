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
            vm.librarynames = sv.getLibraryNames();
            vm.getStackMapData=function () {
                let url = svconfig.stackmapurl;
                let param = {callno: vm.holding.callno, location: vm.holding.location, library: vm.holding.library};
                sv.getAjax(url,param,'get')
                    .then(function (res) {
                            if(res) {
                               vm.stackmapdata = decodelibrarydata(res.data.results);
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
                setTimeout(()=> {
                    if(vm.pnxItem.delivery) {
                        if(vm.pnxItem.delivery.holding) {
                            vm.holding = getHolding(vm.pnxItem.delivery.holding[0]);
                            if(vm.holding.callno && vm.holding.location && vm.holding.library) {
                                vm.getStackMapData();
                            }
                        }
                    }
                }, 1000);


            };

            let getHolding = function (holding) {
                let newHolding = {callno: '', location: '', library: ''};
                if(holding) {
                    let library = '';
                    let index = vm.librarynames.findIndex((a)=> {
                        return a.code == holding.libraryCode;
                    });
                    if (index !== -1) {
                        library = vm.librarynames[index].name + ' Library';
                        let callNumber = holding.callNumber;
                        callNumber = callNumber.replace(/[\(\)]/g, '');
                        let location = holding.subLocation;
                        newHolding = {callno: callNumber, location: location, library: library};
                    }
                }
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
            };

            let decodelibrarydata = (data) => {
                let location = {flag: false, library:'', callno:'', location:'', floorname:[], mapurl:'', rows:[]};
                if(data) {
                    location.library = data.library;
                    location.callno = data.callno;
                    location.location = data.location;
                    location.flag = true;
                    if(data.maps) {
                        for(let i=0; i < data.maps.length; i++) {
                            let floorname = data.maps[i]['floorname'];
                            location.floorname.push(floorname);
                            location.mapurl = data.maps[0]['mapurl'];
                            let ranges = data.maps[i]['ranges'];
                            for (let i = 0; i < ranges.length; i++) {
                                let label = ranges[i]['label'];
                                let labelObj = sv.decodeLibraryLocation(label);
                                location.rows.push(labelObj);
                            }
                        }
                    }
                }

                return location;
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