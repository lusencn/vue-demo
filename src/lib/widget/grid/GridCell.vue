<template v-if="show" >
    <div className="w-grid-box" :style="ctStyle" :title="title">
        <div className="w-grid-content" :style="contentStyle">{{content}}</div>
    </div>
</template>

<script>
import isArray from 'fe-util/is/isArray';
import isFunction from 'fe-util/is/isFunction';
import isObject from 'fe-util/is/isObject';

export default {
    props: {
        // 单元格内容视图
        cellView: Function,
        // 列元数据
        column: {
            type: Object,
            required: true
        },
        // 单元格所在行的数据
        record: {
            type: Object,
            required: true
        },
        // 单元格在整个列表中的行次（第一行数据的rowIndex为0，往下累加。表头rowIndex为-1）
        rowIndex: {
            type: Number,
            required: true
        },
        // 单元格样式
        contentStyle: Object,
        // 单元格宽度
        width: Number
    },
    data() {
        if (!this.column) {
            return {
                show: false
            }
        }

        // 单元格内容
		let value = this.rowIndex >= 0 ? this.record[this.column.name] : this.column.label;
		let content = isFunction(this.cellView) ?
            this.cellView(value, this.rowIndex, this.record, this.column) : value;
        let title = (isObject(content) || isArray(content)) ?
            ((isObject(value) || isArray(value)) ? null : value) : content;

        return {
            content,
            ctStyle: {
                width: this.width
            },
            show: true,
            title: title
        }
    }
}
</script>

<style scoped>
.w-grid-box {
	width: 100%;
}
.w-grid-content {
	overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
	padding: 0 10px;
}
</style>
