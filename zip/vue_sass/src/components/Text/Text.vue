<template>
    <div class="txt">
        <!-- 文案 -->
        <p class="bigText">云游戏生态服务平台</p>
        <p class="smallText">云游戏一站式技术解决方案，实现游戏自动上云服务，满足试玩，在线玩等多场景需求。</p>
    </div>
</template>

<script>
export default {
    
}
</script>

<style lang="scss" scoped>
@import '../../scss/base.scss';
.txt {
    width: 64%;
    margin: 0 auto;
    color: $baseColor;
    .bigText {
        font-size: $fontSizeBig;
        text-align: left;
        margin-bottom: 20px;
        font-weight: 600;
    };
    .smalltext {
        font-size: $fontSizeMedium;
        text-align: $center;
    };
}
</style>
