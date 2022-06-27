<template>
    <div class="b_operation_commit">
        <!-- 上传云化信息弹窗 -->
        <el-dialog title="云化信息上传" custom-class="change_dialog" :visible.sync="centerDialogVisible" width="50%" center :show-close="false" :hide-required-asterisk="true" :close-on-click-modal="false" :close-on-press-escape="false" :append-to-body="true" :lock-scroll="false">
             <!-- 表单 -->
            <el-form :model="form" label-position="left" :rules="rules" ref="ruleForm">
                <!-- 计划ID -->
                <el-form-item label="计划ID" :label-width="form.labelWidth">
                    {{BOperationCommitItem.planVid}}
                </el-form-item>
                <!-- 游戏名称 -->
                <el-form-item label="游戏名称" :label-width="form.labelWidth">
                    {{BOperationCommitItem.gameName}}
                </el-form-item>
                <!-- CP -->
                <el-form-item label="CP" :label-width="form.labelWidth">
                    {{BOperationCommitItem.corpName}}
                </el-form-item>
                <!-- corpkey -->
                <el-form-item label="corpkey" prop="corpkey" :label-width="form.labelWidth">
                    <el-input v-model="form.corpkey" :size="form.size" :placeholder="form.placeholder.corpkey" :validate-event="false"></el-input>
                </el-form-item>
                <!-- gid -->
                <el-form-item label="gid" prop="gid" :label-width="form.labelWidth">
                    <el-input v-model.number="form.gid" :size="form.size" :placeholder="form.placeholder.gid" :validate-event="false"></el-input>
                </el-form-item>
                <!-- gameId -->
                <el-form-item label="gameId" prop="gameId" :label-width="form.labelWidth">
                    <el-input v-model="form.gameId" :size="form.size" :placeholder="form.placeholder.gameId" :validate-event="false"></el-input>
                </el-form-item>
                <!-- 包名 -->
                <el-form-item label="包名" prop="package" :label-width="form.labelWidth">
                    <el-input v-model="form.package" :size="form.size" :placeholder="form.placeholder.package" :validate-event="false"></el-input>
                </el-form-item>
                <!-- 是否生成独立页面 -->
                <el-form-item label="是否生成独立页面" prop="newpage" :label-width="form.labelWidth">
                    <el-radio-group v-model="form.newpage">
                        <el-radio :label="0">统一页面</el-radio>
                        <el-radio :label="1">独立页面</el-radio>
                    </el-radio-group>
                </el-form-item>
                <!-- 页面标题 -->
                <el-form-item label="页面标题" prop="title" :label-width="form.labelWidth">
                    <el-input v-model="form.title" :size="form.size" :placeholder="form.placeholder.title" :validate-event="false"></el-input>
                </el-form-item>
                <!-- 是否支持边玩边下 -->
                <el-form-item label="是否支持边玩边下" prop="download" :label-width="form.labelWidth">
                    <el-radio-group v-model="form.download">
                        <el-radio :label="1">支持</el-radio>
                        <el-radio :label="0">不支持</el-radio>
                    </el-radio-group>
                </el-form-item>
                <!-- 试玩倒计时 -->
                <el-form-item label="试玩倒计时" prop="playtime" :label-width="form.labelWidth">
                    <el-input v-model="form.playtime" :size="form.size" :placeholder="form.placeholder.playtime" :validate-event="false"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-row type="flex" justify="center">
                    <!-- 提交 -->
                    <el-col :span="8">
                        <Button :btnItem="btnItem.commit" @click-btn="commit('ruleForm')"></Button>
                    </el-col>
                    <!-- 取消 -->
                    <el-col :span="8">
                        <Button :btnItem="btnItem.cancel" @click-btn="cancel('ruleForm')"></Button>
                    </el-col>
                </el-row>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import Button from '../../../../components/Button/Button.vue';
import { playTime } from '../../../../utils/rules.js';
export default {
    name: 'b_operation_commit',
    props: {
        BOperationCommitItem: {
            default: Object
        }
    },
    data () {
        //校验试玩倒计时
        const validatePlayTime = (rule, value, callback) => {
            playTime(rule, value, callback);
        };
        return {
            centerDialogVisible: true,
            form: {
                size: 'medium',
                labelWidth: '150px',
                placeholder: {
                    corpkey: '请填写corpkey',
                    gid: '请填写gid',
                    gameId: '请填写gameId',
                    title: '请填写页面标题',
                    package: '请填写package',
                    playtime: '请输入试玩倒计时'
                },
                corpkey: '',
                gid: '',
                gameId: '',
                title: '',
                package: '',
                newpage: '',
                download: '',
                playtime: '600'
            },
            rules: {
                //校验corpkey
                corpkey: [
                    {
                        required: true, message: '请填写corpkey',
                        len: 32, message: 'corpkey长度为32位'
                    }
                ],
                //校验gid
                gid: [
                    { 
                        required: true, message: '请填写gid',
                        pattern: /^\d{1,10}$/, message: 'gid只能是数字，长度不得超过10位' 
                    }
                ],
                //校验gameId
                gameId: [
                    {
                        required: true, message: '请填写gameId',
                        max: 32, message: 'gameId长度为32位'
                    }
                ],
                //校验页面标题
                title: [
                    {
                        required: true, message: '请填写页面标题'
                    }
                ],
                //校验包名
                package: [
                    {
                        required: true, message: '请填写package',
                        max: 50, message: 'package最长为50位'
                    }
                ],
                //校验独立页面
                newpage: [
                    {
                        required: true, message: '请选择是否生成独立页面'
                    }
                ],
                //边玩边下
                download: [
                    {
                        required: true, message: '请选择是否支持边玩边下'
                    }
                ],
                //试玩倒计时
                playtime: [
                    { validator: validatePlayTime }
                ]
            },
            btnItem: {
                commit: {
                    type: 'primary',
                    text: '提交',
                    plain: false,
                    size: 'medium'
                },
                cancel: {
                    type: 'primary',
                    text: '取消',
                    plain: false,
                    size: 'medium'
                }
            }
        }
    },
    methods: {
        //提交
        commit (formRule) {
            //提交时进行校验
            this.$refs[formRule].validate( async (valid) => {
                if (valid) {
                   let data = {
                       approveId: this._props.BOperationCommitItem.approveId,
                       corpkey: this.form.corpkey,
                       download: this.form.download,
                       gameid: this.form.gameId,
                       gid: this.form.gid,
                       newpage: this.form.newpage,
                       pagetitle: this.form.title,
                       pkgname: this.form.package,
                       planId: this._props.BOperationCommitItem.planId,
                       playtime: this.form.playtime
                   };
                   this.$emit('commit-boperation', data);
                } else {
                    //验证未通过
                    return false;
                };
            });
        },
        //取消
        cancel () {
            this.$emit('close-dialog');
        }
    },
    components: { Button },
    mounted () {
        // console.log(this._props.BOperationCommitItem);
    }
}
</script>

<style lang="scss" scoped>
.el-dialog {
    padding: 1% 3%;
}
</style>
