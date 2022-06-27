<template>
    <div class="b_login">
        <!-- 登录页面 -->
        <el-container>
            <el-main>
                <Card></Card>
            </el-main>
        </el-container>
    </div>
</template>

<script>
import Card from '../../../../components/Card/BLoginCard.vue';
export default {
    name: 'b_login',
    components: { Card }
}
</script>

<style lang="scss" scoped>
@import '../../../../scss/base.scss';
.b_login {
    height: 100%;
    @include bodyBg (url('../../../../images/bgUrl.jpg'), no-repeat, center);
    .el-container {
        height: 100%;
        .el-main {
            height: 100%;
        };
    }
};
</style>
