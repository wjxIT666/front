<template>
    <div class="b_cloud_update">
        <!-- 云化信息反馈弹窗 -->
        <el-dialog title="云化信息反馈" custom-class="change_dialog" :visible.sync="centerDialogVisible" width="50%" center :show-close="false" :hide-required-asterisk="true" :close-on-click-modal="false" :close-on-press-escape="false" :append-to-body="true" :lock-scroll="false">
            <!-- 表单 -->
            <el-form :model="form" label-position="left">
                <!-- 计划ID -->
                <el-form-item label="计划ID" :label-width="form.labelWidth">
                    计划ID
                </el-form-item>
                <!-- 游戏名称 -->
                <el-form-item label="游戏名称" :label-width="form.labelWidth">
                    游戏名称
                </el-form-item>
                <!-- CP -->
                <el-form-item label="CP" :label-width="form.labelWidth">
                    CP
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: 'b_cloud_update',
    data () {
        return {
            centerDialogVisible: true,
            form: {
                labelWidth: '140px',
                placeholder: {
                    corpkey: '请填写corpkey',
                    gid: '请填写gid',
                    package: '请填写包名',
                    error: '请填写异常原因'
                },
                corpkey: '',
                gid: '',
                package: '',
                error: [],
                mark: ''
            },
        }
    }
}
</script>

<style lang="scss" scoped>

</style>
