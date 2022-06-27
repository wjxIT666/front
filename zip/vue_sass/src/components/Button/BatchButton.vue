<template>
    <div class="batch_btn">
        <!-- 封装通用的批量按钮 -->
        <el-button :type="btnItem.type" :plain="btnItem.plain" :size="btnItem.size" @click="btnClick">{{btnItem.text}}</el-button>
    </div>
</template>

<script>
export default {
    name: 'batch_btn',
    props: {
        btnItem: {
            default: Object
        }
    },
    methods: {
        //btn向父组件传值
        btnClick () {
            this.$emit('click-btn');
        }
    }
}
</script>

<style lang="scss" scoped>

</style>
