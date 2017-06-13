import Vue from 'vue';
import TodoList from 'component/todo/TodoList';

new Vue({
    el: '#mainCtId',
    template: '<TodoList/>',
    components: { TodoList }
})
