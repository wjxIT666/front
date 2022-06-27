<template>
    <div class="index_url" style="margin: 0 16px;">
        <!-- 右侧内容 -->
        <!-- 面包屑 -->
        <div class="crumbs" style="padding: 2% 0;">
            <Crumbs :CrumbsItem="CrumbsItem"></Crumbs>
        </div>
        <!-- 内容 -->
        <div class="main" style="padding: 2%; box-sizing: border-box; width: 100%; background-color: #fff;">
            <!-- 表格 -->
            <el-row>
                <el-col :span="24">
                    <SaasCURL></SaasCURL>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
import Crumbs from '../Crumbs/Crumbs.vue';
import SaasCURL from '../Table/SaasCURL.vue';
export default {
    name: 'index_url',
    data () {
        return {
            CrumbsItem: {
                title: '数据查询',
                desc: '云游戏URL'
            }
        }
    },
    components: { Crumbs, SaasCURL }
}
</script>

<style lang="scss" scoped>

</style>
