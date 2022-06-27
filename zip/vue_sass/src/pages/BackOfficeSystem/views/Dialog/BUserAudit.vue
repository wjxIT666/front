<template>
    <div class="b_user_audit">
        <!-- 用户编辑弹窗 -->
        <el-dialog title="用户编辑" custom-class="change_dialog" :visible.sync="centerDialogVisible" width="40%" center :close-on-click-modal="false" :close-on-press-escape="false" :append-to-body="true" @close="closeUser" :lock-scroll="false">
            <!-- 表单 -->
            <el-form :model="form" label-position="right" :rules="rules" ref="ruleForm">
                <!-- Input框 -->
                <!-- 用户名称 -->
                <el-form-item label="用户名称" :label-width="form.labelWidth">
                    {{BUserAudit.username}}
                </el-form-item>
                <!-- 用户密码 -->
                <el-form-item label="用户密码" :label-width="form.labelWidth">
                    <el-input type="password" v-model="form.Password" :size="form.size" :placeholder="form.placeholder.Password" :validate-event="false"></el-input>
                </el-form-item>
                <!-- 角色权限 -->
                <el-form-item label="角色权限" prop="User" :label-width="form.labelWidth">
                    <el-checkbox-group v-model="form.User">
                        <div v-for="item in selectItem" :key="item.value">
                            <el-checkbox :label="item.label">{{item.label}}</el-checkbox>
                        </div>
                    </el-checkbox-group>
                </el-form-item>
                <!-- 帐号状态 -->
                <el-form-item label="帐号状态" :label-width="form.labelWidth">
                    <el-radio-group v-model="form.status">
                        <el-radio :label="1">启用</el-radio>
                        <el-radio :label="9">冻结</el-radio>
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
import { MessageInterface } from '../../../../js/ELE_Message/message';
import { userPower } from '../../../../utils/rules.js';
export default {
    name: 'b_user_audit',
    props: {
        selectItem: {
            default: Array
        },
        BUserAudit: {
            default: Object
        }
    },
    data () {
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
            this.$emit('close-BuserAudit');
        },
        //提交
        commit (formName) {
            this.$refs[formName].validate( (valid) => {
                //进行校验
                if (valid) {
                    const reg = /^(?![0-9]*$)(?![a-zA-Z]*$)[a-zA-Z0-9]{6,}$/;
                    //校验密码
                    if (this.form.Password == this._props.BUserAudit.password) {
                        //获取数据
                        let newArr = [];
                        this._props.selectItem.forEach( item => {
                            this.form.User.forEach( item2 => {
                                if (item.label == item2) {
                                    newArr.push(item.value);
                                };
                            } );
                        } );
                        // console.log(this.form.User, 'this.forn.User');
                        // console.log(newArr, 'newArr');
                        let setObj = new Set(newArr);
                        newArr = [...setObj];
                        // console.log(newArr, '去重newArr');
                        let data = {
                            userId: this._props.BUserAudit.userId,
                            username: this._props.BUserAudit.username,
                            password: this.form.Password,
                            roleIdList: newArr,
                            userStatus: this.form.status
                        };
                        this.$emit('audit-commit', data);
                    } else {
                        if (this.form.Password === '') {
                            MessageInterface('请填写密码', 'error', 5000);
                            return false;
                        } else if (!reg.test(this.form.Password)) {
                            MessageInterface('密码至少6个字符，需要包含英文与数字', 'error', 5000);
                            return false;
                        };
                        //获取数据
                        let newArr = [];
                        this._props.selectItem.forEach( item => {
                            this.form.User.forEach( item2 => {
                                if (item.label.indexOf(item2) > -1) {
                                    newArr.push(item.value);
                                };
                            } );
                        } );
                        let data = {
                            userId: this._props.BUserAudit.userId,
                            username: this._props.BUserAudit.username,
                            password: this.form.Password,
                            roleIdList: newArr,
                            userStatus: this.form.status
                        };
                        this.$emit('audit-commit', data);
                    };
                } else {
                    return false;
                };
            });
        }
    },
    components: { Button },
    mounted () {
        //用户密码赋值
        this.form.Password = this._props.BUserAudit.password;
        //角色权限赋值
        this.form.User = this._props.BUserAudit.roleNames.split(',');
        //账户状态赋值
        this.form.status = this._props.BUserAudit.userStatus;
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
