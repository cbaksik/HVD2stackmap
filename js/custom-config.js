/**
 * Created by samsan on 4/7/19.
 */

(function() {
    angular.module('viewCustom')
        .constant('customConfig', {
            "vid": "HVD2stackmap",
            "pnxbaseurl": "",
            "env": {
                "local": "localhost",
                "dev": "harvard-primoalma-stage.hosted.exlibrisgroup.com",
                "qa": "qa.hollis.harvard.edu",
                "prod": ""
            },
            //"stackmapurl": "https://harvard.stackmap.com/json",
            "stackmapurl": "/primo-explore/custom/HVD2stackmap/html/stackmapapi-json-test.html",
            "librarynameurl": "/html/library-name-jsondata.html"
        });

})();