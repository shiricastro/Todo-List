var app = angular.module('todoList',[]);
app.controller('listCtrl',listCtrlFun);

function listCtrlFun(){
    this.newTodo=""; 
    this.todos=[
        {description:"todo number 1", done:false},
        {description:"todo number 2", done:false},
        {description:"todo number 3", done:false}
    ];
    this.addTodo= function(){
       this.todos.push({description: this.newTodo, done:false});
       this.newTodo="";
    };    
    this.deleteTodo= function(){
        
    };
}


