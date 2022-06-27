<template>
    <div class="aside_User">
        <!-- 右侧内容 -->
        <!-- 面包屑 -->
        <div class="crumbs">
            <Crumbs :CrumbsItem="CrumbsItem"></Crumbs>
        </div>
        <!-- 内容 -->
        <div class="main">
            <!-- 表格 -->
            <el-row>
                <el-col :span="24">
                    <SaasBUser></SaasBUser>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
import Crumbs from '../Crumbs/Crumbs.vue';
import SaasBUser from '../Table/SaasBUser.vue';
export default {
    name: 'aside_User',
    data () {
        return {
            CrumbsItem: {
                title: '用户管理',
                desc: '用户列表'
            }
        }
    },
    components: { Crumbs, SaasBUser }
}
</script>

<style lang="scss" scoped>
@import '../../scss/base.scss';
.aside_User {
    margin-left: 2%;
    .crumbs {
        @include elCurmbs ();
    };
    .main {
        padding: 2%;
        width: $_90width;
        background-color: $baseColor;
    };
};
</style>
