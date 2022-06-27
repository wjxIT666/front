<template>
    <div class="password_card">
        <!-- 重置密码 -->
        <el-card class="box-card">
            <!-- 名称 -->
            <NameText></NameText>
            <!-- 表单 -->
            <el-row>
                <el-col :span="24">
                    <!-- 表单数据 -->
                    <el-form :model="form" label-position="left" :rules="rules" ref="ruleForm">
                        <!-- 手机号 -->
                        <el-form-item prop="Tel">
                            <el-input v-model="form.Tel" prefix-icon="al-shouji" :size="form.size" :placeholder="form.placeholder.Tel" :validate-event="false"></el-input>
                        </el-form-item>
                        <!-- 获取验证码 -->
                        <el-form-item prop="Code">
                            <el-input v-model="form.Code" prefix-icon="al-dunpai" :size="form.size" :placeholder="form.placeholder.Code" :validate-event="false">
                                <!-- <CodeButton slot="append" @send-code="sendCode"></CodeButton> -->
                                <el-button style="font-size: 12px;" :disabled="disabled" @click="sendCode()" slot="append">
                                    <span v-if="show">获取验证码</span>
                                    <span v-else>重新获取({{count}})s</span>
                                </el-button>
                            </el-input>
                        </el-form-item>
                        <!-- 新密码 -->
                        <el-form-item prop="PassWord">
                            <el-input type="password" v-model="form.PassWord" prefix-icon="al-suo" :size="form.size" :placeholder="form.placeholder.PassWord" :validate-event="false"></el-input>
                        </el-form-item>
                        <!-- 二次新密码 -->
                        <el-form-item prop="PassWordAgain">
                            <el-input type="password" auto-complete="new-password" v-model="form.PassWordAgain" prefix-icon="al-suo" :size="form.size" :placeholder="form.placeholder.PassWordAgain" :validate-event="false"></el-input>
                        </el-form-item>
                        <!-- 重置密码 -->
                        <el-form-item>
                            <BigButton :btnItem="btnItem" @click-btn="editPass('ruleForm')"></BigButton>
                        </el-form-item>
                    </el-form>
                </el-col>
            </el-row>
            <!-- 马上登录 -->
            <el-row type="flex" justify="end">
                <el-col :span="4.5">
                    <span class="text" @click="toLogin">已有帐号，马上登录</span>
                </el-col>
            </el-row>
        </el-card>
    </div>
</template>

<script>
import NameText from '../Text/NameText.vue';
import BigButton from '../Button/BigButton.vue';
import CodeButton from '../Button/CodeButton.vue';
import { checkTel, checkPassword, checkPasswordAgain } from '../../utils/rules.js';
import { MessageInterface } from '../../js/ELE_Message/message.js';
import { checkRSA } from '../../utils/rsa.js';
export default {
    name: 'password_card',
    data () {
        //校验手机号
        const validateTel = (rule, value, callback) => {
            checkTel(rule, value, callback, '请输入手机号');
        };
        //校验密码
        const validatePassword = (rule, value, callback) => {
            checkPassword(rule, value, callback);
        };
        //二次校验密码
        const validatePasswordAgain = (rule, value, callback) => {
            checkPasswordAgain(rule, value, callback, this.form.PassWord);
        };
        return {
            form: {
                Tel: '',
                Code: '',
                PassWord: '',
                PassWordAgain: '',
                size: 'medium',
                placeholder: {
                    Tel: '请输入您的手机号',
                    PassWord: '请输入新密码',
                    PassWordAgain: '请再次输入新密码',
                    Code: '请输入验证码'
                }
            },
            rules: {
                //校验手机号
                Tel: [
                    { validator: validateTel }
                ],
                //校验验证码
                Code: [
                    { required: true, message: '请输入验证码' }
                ],
                //校验密码
                PassWord: [
                    { validator: validatePassword }
                ],
                //二次校验密码
                PassWordAgain: [
                    { validator: validatePasswordAgain }
                ]
            },
            btnItem: {
                Text: '重置密码'
            },
            show: true,
            count: '',
            timer: null,
            disabled: false
        }
    },
    components: { BigButton, NameText, CodeButton },
    methods: {
        //发送短信
        async sendCode () {
            if (this.form.Tel === '') {
                MessageInterface('请输入手机号', 'error', 5000);
            } else {
                //调用短信验证码接口
                let parmas = { phone: this.form.Tel }
                let codeRes = await this.$api.sendCodeResetInterface(parmas);
                if (codeRes.code == 0) {
                    MessageInterface('验证码已发送，5分钟内输入有效', 'success', 5000);
                    const TIME_COUNT = 60; //更改倒计时时间
                    if (!this.timer) {
                        this.count = TIME_COUNT;
                        this.show = false;
                        this.disabled = true;
                        this.timer = setInterval(() => {
                            if (this.count > 0 && this.count <= TIME_COUNT) {
                                this.count--;
                            } else {
                                this.show = true;
                                this.disabled = false;
                                clearInterval(this.timer); // 清除定时器
                                this.timer = null;
                            };
                        }, 1000);
                    };
                } else {
                    MessageInterface(`${codeRes.msg}`, 'error', 5000);
                };
            };
        },
        //重置密码
        editPass (formName) {
            this.$refs[formName].validate( async (valid) => {
                //进行校验
                if (valid) {
                    let data = { account: this.form.Tel, code: this.form.Code, newPassword: this.form.PassWord, confirmPassword: this.form.PassWordAgain };
                    let dataParams = {
                        data: checkRSA(data) 
                    };
                    let resetPasswordRes = await this.$api.resetPasswordInterface(dataParams);
                    if (resetPasswordRes.code === 0) {
                        MessageInterface('修改密码成功', 'success', 5000);
                        this.$router.push({
                            path: '/login'
                        });
                    } else {
                        MessageInterface(`${resetPasswordRes.msg}`, 'error', 5000);
                    };
                } else {
                    return false;
                };
            });
        },
        //跳转登录页面
        toLogin () {
            this.$router.push({
                path: '/login'
            });
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../../scss/base.scss';
.box-card {
    border-radius: 8px;
};

.text {
    font-size: $fontSizeExtra;
    cursor: $cursor;
    color: $mainColor;
    font-weight: 400;
};

.el-card {
    @include elCard(0, 8%, 0, 8%);
};

.el-button.is-disabled, .el-button.is-disabled:focus, .el-button.is-disabled:hover {
    color: #C0C4CC;
    cursor: not-allowed;
    background-image: none;
    background-color: #F5F7FA;
};
</style>
