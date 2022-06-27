<template>
    <div class="crumbs">
        <!-- 面包屑通用组件 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item>{{CrumbsItem.title}}</el-breadcrumb-item>
            <el-breadcrumb-item>{{CrumbsItem.desc}}</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
</template>

<script>
export default {
    name: 'crumbs',
    props: {
        CrumbsItem: {
            default: Object
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../../scss/base.scss';
.el-breadcrumb {
    font-size: $fontSizeSmall;
}
</style>
