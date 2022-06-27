<template>
    <div class="b_user_add">
        <!-- 新增用户弹窗 -->
        <el-dialog title="新增用户" custom-class="change_dialog" :visible.sync="centerDialogVisible" width="40%" center :close-on-click-modal="false" :close-on-press-escape="false" :append-to-body="true" @close="closeUser" :lock-scroll="false">
            <!-- 表单 -->
            <el-form :model="form" label-position="right" :rules="rules" ref="ruleForm">
                <!-- Input框 -->
                <!-- 用户名称 -->
                <el-form-item label="用户名称" prop="Name" :label-width="form.labelWidth">
                    <el-input v-model="form.Name" :size="form.size" :placeholder="form.placeholder.Name" :validate-event="false"></el-input>
                </el-form-item>
                <!-- 用户密码 -->
                <el-form-item label="用户密码" prop="Password" :label-width="form.labelWidth">
                    <el-input type="password" v-model="form.Password" :size="form.size" :placeholder="form.placeholder.Password" :validate-event="false"></el-input>
                </el-form-item>
                <!-- 角色权限 -->
                <el-form-item label="角色权限" prop="User" :label-width="form.labelWidth">
                    <el-checkbox-group v-model="form.User">
                        <div v-for="item in selectItem" :key="item.value">
                            <el-checkbox :label="item.value">{{item.label}}</el-checkbox>
                        </div>
                    </el-checkbox-group>
                </el-form-item>
                <!-- 帐号状态 -->
                <el-form-item label="帐号状态" :label-width="form.labelWidth">
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
import { checkBAccount, checkBUserPassword, userPower } from '../../../../utils/rules.js';
export default {
    name: 'b_user_add',
    props: {
        selectItem: {
            default: Array
        }
    },
    data () {
        //校验账号
        const validateBAccount = (rule, value, callback) => {
            checkBAccount(rule, value, callback);
        };
        //校验密码
        const validateBPassword = (rule, value, callback) => {
            checkBUserPassword(rule, value, callback);
        };
        //校验用户权限
        const validateUserPower = (rule, value, callback) => {
            userPower(rule, value, callback);
        };
        return {
            centerDialogVisible: true,
            form: {
                size: 'medium',
                labelWidth: '120px',
                placeholder: {
                    Name: '请填写用户名',
                    Password: '请填写密码'
                },
                Name: '',
                Password: '',
                User: [],
                status: 1
            },
            rules: {
                //校验账号
                Name: [
                    { validator: validateBAccount }
                ],
                //校验密码
                Password: [
                    { validator: validateBPassword }
                ],
                //用户权限
                User: [
                    { validator: validateUserPower }
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
            // console.log('???');
            this.$refs[formName].validate( (valid) => {
                //进行校验
                if (valid) {
                    this.$emit('add-user', this.form);
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

<style>
.el-dialog {
    padding: 1% 3%;
}
</style>
