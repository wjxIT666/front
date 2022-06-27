<template>
    <div class="index_resource" style="margin: 0 16px;">
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
                    <SaasCTable></SaasCTable>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
import Crumbs from '../Crumbs/Crumbs.vue';
import SaasCTable from '../Table/SaasCTable.vue';
export default {
    name: 'index_resource',
    data () {
        return {
            GameAddShow: false,
            CrumbsItem: {
                title: '云游戏产品资源',
                desc: '资源管理'
            },
            btnItem: {
                type: '',
                plain: false,
                size: 'medium',
                icon: 'el-icon-circle-plus-outline',
                text: '创建游戏'
            }
        }
    },
    components: { Crumbs, SaasCTable },
    methods: {
       
    }
}
</script>

<style lang="scss" scoped>

</style>
