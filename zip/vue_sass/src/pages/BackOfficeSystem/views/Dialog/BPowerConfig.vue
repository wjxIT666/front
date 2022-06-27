<template>
    <div class="b_power_config">
        <!-- 配置权限弹窗 -->
        <el-dialog title="配置权限" custom-class="change_dialog" :visible.sync="centerDialogVisible" width="40%" center :close-on-click-modal="false" :close-on-press-escape="false" :append-to-body="true" @close="closeConfig" :lock-scroll="false">
            <!-- 表单 -->
            <el-form :model="form" label-position="left">
                <!-- Input框 -->
                <!-- 角色ID -->
                <el-form-item label="角色ID" :label-width="form.labelWidth">
                    {{BPowerConfigItem.id}}
                </el-form-item>
                <!-- 角色名称 -->
                <el-form-item label="角色名称" :label-width="form.labelWidth">
                    {{BPowerConfigItem.name}}
                </el-form-item>
            </el-form>
            <!-- Tab栏 -->
            <el-tabs v-model="activeName">
                <el-tab-pane label="页面权限" name="pageConfig">
                    <!-- 树形结构 -->
                    <el-tree :data="pagePower" show-checkbox node-key="id" :props="defaultProps"></el-tree>
                </el-tab-pane>
            </el-tabs>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: 'b_power_config',
    props: {
        BPowerConfigItem: {
            default: Object
        }
    },
    data () {
        return {
            centerDialogVisible: true,
            form: {
                labelWidth: '120px'
            },
            activeName: 'pageConfig',
            pagePower: [
                {
                    id: 1,
                    label: '企业管理'
                },
                {
                    id: 2,
                    label: '项目管理',
                    children: [
                        {
                            id: 20,
                            label: '云化计划进度'
                        },
                        {
                            id: 21,
                            label: '云化计划管理'
                        },
                        {
                            id: 22,
                            label: 'CP云游戏管理'
                        }
                    ]
                },
                {
                    id: 3,
                    label: '数据报表'
                },
                {
                    id: 4,
                    label: '用户管理',
                    children: [
                        {
                            id: 41,
                            label: '用户列表'
                        },
                        {
                            id: 42,
                            label: '角色权限配置'
                        }
                    ]
                }
            ],
            defaultProps: {
                children: 'children',
                label: 'label'
            }
        }
    },
    methods: {
        //关闭弹窗
        closeConfig () {
            this.$emit('close-powerConfig');
        }
    },
    mounted () {
        // console.log(this._props.BPowerConfigItem);
    }
}
</script>

<style lang="scss" scoped>

</style>
