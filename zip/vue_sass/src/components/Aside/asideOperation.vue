<template>
    <div class="aside_Operation">
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
                    <SaasBOperation></SaasBOperation>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
import Crumbs from '../Crumbs/Crumbs.vue';
import SaasBOperation from '../Table/SaasBOperation.vue';
export default {
    name: 'aside_Operation',
    data () {
        return {
            CrumbsItem: {
                title: '项目管理',
                desc: '云化计划管理'
            }
        }
    },
    components: { Crumbs, SaasBOperation }
}
</script>

<style lang="scss" scoped>
@import '../../scss/base.scss';
.aside_Operation {
    margin-left: 2%;
    .crumbs {
        @include elCurmbs ();
    };
    .main {
        padding: 2%;
        width: $_90width;
        background-color: $baseColor;
        .name {
            font-size: $fontSizeBase;
        }
    };
};
</style>
