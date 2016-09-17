(function (angular) {
	'use strict';
	/**
	 * 主模块
	 */
	var myApp =angular.module('MyTodoMvc',[]);
	//注册一个控制器
	myApp.controller('MainController', ['$scope', function($scope){
		 
		 function getId(){
		 	var id = Math.random();
		 	for (var i = 0; i < $scope.todos.length; i++) {
		 		if ($scope.todos[i].id === id) {
		 			id = getId();
		 			break;
		 		}
		 	}
		 	return id;
		 }
		//文本框需要一个模型
		$scope.text = '';
		//任务列表
		//{id:1,text:'学习',completed:true}
		$scope.todos = [
			{id:1,text:'学习',completed:false},
			{id:2,text:'睡觉',completed:false},
			{id:3,text:'打豆豆',completed:true}
		];

		//添加todo
		
		$scope.add = function(){
			//空字符串去反的true
			if (!$scope.text) return;
			$scope.todos.push({
				id:getId(),
				text:$scope.text,
				completed:false
			});
			//清空模型文本框
			$scope.text = '';
		};
		//删除
		$scope.remove = function(id){
			for (var i = 0; i < $scope.todos.length; i++) {
				if ($scope.todos[i].id === id) {
					$scope.todos.splice(i,1);
					break;
				}
			}
		};
		//清除
		$scope.clear=function(){
			var result = [];
			for (var i = 0; i <$scope.todos.length; i++) {
				if (!$scope.todos[i].completed ) {
						result.push($scope.todos[i]);
				}
			}
			$scope.todos=result;
		};
		//是否有已经完成的
		$scope.existCompleted = function(){
			var flag = false;
			for (var i = 0; i < $scope.todos.length; i++) {
				if ($scope.todos[i].completed) {
					flag=true;
				}	
			}
			return flag;
		};
		//当前在编辑元素
		$scope.currentEditingId = -1;
		$scope.editing=function(id){
			for (var i = 0; i < $scope.todos.length; i++) {
				if(id === $scope.todos[i].id && $scope.todos[i].completed ){
					$scope.currentEditingId=-1;
					break;
				}
					$scope.currentEditingId=id;
			}
		};
		$scope.save = function(){
			$scope.currentEditingId = -1;
		};
		//多选 
		var now = true;
		$scope.toggleAll = function(){
			for (var i = 0; i < $scope.todos.length; i++) {
				$scope.todos[i].completed = now;
			}
			now = !now;
		};

	}]);

})(angular);
