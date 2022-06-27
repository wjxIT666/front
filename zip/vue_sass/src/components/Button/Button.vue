<template>
    <div class="btn">
        <!-- 封装通用的Button按钮 -->
        <el-button :type="btnItem.type" :plain="btnItem.plain" :size="btnItem.size" @click="btnClick">{{btnItem.text}}</el-button>
    </div>
</template>

<script>
export default {
    name: 'btn',
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
@import '../../scss/base.scss';
.el-button--primary {
    background-color: $mainColor;
    color: $baseColor;
    border-color: $mainColor;
    width: $_90width;
};
.is-plain {
    width: $_90width;
    color: $mainColor;
    border-color: $mainColor;
    &:hover {
        color: $mainColor;
        border-color: $mainColor;
    };
};
</style>
