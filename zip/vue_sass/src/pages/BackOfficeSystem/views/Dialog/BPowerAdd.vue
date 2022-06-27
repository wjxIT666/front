<template>
    <div class="b_power_add">
        <!-- 创建角色弹窗 -->
        <el-dialog title="创建角色" custom-class="change_dialog" :visible.sync="centerDialogVisible" width="40%" center :close-on-click-modal="false" :close-on-press-escape="false" :append-to-body="true" @close="closeUser" :lock-scroll="false">
            <!-- 表单 -->
            <el-form :model="form" label-position="right" :rules="rules" ref="ruleForm">
                <!-- Input框 -->
                <!-- 角色名称 -->
                <el-form-item label="角色名称" prop="Name" :label-width="form.labelWidth">
                    <el-input v-model="form.Name" :size="form.size" :placeholder="form.placeholder.Name" :validate-event="false"></el-input>
                </el-form-item>
                <!-- 角色状态 -->
                <el-form-item label="角色状态" :label-width="form.labelWidth">
                    <el-radio-group v-model="form.status">
                        <el-radio :label="1">启用</el-radio>
                        <el-radio :label="9" disabled>冻结</el-radio>
                    </el-radio-group>
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
import { powerName } from '../../../../utils/rules.js';
export default {
    name: 'b_power_add',
    data () {
        //校验账号
        const validateBAccount = (rule, value, callback) => {
            powerName(rule, value, callback);
        };
        return {
            centerDialogVisible: true,
            form: {
                size: 'medium',
                labelWidth: '120px',
                placeholder: {
                    Name: '请填写角色名',
                },
                Name: '',
                User: [],
                status: 1
            },
            rules: {
                //校验账号
                Name: [
                    { validator: validateBAccount }
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
    methods: {
        //关闭弹窗
        closeUser () {
            this.$emit('close-dialog');
        },
        //提交
        commit (formName) {
            this.$refs[formName].validate( (valid) => {
                //进行校验
                if (valid) {
                   let data = {
                       name: this.form.Name,
                       roleStatus: this.form.status
                   };
                   this.$emit('bpower-add', data);
                } else {
                    return false;
                };
            });
        }
    },
    components: { Button }
}
</script>

<style lang="scss" scoped>

</style>
