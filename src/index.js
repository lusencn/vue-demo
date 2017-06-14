import Vue from 'vue';
import TodoList from 'component/todo/TodoList';
import './css/common.css';
import './css/reset.css';

new Vue({
    el: '#mainCtId',
    template: '<TodoList/>',
    components: { TodoList }
})
