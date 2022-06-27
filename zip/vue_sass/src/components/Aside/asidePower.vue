<template>
    <div class="aside_Power">
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
                    <SaasBPower></SaasBPower>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
import Crumbs from '../Crumbs/Crumbs.vue';
import SaasBPower from '../Table/SaasBPower.vue';
export default {
    name: 'aside_Power',
    data () {
        return {
            CrumbsItem: {
                title: '用户管理',
                desc: '角色权限配置'
            }
        }
    },
    components: { Crumbs, SaasBPower }
}
</script>

<style lang="scss" scoped>
@import '../../scss/base.scss';
.aside_Power {
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
