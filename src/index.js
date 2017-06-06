import Vue from 'vue';
import TodoList from './components/todo/TodoList'

new Vue({
    el: '#mainCtId'
    template: '<TodoList/>',
    components: { TodoList }
})
