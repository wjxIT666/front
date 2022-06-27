<template>
    <div class="aside_cp">
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
                    <SaasBCP></SaasBCP>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
import Crumbs from '../Crumbs/Crumbs.vue';
import BatchButton from '../Button/BatchButton.vue';
import SaasBCP from '../Table/SaasBCP.vue';
export default {
    name: 'aside_cp',
    data () {
        return {
            CrumbsItem: {
                title: '项目管理',
                desc: 'CP云游戏管理'
            },
            btnItemUp: {
                type: 'success',
                plain: true,
                size: 'medium',
                text: '上线'
            },
            btnItemDown: {
                type: 'warning',
                plain: true,
                size: 'medium',
                text: '下线'
            }
        }
    },
    components: { Crumbs, BatchButton, SaasBCP },
    methods: {}
}
</script>

<style lang="scss" scoped>
@import '../../scss/base.scss';
.aside_cp {
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
