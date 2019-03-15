/**
 * Created by samsan on 5/23/17.
 * If image width is greater than 600pixel, it will resize base on responsive css.
 * It use to show a single image on the page. If the image does not exist, it use icon_image.png
 */

angular.module('viewCustom')
    .component('singleImage', {
        templateUrl:'/primo-explore/custom/HVD2/html/singleImage.html',
        bindings: {
          src:'<',
          imgtitle: '<',
          restricted:'<',
          jp2:'<'
        },
        controllerAs:'vm',
        controller:['$element','$window','$location','prmSearchService','$timeout','$sce',function ($element,$window,$location,prmSearchService, $timeout,$sce) {
            var vm=this;
            var sv=prmSearchService;
            // set up local scope variables
            vm.imageUrl='';
            vm.showImage=true;
            vm.params=$location.search();
            vm.localScope={'imgClass':'','loading':true,'hideLockIcon':false};
            vm.isLoggedIn=sv.getLogInID();
            vm.clientIp=sv.getClientIp();

            // check if image is not empty and it has width and height and greater than 150, then add css class
            vm.$onChanges=function () {
                vm.clientIp=sv.getClientIp();
                vm.isLoggedIn=sv.getLogInID();

                if(vm.restricted && !vm.isLoggedIn && !vm.clientIp.status) {
                    vm.showImage=false;
                }
                vm.localScope={'imgClass':'','loading':true,'hideLockIcon':false};
                if(vm.src && vm.showImage) {
                    var url = sv.getHttps(vm.src) + '?buttons=Y';
                    vm.imageUrl = $sce.trustAsResourceUrl(url);
                }

                vm.localScope.loading=false;

            };

            // login
            vm.signIn=function () {
                var auth=sv.getAuth();
                var params={'vid':'','targetURL':''};
                params.vid=vm.params.vid;
                params.targetURL=$window.location.href;
                var url='/primo-explore/login?from-new-ui=1&authenticationProfile='+auth.authenticationMethods[0].profileName+'&search_scope=default_scope&tab=default_tab';
                url+='&Institute='+auth.authenticationService.userSessionManagerService.userInstitution+'&vid='+params.vid;
                if(vm.params.offset) {
                    url+='&offset='+vm.params.offset;
                }
                url+='&targetURL='+encodeURIComponent(params.targetURL);
                $window.location.href=url;
            };

        }]
    });
