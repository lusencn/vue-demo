<template>
    <ul className="w-grid-tr">
        <li
            v-for="column in columns"
            :class="isHeader ? 'w-grid-th' : 'w-grid-td'"
            :key="'gridHeader_' + column.name"
            :style="colStyle(column)"
        >
            <grid-cell
                :column="column"
                :record="record"
                :rowIndex="rowIndex"
                :width="column.width || calColWidthVal"
                :cellView="isHeader ? column.headerCellView : column.bodyCellView"
                :contentStyle="isHeader ? column.headerCellStyle : column.bodyCellStyle"
            />
        </li>
    </ul>
</template>

<script>
import isArray from 'fe-util/is/isArray';
import isFunction from 'fe-util/is/isFunction';
import isObject from 'fe-util/is/isObject';
import GridCell from './GridCell';

export default {
    props: {
        // 自动计算的列的宽度
        calColWidthVal: {
            type: Number,
            default: 'auto'
        },
        // 列元数据
        columns: {
            type: Array,
            required: true
        },
        // 单元格所在行的数据
        record: {
            type: Object,
            required: true
        },
        // 表格行下表（从0开始计数，表头也计算在内）
        rowIndex: {
            type: Number,
            required: true
        }
    },
    data() {
        return {
            isHeader: this.rowIndex < 0,
        }
    },
    methods: {
        colStyle(column) {
            let width = column.width || this.calColWidthVal;
            return Object.assign({},
                this.isHeader ? column.headerTdStyle : column.bodyTdStyle,
                width ? {width: width + 'px'} : null
            );
        }
    },
    //--------------------------------------------------------------------------
    components: {
        GridCell
    }
}
</script>

<style scoped>
.w-grid-tr {
	display: table-row;
}

.w-grid-th, .w-grid-td {
	display: table-cell;
	text-align: center;
}

.w-grid-td {
	background-color: #fff;
}

.w-grid-tr:hover .w-grid-td {
	background-color: #FFF9E1;
}
</style>
