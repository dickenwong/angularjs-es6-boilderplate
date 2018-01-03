import angular from 'angular';
import template from './test-component.html';
import TestComponentController from './test-component.controller';
import './test-component.scss';


const component = {
  template,
  controller: TestComponentController,
  bindings: {},
};


export default angular
  .module('testComponent', [])
  .component('testComponent', component)
  .name;
