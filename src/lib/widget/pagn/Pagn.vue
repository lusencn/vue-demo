<template>
    <div class="w-pagn">
        <div v-if="pageCnt > 0" class="w-pagn-btn-ct">
			<div class="w-pagn-btn-info">
				<span>到第</span>
				<input
                    type="text"
                    ref="pagnIpt"
                    @change="onChangeIpt"
                    @keyup.enter="onClickBtn"
                />
				<span>页</span>
			</div>
			<div class="w-pagn-btn-target" @click="onClickBtn">确定</div>
        </div>
        <ul class="w-pagn-idx-ct">
			<li
				:class="'w-pagn-cs-idx ' + (disablePrev ? 'disabled' : '')"
				@click="disablePrev ? undefined : onClickPrev()"
			>
                上一页
            </li>
            <template v-for="item in items">
                <span v-if="item.elipsePos == 'before'" key="elipBefore" class="w-pagn-elip">
                    ...
                </span>
                <li :key="item.key" :class="item.class" @click="onClickIndex(item.value)">
                    {{item.value}}
                </li>
                <span v-if="item.elipsePos == 'after'" key="elipAfter" class="w-pagn-elip">
                    ...
                </span>
            </template>
			<li
				:class="'w-pagn-cs-idx ' + (disableNext ? 'disabled' : '')"
				@click="disableNext ? undefined : onClickNext()"
			>
                下一页
            </li>
		</ul>
        <div class="w-pagn-cnt-ct">
        	共{{recordCnt}}条记录，{{pageCnt}}页
        </div>
        <div style="clear:both"/>
    </div>
</template>

<script>
export default {
    props: {
        // 当前页码（从1开始计算）
		currPage: {
            type: Number,
            required: true
        },
		// 翻页事件
		onPagnChange: {
            type: Function,
            required: true
        },
		// 每页显示的记录数
		pageSize: {
            type: Number,
            required: true
        },
		// 列表记录总数
		recordCnt: {
            type: Number,
            required: true,
            default: 0
        },
		// 最多显示的能按页码直接点击的链接数
		showIndexCnt: {
            type: Number,
            default: 5
        }
    },
    computed: {
        pageCnt() {
            return Math.ceil(this.recordCnt / this.pageSize);
        },
        adjustCurrPage() {
            return this.currPage > this.pageCnt ? this.pageCnt : this.currPage;
        },
        items() {
            // 翻页下标
    		let items = [];
    		let start = 1;
    		let end = this.pageCnt;
    		let viewType = 1; // oxxxx类型
            if (this.pageCnt > this.showIndexCnt) {
            	if (this.currPage <= 3) {
            		// xxox…x 类型
    	        	end = 4;
    	        	viewType = 2;
    	        } else if (this.currPage > (this.pageCnt - 3)) {
    	        	// x…xoxx 类型
    	        	start = this.pageCnt - 3;
    	        	viewType = 3;
                    items.push({
                        'key': 1,
                        'value': 1,
                        // 翻页下标后面显示省略号
                        'elipsePos': 'after'
                    });
    	        } else {
    	        	// x…xox…x 类型
    	        	start = this.currPage - 1;
    	        	end = this.currPage + 1;
    	        	viewType = 4;
                    items.push({
                        'key': 1,
                        'value': 1,
                        // 翻页下标后面显示省略号
                        'elipsePos': 'after'
                    })
    	        }
            }

    		for (let i = start; i <= end; i++) {
                items.push({
                    'key': i,
                    'class': this.adjustCurrPage == i ? 'on' : '',
                    'value': i,
                    // 不显示省略号
                    'elipsePos': 'null'
                });
    		}
    		if (viewType == 2 || viewType == 4) {
                items.push({
                    'elipsePos': 1,
                    'key': this.pageCnt,
                    'value': this.pageCnt,
                    // 不显示省略号
                    'elipsePos': 'before'
                });
            }
            return items;
        },
        disablePrev() {
            return this.adjustCurrPage <= 1 ? true : false;
        },
        disableNext() {
            return (this.pageCnt <= 1 || this.adjustCurrPage >= this.pageCnt) ?
                true : false;
        }
    },
    methods: {
        /**
    	 * “上一页”翻页事件
    	 */
    	onClickPrev() {
    		let currPage = this.currPage - 1;
    		this.onPagnChange(currPage);
    	},

    	/**
    	 * 下标数字翻页事件
    	 */
    	onClickNext() {
    		let currPage = this.currPage + 1;
    		this.onPagnChange(currPage);
    	},

    	/**
    	 * “下一页”翻页事件
    	 */
    	onClickIndex(index) {
    		let currPage = index;
    		this.onPagnChange(currPage);
    	},

        /**
    	 * 翻页下标输入框change事件
    	 */
    	onChangeIpt(e) {
    		let iptValue = e.target.value || this.adjustCurrPage;
    		try {
    			iptValue = parseInt(iptValue);
    		} catch (e) {
    		}
    		iptValue = (typeof iptValue === 'number' && isFinite(iptValue)) ?
                iptValue : this.adjustCurrPage;
    		iptValue = Math.min(Math.max(iptValue, 1), this.pageCnt);
    		this.$refs.pagnIpt.value = iptValue;
    	},

        /**
    	 * 按钮翻页
    	 */
    	onClickBtn() {
            console.log(new Date().getTime())
            try {
        		let currPage = Number(this.$refs.pagnIpt.value);
        		currPage && this.onPagnChange(currPage);
            } catch (e) {
            }
    	}
    }
}
</script>

