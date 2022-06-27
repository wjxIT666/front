<template>
    <div class="update_password">
        <!-- 游戏新增弹窗 -->
        <el-dialog title="修改密码" custom-class="change_dialog" :visible.sync="centerDialogVisible" width="30%" center :show-close="false" :close-on-click-modal="false" :close-on-press-escape="false" :append-to-body="true" :lock-scroll="false">
            <!-- 表单 -->
            <el-form :model="form" label-position="left" :rules="rules" ref="ruleForm">
                <!-- Input框 -->
                <!-- 原密码 -->
                <el-form-item prop="oldPassword">
                    <el-input type="password" v-model="form.oldPassword" prefix-icon="al-suo" :size="form.size" :placeholder="form.placeholder.oldPassword" :validate-event="false"></el-input>
                </el-form-item>
                <!-- 新密码 -->
                <el-form-item prop="newPassword">
                    <el-input type="password" v-model="form.newPassword" prefix-icon="al-xiugaimima1" :size="form.size" :placeholder="form.placeholder.newPassword" :validate-event="false"></el-input>
                </el-form-item>
                <!-- 新密码二次确认 -->
                <el-form-item prop="newPasswordAgain">
                    <el-input type="password" v-model="form.newPasswordAgain" prefix-icon="al-xiugaimima1" :size="form.size" :placeholder="form.placeholder.newPasswordAgain" :validate-event="false"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-row>
                    <!-- 取消 -->
                    <el-col :span="12">
                        <Button :btnItem="btnItem.cancel" @click-btn="cancel()"></Button>
                    </el-col>
                    <!-- 保存 -->
                    <el-col :span="12">
                        <Button :btnItem="btnItem.save" @click-btn="save('ruleForm')"></Button>
                    </el-col>
                </el-row>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import Button from '../../../../components/Button/Button.vue';
import { checkPassword, checkRepeatPassword, checkPasswordAgain } from '../../../../utils/rules.js';
import { MessageInterface } from '../../../../js/ELE_Message/message.js';
import { checkRSA } from '../../../../utils/rsa.js';
export default {
    name: 'update_password',
    data () {
        //校验原密码
        const validatePassword = (rule, value, callback) => {
            checkPassword(rule, value, callback);
        };
        //校验新密码
        const validateRepeatPassword = (rule, value, callback) => {
            checkRepeatPassword(rule, value, callback, this.form.oldPassword);
        };
        //二次校验密码
        const validatePasswordAgain = (rule, value, callback) => {
            checkPasswordAgain(rule, value, callback, this.form.newPassword);
        };
        return {
            centerDialogVisible: true,
            form: {
                size: 'medium',
                placeholder: {
                    oldPassword: '原密码',
                    newPassword: '新密码',
                    newPasswordAgain: '新密码二次确认'
                },
                oldPassword: '',
                newPassword: '',
                newPasswordAgain: ''
            },
            rules: {
                //校验旧密码
                oldPassword: [
                    { validator: validatePassword }
                ],
                //校验新密码
                newPassword: [
                    { validator: validateRepeatPassword }
                ],
                //二次校验密码
                newPasswordAgain: [
                    { validator: validatePasswordAgain }
                ]
            },
            btnItem: {
                cancel: {
                    type: '',
                    text: '取消',
                    plain: true,
                    size: 'medium'
                },
                save: {
                    type: 'primary',
                    text: '保存',
                    plain: false,
                    size: 'medium'
                }
            }
        }
    },
    components: { Button },
    methods: {   
        // 取消
        cancel () {
            this.$emit('cancel-dialog');
        },
        // 保存
        save (formRule) {
            //提交时进行校验
            this.$refs[formRule].validate( async (valid) => {
                if (valid) {
                    //获取修改密码接口
                    let data = { dbPassword: this.form.oldPassword, newPassword: this.form.newPassword, confirmPassword: this.form.newPasswordAgain };
                    let dataParams = {
                        data: checkRSA(data)
                    };
                    let updatePasswordRes = await this.$api.updatePasswordInterface(dataParams);
                    if (updatePasswordRes.code === 0) {
                        MessageInterface('修改密码成功', 'success', 5000);
                        this.$emit('save-dialog');
                    } else {
                        MessageInterface(`${updatePasswordRes.msg}`, 'error', 5000);
                    };
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