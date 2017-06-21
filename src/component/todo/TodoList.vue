<template>
    <div class='todo-ct fixed'>
        <grid
            :columns="columns"
            :isFixHeader="isFixHeader"
            :records="records"
            :width="width"
        />
        <pagn
            :currPage="currPage"
            :onPagnChange="onPagnChange"
            :pageSize="pageSize"
            :recordCnt="allRecordsCnt"
            :style="{width: width + 'px'}"
        />
    </div>
</template>


<script>
import {listReq} from 'api/todo';
import Grid from 'vue-widget/grid/Grid';
import Pagn from 'vue-widget/pagn/Pagn';

export default {
    props: {
        // 列表全部记录数
        //allRecordsCnt: Number,
        // 列表当前页数据
        //currPageRecords: Array,
        // 加载列表方法
        //loadList: Function,
        // 列表每页最多显示记录数
        //pageSize: Number,
        // 列表当前页第一条记录在完整列表中的索引位置（从0开始计数）
        //startIndex: Number,
        // 更新列表筛选条件方法
        //updateListConds: Function
    },
    data() {
        let pageSize = 30;
        let startIndex = 0;
        return {
            allRecordsCnt: 0,
            columns: [{
                name: 'title',
                label: '标题',
                bodyCellStyle: {'textAlign': 'left'}
            }, {
                name: 'content',
                label: '内容',
                bodyCellStyle: {'textAlign': 'left'}
            }],
            pageSize: pageSize,
            records: [],
            isFixHeader: true,
            startIndex: startIndex,
            currPage: (startIndex / pageSize) + 1,
            width: 800
        }
    },
    created() {
        listReq({
            pageSize: this.pageSize
        }).then(result => {
            if (result.success) {
                this.currPage = 1;
                this.allRecordsCnt = result.total;
                this.records.splice(0, this.records.length);
                result.records.forEach(record => this.records.push(record));
            }
        });
    },
    components: {
        Grid, Pagn
    },
    methods: {
        onPagnChange(nextPagnNo) {
            listReq({
                startIndex: (nextPagnNo - 1) * this.pageSize,
                pageSize: this.pageSize
            }).then(result => {
                if (result.success) {
                    this.currPage = nextPagnNo;
                    this.allRecordsCnt = result.total;
                    this.records.splice(0, this.records.length);
                    result.records.forEach(record => this.records.push(record));
                }
            });
        }
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
