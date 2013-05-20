'use strict';

/* jasmine specs for modules go here */

describe('App Module:', function(){
  var module;
  module = angular.module("451order");

  it('should be registered.', inject(function() {
    expect(module).not.toBe(null);
  }));
});

describe('$451 Factory:',inject(function(){
	var $451;
	beforeEach(module('451order'));
	beforeEach(inject(function(_$451_) {
		$451 = _$451_;
	}));

	it('Should return api url', function() {
		var url = $451.api('order');
		expect(url).toBe('/api/' + $451.appname + '/order');
	});

	it('Should return filtered JSON object', function() {
		var obj = [
			{ type: 'a', status: '1' },
			{ type: 'z', status: '26' }
		];
		var result = $451.filter.on('type').for(obj, 'type:a');
		expect(result.length).toBe(1);
		expect(result[0].status).toBe('1');
	});
}));