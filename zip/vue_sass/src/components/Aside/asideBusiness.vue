<template>
    <div class="aside_Business">
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
                    <SaasBBusiness></SaasBBusiness>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
import Crumbs from '../Crumbs/Crumbs.vue';
import BatchButton from '../Button/BatchButton.vue';
import SaasBBusiness from '../Table/SaasBBusiness.vue';
export default {
    name: 'aside_Business',
    data () {
        return {
            CrumbsItem: {
                title: '项目管理',
                desc: '云化计划进度'
            },
            btnItemUp: {
                type: 'success',
                plain: true,
                size: 'medium',
                text: '通过'
            },
            btnItemDown: {
                type: 'warning',
                plain: true,
                size: 'medium',
                text: '不通过'
            }
        }
    },
    components: { Crumbs, SaasBBusiness, BatchButton },
    methods: {
        Up () {
            // console.log('通过');
        },
        Down () {
            // console.log('不通过');
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../../scss/base.scss';
.aside_Business {
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
