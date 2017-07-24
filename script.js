var app = angular.module('todoList',[]);
app.controller('listCtrl',listCtrlFun);

function listCtrlFun(){   
    this.todos=[
        {description:"todo number 1", done:false,editMode:false},
        {description:"todo number 2", done:false,editMode:false},
        {description:"todo number 3", done:false,editMode:false}
    ];
}

app.component('newTodo',{
    template:`<form class="mainTodo" ng-submit="newTodo.addTodo()">
                <input class="mainInput" type="text"  ng-model="newTodo.newTodo" placeholder="What nedds to be done ?"/>
                <button type="submit">➕</button>
            </form>`,
    bindings:{fromdata:"="},
    controller:function(){
        this.newTodo="";
        
        this.addTodo = function(){
            if (this.newTodo) {
                this.fromdata.push({description: this.newTodo, done:false,editMode:false});
                this.newTodo="";
            }
        };
    },
    controllerAs:"newTodo"    
});

app.component('todoList',{
    template:`<div class="container">
                <ul class="todoList">
                    <todo-item data="list.data"></todo-item>
                </ul>
                <div class="footer">Tasks: <span>{{list.data.length}}</span></div>
            </div>`,
    bindings:{data:"="},
    controller:function(){},
    controllerAs:"list"     
});

app.component('todoItem',{
    template:`<li class="active" ng-repeat="todo in item.data" ng-class="{strikeLi:todo.done}">
                    <div class="view" ng-show="!todo.editMode">
                        <input type="checkbox" ng-model="todo.done" />
                        <span ng-class="{strike:todo.done}" ng-click="item.turnOnEditMode($index)" >{{todo.description}}</span>
                        <button ng-click="item.deleteTodo($index)">✖</button>
                    </div>
                    <input class="edit" type="text" ng-show="todo.editMode" ng-model="todo.description" name="edit" ng-keyup="$event.keyCode == 13 ? item.turnOffEditMode($index) : null" ng-blur="item.turnOffEditMode($index)">
                </li>`,
    bindings:{data:"="},
    controller:function(){
        this.deleteTodo= function(index){
            this.data.splice(index,1);
        }; 
        this.turnOnEditMode= function(index){
            this.data[index].editMode = true;
            console.log(this.data);
        };
        this.turnOffEditMode= function(index){
            this.data[index].editMode = false;
            console.log(this.data);
        };        
    },
    controllerAs:"item"
});



