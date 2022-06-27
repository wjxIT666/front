<template>
    <div class="b_cloud_commit">
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
            <!-- Tab栏 -->
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="上传云化信息" name="cloudNormal">
                    <!-- 表单 -->
                    <el-form :model="form" label-position="left" :rules="rules" ref="ruleForm">
                        <!-- corpkey -->
                        <el-form-item label="corpkey（必填）" prop="corpkey" :label-width="form.labelWidth">
                            <el-input v-model="form.corpkey" :size="form.size" :placeholder="form.placeholder.corpkey" :validate-event="false"></el-input>
                        </el-form-item>
                        <!-- gid -->
                        <el-form-item label="gid（必填）" prop="gid" :label-width="form.labelWidth">
                            <el-input v-model="form.gid" :size="form.size" :placeholder="form.placeholder.gid" :validate-event="false"></el-input>
                        </el-form-item>
                        <!-- 包名 -->
                        <el-form-item label="包名（必填）" prop="package" :label-width="form.labelWidth">
                            <el-input v-model="form.package" :size="form.size" :placeholder="form.placeholder.package" :validate-event="false"></el-input>
                        </el-form-item>
                    </el-form>
                </el-tab-pane>
                <el-tab-pane label="云化异常反馈" name="cloudError">
                    <!-- 表单 -->
                    <el-form :model="form" label-position="left">
                        <!-- 异常原因 -->
                        <el-form-item label="异常原因" :label-width="form.labelWidth">
                            <el-checkbox-group v-model="form.error">
                                <el-checkbox label="试玩包异常" name="type"></el-checkbox>
                                <el-checkbox label="试玩包适配异常" name="type"></el-checkbox>
                            </el-checkbox-group>
                        </el-form-item>
                        <!-- 备注 -->
                        <el-form-item label="备注" :label-width="form.labelWidth">
                            <el-input type="textarea" v-model="form.mark"></el-input>
                        </el-form-item>
                    </el-form>
                </el-tab-pane>
            </el-tabs>
            <div slot="footer" class="dialog-footer">
                <el-row type="flex" justify="center" :gutter="20">
                    <!-- 提交 -->
                    <el-col :span="6">
                        <Button :btnItem="btnItem.commit" @click-btn="commit('ruleForm')"></Button>
                    </el-col>
                    <!-- 取消 -->
                    <el-col :span="6">
                        <Button :btnItem="btnItem.cancel" @click-btn="cancel()"></Button>
                    </el-col>
                </el-row>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import Button from '../../../../components/Button/Button.vue';
export default {
    name: 'b_cloud_commit',
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
            activeName: 'cloudNormal',
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
        //Tab蓝切换
        handleClick(tab, event) {
            // console.log(tab, event);
        },
        // 提交
        commit (formRule) {
            //提交时进行校验
            this.$refs[formRule].validate( async (valid) => {
                if (valid) {
                    
                } else {
                    //验证未通过
                    return false;
                };
            });
        },
        // 取消
        cancel () {
            this.$emit('close-cancel');
        }
    },
    components: { Button }
}
</script>

<style lang="scss" scoped>

</style>
