<template>
    <div class="password">
       <!-- 登录页面 -->
       <el-container style="height: 100%;">
            <el-main>
                <div style="min-width: 1200px;">
                    <el-header height="56px">
                        <Header :headerItem="pwdItem" :showDialog="showDialog"></Header>
                    </el-header>
                    <Main>
                        <Card></Card>
                    </Main>
                </div>
            </el-main>
        </el-container>
    </div>
</template>

<script>
import Header from '../../../../components/Header/Header.vue';
import Main from '../../../../components/Main/Main.vue';
import Card from '../../../../components/Card/PasswordCard.vue';
export default {
    name: 'password',
    data () {
        return {
            pwdItem: {
                flag: 'password'
            },
            showDialog: false
        }
    },
    components: { Header, Main, Card }
}
</script>

<style lang="scss" scoped>
@import '../../../../scss/header.scss';
@import '../../../../scss/base.scss';
.password {
    height: 100%;
    @include bodyBg (url('../../../../images/bgUrl.jpg'), no-repeat, center);
    .el-header {
        @include headerTextStyle (#fff, 56px);
        @include elHeader ();
    };
    .el-main {
        @include elMain ();
    };
};
</style>
