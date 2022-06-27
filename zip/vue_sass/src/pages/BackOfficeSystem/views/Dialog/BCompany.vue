<template>
    <div class="b_company">
        <!-- 企业信息弹窗 -->
        <el-dialog title="企业信息" custom-class="change_dialog" :visible.sync="centerDialogVisible" width="50%" center :hide-required-asterisk="true" :close-on-click-modal="false" :close-on-press-escape="false" :append-to-body="true" @close="closeInfo" :lock-scroll="false">
            <!-- 分割线 -->
            <el-divider></el-divider>
            <div class="planItem">
                <!-- 基本信息 -->
                <h3>基本信息</h3>
                <!-- 表单 -->
                <el-form :model="form" label-position="left">
                    <!-- 单位名称 -->
                    <el-form-item label="单位名称" :label-width="form.labelWidth">
                        {{BCompanyItem.corpName}}
                    </el-form-item>
                    <!-- 统一社会信用代码 -->
                    <el-form-item label="统一社会信用代码" :label-width="form.labelWidth">
                        {{BCompanyItem.licenseNum}}
                    </el-form-item>
                    <!-- 营业执照 -->
                    <el-form-item label="营业执照" :label-width="form.labelWidth">
                        <el-image style="width: 50%" :src="BCompanyItem.licenseUrl" fit="fit"></el-image>
                    </el-form-item>
                </el-form>
            </div>
            <!-- 分割线 -->
            <el-divider></el-divider>
            <div class="planItem">
                <!-- 联系人信息 -->
                <h3>联系人信息</h3>
                <!-- 表单 -->
                <el-form :model="form" label-position="left">
                    <!-- 联系人姓名 -->
                    <el-form-item label="联系人姓名" :label-width="form.labelWidth">
                        {{BCompanyItem.contactName}}
                    </el-form-item>
                    <!-- 联系人邮箱 -->
                    <el-form-item label="联系人邮箱" :label-width="form.labelWidth">
                        {{BCompanyItem.contactEmail}}
                    </el-form-item>
                    <!-- 联系人手机号 -->
                    <el-form-item label="联系人手机号" :label-width="form.labelWidth">
                        {{BCompanyItem.contactPhone}}
                    </el-form-item>
                    <!-- 备注 -->
                    <el-form-item label="备注" :label-width="form.labelWidth">
                        <el-input type="textarea" v-model="form.mark" :rows="4" :maxlength="100" show-word-limit></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-row type="flex" justify="center">
                    <!-- 不通过 -->
                    <el-col :span="6">
                        <Button :btnItem="btnItem.noPass" @click-btn="noPass()"></Button>
                    </el-col>
                    <!-- 通过 -->
                    <el-col :span="6">
                        <Button :btnItem="btnItem.pass" @click-btn="pass()"></Button>
                    </el-col>
                </el-row>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import Button from '../../../../components/Button/Button.vue';
export default {
    name: 'b_company',
    props: {
        BCompanyItem: {
            default: Object
        }
    },
    data () {
        return {
            centerDialogVisible: true,
            form: {
                labelWidth: '140px',
                mark: ''
            },
            btnItem: {
                noPass: {
                    type: 'primary',
                    text: '不通过',
                    plain: false,
                    size: 'medium'
                },
                pass: {
                    type: 'primary',
                    text: '通过',
                    plain: false,
                    size: 'medium'
                }
            }
        }
    },
    methods: {
        //通过
        pass () {
            //设置参数
            let data = { corpId: this._props.BCompanyItem.corpId, corpStatus: 2, remark: this.form.mark };
            this.$emit('down-pass', data);
        },
        //不通过
        noPass () {
             //设置参数
            let data = { corpId: this._props.BCompanyItem.corpId, corpStatus: 3, remark: this.form.mark };
            this.$emit('down-noPass', data);
        },
        //关闭弹窗
        closeInfo () {
            this.$emit('close-dialog');
        }
    },
    components: { Button },
    mounted () {
        // console.log(this._props.BCompanyItem);
        this.form.mark = this._props.BCompanyItem.remark;
    }
}
</script>

<style lang="scss" scoped>
@import '../../../../scss/base.scss';
.el-divider--horizontal {
    @include elDivider ();
}

.planItem {
    padding: 4%;
    h3 {
        margin-bottom: 4%;
    }
}
</style>
