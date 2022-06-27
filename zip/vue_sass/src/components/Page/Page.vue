<template>
    <div class="page">
        <!-- 分页通用组件 -->
        <el-pagination
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-size="pageSize"
            layout="prev, pager, next, jumper"
            :total="totalLength"
            background>
        </el-pagination>
    </div>
</template>

<script>
export default {
    name: 'page',
    props: {
        totalLength: {
            default: Number
        },
        pageSize: {
            default: Number
        },
        currentPage: {
            default: Number
        }
    },
    methods: {
        //页面发生改变时触发
        handleCurrentChange(val) {
            this.$emit('current-page', val);
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../../scss/base.scss';
.el-pagination.is-background /deep/ .el-pager li:not(.disabled).active {
    background-color: $mainColor;
};
</style>
