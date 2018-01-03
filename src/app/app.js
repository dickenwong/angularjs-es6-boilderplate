/* eslint-disable import/first */

import angular from 'angular';
import Raven from 'raven-js';
import ravenAngularPlugin from 'raven-js/plugins/angular';
import secrets from './secrets';

if (process.env.NODE_ENV === 'production') {
  Raven
    .config(secrets.sentryPublicDSN)
    .addPlugin(ravenAngularPlugin, angular)
    .install();
  console.log('Raven installed');
}

import uiRouter from '@uirouter/angularjs';
import 'normalize.css';
import './app.scss';
import template from './app.html';
import AppController from './app.controller';
import components from './components/components';


function config($locationProvider) {
  'ngInject';

  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false,
  });
}


export default angular
  .module('app', [
    uiRouter,
    components,
  ])
  .config(config)
  .component('app', {
    template,
    controller: AppController,
  })
  .name;
