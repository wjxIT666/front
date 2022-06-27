<template>
    <div class="tip">
        <!-- 封装通用的tip提示 -->
        <div class="tip_main">
            <span>{{TipItem.text}}</span>
        </div>
    </div>
</template>

<script>
export default {
    name: 'tip',
    props: {
        TipItem: {
            default: Object
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../../scss/base.scss';
.tip {
    .tip_main {
        background: rgba(0, 0, 0, 0.7);
        color: $baseColor;
        font-size: $fontSizeExtra;
        position: absolute;
        top: 80%;
        right: 0;
        z-index: 100;
        border-radius: 4px;
        line-height: 20px;
        padding: 2%;
    };
};

</style>
