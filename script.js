var app = angular.module('todoList',[]);
app.controller('listCtrl',listCtrlFun);

function listCtrlFun(){
    this.newTodo="";
    
    this.todos=[
        {description:"todo number 1", done:false},
        {description:"todo number 2", done:false},
        {description:"todo number 3", done:false}
    ];
    console.log(this.todos);
    this.addTodo = function(){
        if (this.newTodo) {
            this.todos.push({description: this.newTodo, done:false});
            this.newTodo="";
        }
    }; 
}
app.component('todoList',{
    template:`<li class="active" ng-repeat="todo in item.data" ng-class="{strikeLi:todo.done}">
                    <div class="view" >
                        <input type="checkbox" ng-model="todo.done" />
                        <span ng-class="{strike:todo.done}" ng-click="item.edit($event)" >{{todo.description}}</span>
                        <button ng-click="item.deleteTodo($index)">✖</button>
                    </div>
                    <input class="edit" type="text" name="edit" ng-keyup="$event.keyCode == 13 ? item.save($event,$index) : null">
                </li>`,
    bindings:{data:"="},
    controller:function(){
        this.deleteTodo= function(index){
            this.data.splice(index,1);
        }; 
        this.edit=function(e){
            var value = e.target.textContent;
            angular.element((event.target).closest('li')).toggleClass('editing');
            console.log(angular.element((event.target).closest('div.view')).next());
            angular.element((event.target).closest('div.view')).next().val(value);
        };
        this.save = function(e,index){
            var newValue = e.target.value;
            angular.element((event.target).closest('li')).toggleClass('editing');    
            this.data[index].description = newValue;
        };
    },
    controllerAs:"item"
});



