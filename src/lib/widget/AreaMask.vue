<template>
    <div v-if="loading" class="w-area-mask">
        <div class="mask"></div>
        <div class="content">
            <div><i class="i-loading"></i></div>
            <div>正在加载数据，请稍候……</div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        // 加载中状态
    	loading: {
            type: Boolean,
            required: true
        }
    }
}
</script>

<style scoped>
.w-area-mask, .w-area-mask .mask {
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	z-index: 100;
}

.w-area-mask .mask {
	background: #fff;
	filter: alpha(opacity=90);
	opacity: 0.9;
}

.w-area-mask .content {
	position: relative;
	z-index: 101;
	text-align: center;
	font-size: 12px;
	color: #666;
	margin-top: 70px;
}
</style>
