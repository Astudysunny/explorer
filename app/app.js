'use strict';

angular.module('ethExplorer', ['ngRoute','ui.bootstrap'])

.config(function($routeProvider, $locationProvider) {
        $routeProvider.
            when('/', {
                templateUrl: 'views/main.html',
                controller: 'mainCtrl'
            }).
            when('/block/:blockId', {
                templateUrl: 'views/blockInfos.html',
                controller: 'blockInfosCtrl'
            }).
            when('/tx/:transactionId', { // make it compatible with metamask
                templateUrl: 'views/transactionInfos.html',
                controller: 'transactionInfosCtrl'
            }).
            when('/address/:addressId', {
                templateUrl: 'views/addressInfo.html',
                controller: 'addressInfoCtrl'
            }).
            otherwise({
                redirectTo: '/'
            });

		// use the HTML5 History API. needs base href and server-side rewrite.
		$locationProvider.html5Mode(true);
    })
    .run(function($rootScope) {
        var web3 = new Web3();
        var eth_node_url = 'http://localhost:8501'; // TODO: remote URL (changed to yuanma rpc port 8501)
		web3.setProvider(new web3.providers.HttpProvider(eth_node_url));
        $rootScope.web3 = web3;
		window.web3 = web3; //XXX inject it to console for debugging
        function sleepFor( sleepDuration ){
            var now = new Date().getTime();
            while(new Date().getTime() < now + sleepDuration){ /* do nothing */ } 
        }
        var connected = false;
        if(!web3.isConnected()) {
            $('#connectwarning').modal({keyboard:false,backdrop:'static'}) 
            $('#connectwarning').modal('show') 
        }
    });
