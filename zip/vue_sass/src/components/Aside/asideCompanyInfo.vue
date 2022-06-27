<template>
    <div class="aside_company">
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
                    <SaasBCompany></SaasBCompany>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
import Crumbs from '../Crumbs/Crumbs.vue';
import SaasBCompany from '../Table/SaasBCompany.vue';
export default {
    name: 'aside_company',
    data () {
        return {
            CrumbsItem: {
                title: '企业管理',
                desc: '企业信息'
            }
        }
    },
    components: { Crumbs, SaasBCompany }
}
</script>

<style lang="scss" scoped>
@import '../../scss/base.scss';
.aside_company {
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
