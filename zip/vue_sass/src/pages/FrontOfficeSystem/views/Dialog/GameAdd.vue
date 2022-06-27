<template>
    <div class="game_add">
        <!-- 游戏新增弹窗 -->
        <el-dialog title="创建游戏" custom-class="change_dialog" :visible.sync="centerDialogVisible" width="45%" center :hide-required-asterisk="true" :close-on-click-modal="false" :close-on-press-escape="false" :append-to-body="true" @close="closeGame" :lock-scroll="false">
            <!-- 表单 -->
            <el-form :model="form" label-position="right" :rules="rules" ref="ruleForm">
                <!-- Input框 -->
                <!-- 游戏名称 -->
                <el-form-item label="游戏名称" prop="gameName" :label-width="form.labelWidth">
                    <el-input v-model="form.gameName" :size="form.size" :placeholder="form.placeholder.gameName" :validate-event="false"></el-input>
                </el-form-item>
                <!-- 联系人姓名 -->
                <el-form-item label="联系人姓名" prop="customerName" :label-width="form.labelWidth">
                    <el-input v-model="form.customerName" :size="form.size" :placeholder="form.placeholder.customerName" :validate-event="false"></el-input>
                </el-form-item>
                <!-- 联系人手机号 -->
                <el-form-item label="联系人手机号" prop="customerTel" :label-width="form.labelWidth">
                    <el-input v-model="form.customerTel" :size="form.size" :placeholder="form.placeholder.customerTel" :validate-event="false"></el-input>
                </el-form-item>
                <!-- 联系人邮箱 -->
                <el-form-item label="联系人邮箱" prop="customerEmail" :label-width="form.labelWidth">
                    <el-input v-model="form.customerEmail" :size="form.size" :placeholder="form.placeholder.customerEmail" :validate-event="false"></el-input>
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
import { checkGame, checkName, checkEmail, checkTel } from '../../../../utils/rules.js';
export default {
    name: 'game_add',
    props: {
        testItem: {
            default: String
        }
    },
    data () {
        //游戏名称校验
        const validateGame = (rule, value, callback) => {
            checkGame(rule, value, callback);
        };
        //联系人姓名校验
        const validateName = (rule, value, callback) => {
            checkName(rule, value, callback);
        };
        //联系人邮箱校验
        const validateEmail = (rule, value, callback) => {
            checkEmail(rule, value, callback);
        };
        //联系人手机号校验
        const validateTel = (rule, value, callback) => {
            checkTel(rule, value, callback, '联系人手机号信息必填');
        };
        return {
            centerDialogVisible: true,
            form: {
                size: 'medium',
                labelWidth: '120px',
                placeholder: {
                    gameName: '请输入游戏名称',
                    customerName: '请输入联系人姓名',
                    customerTel: '请输入联系人手机号',
                    customerEmail: '请输入联系人邮箱'
                },
                gameName: '',
                customerName: '',
                customerTel: '',
                customerEmail: ''
            },
            rules: {
                //校验游戏名称
                gameName: [
                    { required: true, message: '游戏名称信息必填' },
                    { validator: validateGame }
                ],
                //校验联系人姓名
                customerName: [
                    { required: true, message: '联系人姓名信息必填' },
                    { validator: validateName }
                ],
                //校验联系人手机号
                customerTel: [
                    { required: true, message: '联系人手机号信息必填' },
                    { validator: validateTel }
                ],
                //校验联系人邮箱
                customerEmail: [
                    { required: true, message: '联系人邮箱信息必填' },
                    { validator: validateEmail }
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
        // 提交
        commit (formRule) {
            //提交时进行校验
            this.$refs[formRule].validate( async (valid) => {
                if (valid) {
                    //调用新增游戏接口
                    let data = {
                        gameName: this.form.gameName,
                        contactName: this.form.customerName,
                        contactPhone: this.form.customerTel,
                        contactEmail: this.form.customerEmail
                    };
                    this.$emit('down-game', data);
                } else {
                    //验证未通过
                    return false;
                };
            });
        },
        // 关闭弹窗
        closeGame () {
            this.$emit('close-game');
        }
    },
    async mounted () {
        //获取认证信息接口
        let checkProveRes = await this.$api.checkProveInterface();
        // console.log(checkProveRes);
        if (checkProveRes.code === 0) {
            //获取联系人姓名
            this.form.customerName = checkProveRes.data.contactName;
            //获取联系人手机号
            this.form.customerTel = checkProveRes.data.contactPhone;
            //获取联系人邮箱
            this.form.customerEmail = checkProveRes.data.contactEmail;
        };
    }
}
</script>

<style lang="scss" scoped>

</style>

<style>
.el-dialog {
    padding: 1% 3%;
    border-radius: 8px;
}
</style>