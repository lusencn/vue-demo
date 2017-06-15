<template>
    <div class='todo-ct fixed'>
        <grid
            :columns="columns"
            :isFixHeader="isFixHeader"
            :records="records"
            :width="width"
        />
    </div>

</template>


<script>
import Grid from 'vue-widget/grid/Grid';

export default {
    data() {
        return {
            columns: [{
                name: 'title',
                label: '标题',
                bodyCellStyle: {'textAlign': 'left'}
            }, {
                name: 'content',
                label: '内容',
                bodyCellStyle: {'textAlign': 'left'}
            }],
            isFixHeader: true,
            records: [],
            width: 800
        }
    },
    components: {
        Grid
    }
}
</script>

<style>
html, body {
	height: 100%;
}

body {
	font: normal 14px/180% "微软雅黑", Microsoft YaHei, Lucida, Verdana, Hiragino Sans GB, STHeiti, WenQuanYi Micro Hei, SimSun, sans-serif;
	color: #000;
	background: #fff;
	text-align: center;
}

.todo-ct {
    min-width: 800px;
}

.todo-ct.fixed {
    position: absolute;
	top: 20px;
	left: 80px;
	bottom: 20px;
	right: 80px;
	background: #fff;
	overflow: hidden;
}

.todo-ct {
    margin: 0 auto;
}

.todo-ct.fixed .w-grid-ct {
    position: absolute!important;
    top: 0;
    left: 50%;
    right: 0;
    bottom: 33px;
    margin-left: -400px;
}

.todo-ct.fixed .w-pagn {
    position: absolute;
    left: 0;
    right: 200px;
    bottom: 0;
}

.todo-ct.fixed .w-grid-fix {
    right: -1px;
}

.todo-ct .w-grid-th, .todo-ct .w-grid-td {
    height: 30px;
    line-height: 30px;
}

.todo-ct .w-grid-th {
    background-color: #4fc3c3;
    color: #fff;
}
</style>
