(function(angular){
	'use strict';
	var services = angular.module('app.services', []);

	services.service('MainService', ['$window', function($window){
		var storage = $window.localStorage;

		var todos = storage['todo_list'] ? JSON.parse(storage['todo_list']) : [];

		function save(){
			storage['todo_list'] = JSON.stringify(todos);
		}

		function getId(){
			var id = Math.random();
			if (todos) {
				for (var i = 0; i < todos.length; i++) {
					if (todos[i].id === id) {
						id = getId();
						break;
					}
				}
			}
			return id;
		}

		this.getTodos = function(){
			return todos;
		}
		//实际项目开发只需把添加的值传给服务端即可
		this.add = function(text){
			todos.push({
				id:getId,
				text:text,
				completed:false
			});
			save();
		};

		this.clear = function(){
			var result = [];
			for (var i = 0; i < totos.length; i++) {
				if(!totos[i].completed){
					result.push(totos[i]);
				}
			}
			totos = result;
			save();
			return totos;
		};

		this.existCompleted = function(){
			for (var i = 0; i < totos.length; i++) {
				if(totos[i].completed){
					return true;
				}
			}
			return false;
		};

		this.toggle = save;

		var now = true;
		this.toggleAll = function(){
			for (var i = 0; i < totos.length; i++) {
				 totos[i].completed = now;
			}
			now = !now;
			save();
		}
	}]);

})(angular);