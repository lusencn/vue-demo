<template>
    <div class="w-grid-ct" :style="ctStyle">
        <div className="w-grid-table" style="tableStyle">
            {this.rowView({}, -1)}
        </div>
        {this.bodyView()}
    </div>
</template>


<script>
import {isEmpty, isFunction, isNumber} from 'fe-util';

export default {
    props: {
        // 列表border宽度
        borderSpacing: Number,
        // 列属性
        // 例：[{
        //      bodyCellStyle: <表体单元格样式（object）>,
        //      bodyCellView: <表体单元格视图（func）>,
        //      bodyTdStyle: <表体Td元素样式（object）>,
        //      headerCellStyle: <表头单元格样式（object）>,
        //      headerCellView: <表头单元格视图（func）>,
        //      headerTdStyle: <表头Td元素样式（object）>,
        //      label: <显示名称（必选）>,
        //      name: <字段名称（必选）>,
        //      width: <宽度>
        //  }, ……]
        columns: {
            type: Array,
            required: true
        },
        // 列表空数据视图
        emptyView: Function,
        // 表头高度
        headerHeight: Number,
        // 表头是否固定，不随滚动条滚动
        isFixHeader: Boolean,
        // 列表数据
        records: {
            type: Array,
            required: true
        },
        // 列表容器样式
        style: Object,
        // 列表容器宽度
        width: Number
    },
    data() {
        _initStyle();

        return {
            // 列表容器样式
            ctStyle: this.ctStyle
        }
    },
    //--------------------------------------------------------------------------
    _initStyle() {
        // 列表容器样式
        this.ctStyle = Object.assign({}, this.isFixHeader ? {
                position: 'relative'
            } : null,
            style, {
                width: width
            }
        );

        // 表头悬浮显示时，表体容器样式
        this.isFixHeader && (this.fixedCtStyle = {
            top: (this.headerHeight || 30) + 'px'
        });

        // 表头/表体table样式
        this.tableStyle = {
            width: this.width,
            borderSpacing: this.borderSpacing || 1
        };

        this._calColWidth();
    },
    /**
	 * 计算未设置width值的列的宽度（如果有列设置width为百分数，或width设置不规范，则不执行该计算）
	 */
    _calColWidth() {
        this.calColWidthVal = 'auto';

        if (!this.width || !isNumber(this.width)) {
            return;
        }
        if (this.columns == null) {
            return;
        }

        // 是否计算每列宽度
        let isNoCal = false;
        // 未设置宽度的列的数量
        let noWidthCnt = 0;
        // 用于平均计算的宽度值
        let minusResult = this.width - (this.columns.length + 1) * (this.borderSpacing || 1);
        this.columns.some(column => {
            let itemWidth = column.width;
            if (!itemWidth) {
                noWidthCnt++;
                return false;
            }
            if (itemWidth && (itemWidth *= 1) && !isNumber(itemWidth)) {
                // 有列设置了非数字的宽度，导致无法为每列计算宽度
                isNoCal = true;
                return true;
            }
            minusResult -= itemWidth;
        });

        if (!isNoCal && noWidthCnt) {
            this.calColWidthVal = minusResult / noWidthCnt;
        }
        (this.calColWidthVal <= 0) && (this.calColWidthVal = 'auto');
    }
}
</script>

<style scoped>
</style>
