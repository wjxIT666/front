<template>
    <div class="icon_btn">
        <!-- 通用的带icon的按钮 -->
        <el-button :class="{addGame}" :type="btnItem.type" :plain="btnItem.plain" :size="btnItem.size" :icon="btnItem.icon" @click="btnClick">{{btnItem.text}}</el-button>
    </div>
</template>

<script>
export default {
    name: 'icon_btn',
    props: {
        btnItem: {
            default: Object
        }
    },
    data () {
        return {
            addGame: false
        }
    },
    methods: {
        btnClick () {
            this.$emit('icon-btn');
        }
    },
    mounted () {
        //动态添加按钮样式
        if (this.btnItem.text === '创建游戏') {
            this.addGame = true;
        };
    }
}
</script>

<style lang="scss" scoped>
@import '../../scss/base.scss';
.addGame {
    color: $baseColor;
    background-color: $mainColor;
};

.el-button {
    border: 0 !important;
};
</style>