<style scoped>
.w-pagn {
    color: #666;
}

.w-pagn-h, .w-pagn-cnt-ct, .w-pagn-btn-ct, .w-pagn-btn-target, .w-pagn-btn-info, .w-pagn-btn-info span, .w-pagn input {
    height: 22px;
}

.w-pagn-btn-target, .w-pagn-idx-ct li, .w-pagn input {
    height: 20px;
}

.w-pagn-cnt-ct, .w-pagn-btn-info, .w-pagn-btn-info span {
    line-height: 22px;
}

.w-pagn-idx-ct, .w-pagn-btn-target, .w-pagn-idx-ct li, .w-pagn input {
    line-height: 20px;
}

.w-pagn-cnt-ct, .w-pagn-idx-ct, .w-pagn-btn-ct {
    float: right;
}

.w-pagn-idx-ct {
    margin: 0 10px;
}

.w-pagn-cs-idx {
    padding: 0 12px;
}

.w-pagn li {
	list-style: none;
}

.w-pagn li, .w-pagn-elip {
    float: left;
    border: 1px solid #f0f0f0;
    margin: 0 0 0 3px;
    cursor: pointer;
    text-align: center;
    color: #999;
    min-width: 20px;
}

.w-pagn li:hover, .w-pagn-btn-target:hover {
    border-color: #27c2c3;
}

.w-pagn li.on {
    background-color: #4FC3C3;
    border-color: #4FC3C3;
    color: #fff;
}

.w-pagn li.disabled {
    color: #dadada;
    background-color: #f6f6f6;
    cursor: default;
}

.w-pagn li:hover.disabled {
    border-color: #f0f0f0;
}

.w-pagn-elip {
    border: 0 none;
    cursor: default;
    min-width: 14px !important;
}

.w-pagn input {
    width: 35px;
    margin: 0 5px;
    text-align: center;
    color: #666;
    border: 1px solid #f0f0f0;
}

.w-pagn-btn-ct div {
    float: left;
}

.w-pagn-btn-target {
    cursor: pointer;
    padding: 0 12px;
    margin-left: 10px;
    border: 1px solid #f0f0f0;
}

.w-pagn-btn-info {
    font-size: 0;
}

.w-pagn-btn-info span, .w-pagn-btn-info input {
    display: inline-block;
    vertical-align: middle;
}
</style>
