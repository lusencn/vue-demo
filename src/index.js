import Vue from 'vue';
//import TodoList from './components/todo/TodoList'
import TodoList from './TodoList';

new Vue({
    el: '#mainCtId'
    template: '<TodoList/>',
    components: { TodoList }
})
