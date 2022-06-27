<template>
    <div class="b_cloud">
        <!-- 上传云化信息弹窗 -->
        <el-dialog title="云化信息" custom-class="change_dialog" :visible.sync="centerDialogVisible" width="40%" center :show-close="false" :hide-required-asterisk="true" :close-on-click-modal="false" :close-on-press-escape="false" :append-to-body="true" :lock-scroll="false">
            <!-- 表单 -->
            <el-form :model="form" label-position="right" :rules="rules" ref="ruleForm">
                <!-- 计划ID -->
                <el-form-item label="计划ID" :label-width="form.labelWidth">
                    计划ID
                </el-form-item>
                <!-- 游戏名称 -->
                <el-form-item label="游戏名称" :label-width="form.labelWidth">
                    游戏名称
                </el-form-item>
                <!-- corpkey -->
                <el-form-item label="corpkey" prop="corpkey" :label-width="form.labelWidth">
                    <el-input v-model="form.corpkey" :size="form.size" :placeholder="form.placeholder.corpkey" :validate-event="false"></el-input>
                </el-form-item>
                <!-- gid -->
                <el-form-item label="gid" prop="gid" :label-width="form.labelWidth">
                    <el-input v-model="form.gid" :size="form.size" :placeholder="form.placeholder.gid" :validate-event="false"></el-input>
                </el-form-item>
                <!-- 包名 -->
                <el-form-item label="包名" prop="package" :label-width="form.labelWidth">
                    <el-input v-model="form.package" :size="form.size" :placeholder="form.placeholder.package" :validate-event="false"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-row type="flex" justify="center">
                    <!-- 提交 -->
                    <el-col :span="10">
                        <Button :btnItem="btnItem.commit" @click-btn="commit('ruleForm')"></Button>
                    </el-col>
                </el-row>
            </div>
        </el-dialog> 
    </div>
</template>

<script>
import Button from '../../../../components/Button/Button.vue';
export default {
    name: 'cloud',
    data () {
        return {
            centerDialogVisible: true,
            form: {
                size: 'medium',
                labelWidth: '120px',
                placeholder: {
                    corpkey: '请填写corpkey',
                    gid: '请填写gid',
                    package: '请填写package',
                },
                corpkey: '',
                gid: '',
                package: ''
            },
            rules: {
                //校验corpkey
                corpkey: [
                    { required: true, message: '请填写corpkey' }
                ],
                //校验gid
                gid: [
                    { required: true, message: '请填写gid' }
                ],
                //校验包名
                package: [
                    { required: true, message: '请填写包名' }
                ]
            },
            btnItem: {
                commit: {
                    type: 'primary',
                    text: '提交',
                    plain: false,
                    size: 'medium'
                }
            }
        }
    },
    components: { Button },
    methods: {
        commit (formRule) {
            //提交时进行校验
            this.$refs[formRule].validate( async (valid) => {
                if (valid) {
                    //关闭弹窗
                    this.$emit('down-bcloud');
                } else {
                    //验证未通过
                    return false;
                };
            });
        }
    }
}
</script>

<style lang="scss" scoped>

</style>

<style>
.el-dialog {
    padding: 1% 3%;
}
</style>
