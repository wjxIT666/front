<template>
    <div class="b_login_card">
        <!-- 后台登录页面 -->
        <el-row type="flex" justify="center">
            <el-col :span="8">
                <el-card>
                    <!-- 表单数据 -->
                    <el-form :model="form" label-position="left" :rules="rules" ref="ruleForm">
                        <!-- 账号 -->
                        <el-form-item label="账号" prop="Account" :label-width="form.labelWidth">
                            <el-input v-model="form.Account" :size="form.size" :placeholder="form.placeholder.Account" :validate-event="false"></el-input>
                        </el-form-item>
                        <!-- 密码 -->
                        <el-form-item label="密码" prop="PassWord" :label-width="form.labelWidth">
                            <el-input type="password" v-model="form.PassWord" :size="form.size" :placeholder="form.placeholder.PassWord" :validate-event="false"></el-input>
                        </el-form-item>
                        <!-- 登录 -->
                        <el-form-item>
                            <BigButton :btnItem="btnItem" @click-btn="login('ruleForm')"></BigButton>
                        </el-form-item>
                    </el-form>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import BigButton from '../Button/BigButton.vue';
import { checkBAccount, checkBPassword } from '../../utils/rules.js';
import { MessageInterface } from '../../js/ELE_Message/message.js';
import { checkRSA } from '../../utils/rsa.js';
export default {
    name: 'b_login_card',
    data () {
        //校验账号
        const validateBAccount = (rule, value, callback) => {
            checkBAccount(rule, value, callback);
        };
        //校验密码
        const validateBPassword = (rule, value, callback) => {
            checkBPassword(rule, value, callback);
        };
        return {
            form: {
                Account: '',
                PassWord: '',
                labelWidth: '60px',
                placeholder: {
                    Account: '请填写账号',
                    PassWord: '请填写密码'
                }
            },
            rules: {
                //校验账号
                Account: [
                    { validator: validateBAccount }
                ],
                //校验密码
                PassWord: [
                    { validator: validateBPassword }
                ]
            },
            btnItem: {
                Text: '登录'
            }
        }
    },
    components: { BigButton },
    methods: {
        //登录
        login (formName) {
            this.$refs[formName].validate( async (valid) => {
                //进行校验
                if (valid) {
                    //调用登录接口
                    let data = {
                        username: this.form.Account,
                        password: this.form.PassWord
                    };
                    let dataParams = {
                        data: checkRSA(data)
                    };
                    let loginRes = await this.$api.loginInterface(dataParams);
                    if (loginRes.code === 0) {
                        //获取token
                        let token = loginRes.data;
                        //将token存储到sessionStorage中
                        sessionStorage.setItem('token', token);
                        MessageInterface('登录成功', 'success', 5000);
                        //进入到列表页
                        this.$router.push( { path: '/index' } );
                    } else {
                        MessageInterface(`${loginRes.msg}`, 'error', 5000);
                    };
                } else {
                    return false;
                };
            });
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../../scss/base.scss';
.b_login_card {
    height: 100%;
    .el-card {
        @include elCard(10%, 8%, 10%, 8%);
        margin: 50% auto;
    };
};
</style>
