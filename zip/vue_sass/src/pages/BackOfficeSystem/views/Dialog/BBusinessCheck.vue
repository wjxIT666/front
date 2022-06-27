<template>
    <div class="b_business_plan">
        <!-- 计划审核弹窗 -->
        <el-dialog title="计划审核" custom-class="change_dialog" :visible.sync="centerDialogVisible" width="80%" center :show-close="true" :hide-required-asterisk="true" :close-on-click-modal="false" :close-on-press-escape="false" :append-to-body="true" @close="closeDialog" :lock-scroll="false">
            <!-- 分割线 -->
            <el-divider></el-divider>
            <div class="planItem">
                <!-- 游戏信息 -->
                <h3>游戏信息</h3>
                <!-- 表单 -->
                <el-row type="flex" justify="star">
                    <el-col :span="12">
                        <!-- 表单 -->
                        <el-form :model="form" label-position="left">
                            <!-- 计划ID -->
                            <el-form-item label="计划ID" :label-width="form.labelWidth">
                                {{BBusinessCheckItem.planVid}}
                            </el-form-item>
                            <!-- 游戏名称 -->
                            <el-form-item label="游戏名称" :label-width="form.labelWidth">
                                {{BBusinessCheckItem.gameName}}
                            </el-form-item>
                            <!-- 试玩包下载地址 -->
                            <el-form-item label="试玩包下载地址" :label-width="form.labelWidth">
                                {{BBusinessCheckItem.playPkgUrl}}
                            </el-form-item>
                            <!-- 安卓推广包下载地址 -->
                            <el-form-item label="安卓推广包下载地址" :label-width="form.labelWidth">
                                {{BBusinessCheckItem.androidUrl}}
                            </el-form-item>
                        </el-form>
                    </el-col>
                    <el-col :span="12">
                        <!-- 表单 -->
                        <el-form :model="form" label-position="left">
                            <!-- CP -->
                            <el-form-item label="CP" :label-width="form.labelWidth">
                                {{BBusinessCheckItem.corpName}}
                            </el-form-item>
                            <!-- 云游戏产品形态 -->
                            <el-form-item label="云游戏产品形态" :label-width="form.labelWidth">
                                {{BBusinessCheckItem.plantype}}
                            </el-form-item>
                            <!-- 游戏icon -->
                            <el-form-item label="游戏icon" :label-width="form.labelWidth">
                                <el-image style="width: 70%;" :src="BBusinessCheckItem.gameIcon" fit="fit"></el-image>
                            </el-form-item>
                            <!-- 苹果应用商店跳转地址 -->
                            <el-form-item label="苹果应用商店跳转地址" :label-width="form.labelWidth">
                                {{BBusinessCheckItem.iosUrl}}
                            </el-form-item>
                        </el-form>
                    </el-col>
                </el-row>
            </div>
            <!-- 分割线 -->
            <el-divider></el-divider>
            <div class="planItem">
                <!-- 联系人信息 -->
                <h3>联系人信息</h3>
                <!-- 表单 -->
                <el-row type="flex" justify="star">
                    <el-col :span="12">
                        <!-- 表单 -->
                        <el-form :model="form" label-position="left">
                            <!-- 联系人 -->
                            <el-form-item label="联系人" :label-width="form.labelWidth">
                                {{BBusinessCheckItem.contactName}}
                            </el-form-item>
                            <!-- 联系人手机号 -->
                            <el-form-item label="联系人手机号" :label-width="form.labelWidth">
                                {{BBusinessCheckItem.contactPhone}}
                            </el-form-item>
                        </el-form>
                    </el-col>
                    <el-col :span="12">
                        <!-- 表单 -->
                        <el-form :model="form" label-position="left">
                            <!-- 联系人邮箱 -->
                            <el-form-item label="联系人邮箱" :label-width="form.labelWidth">
                                {{BBusinessCheckItem.contactEmail}}
                            </el-form-item>
                        </el-form>
                    </el-col>
                </el-row>
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
    name: 'b_business_plan',
    props: {
        BBusinessCheckItem: {
            default: Object
        }
    },
    data () {
        return {
            centerDialogVisible: true,
            form: {
                labelWidth: '160px'
            },
            btnItem: {
                pass: {
                    type: 'primary',
                    text: '通过',
                    plain: false,
                    size: 'medium'
                },
                noPass: {
                    type: 'primary',
                    text: '不通过',
                    plain: false,
                    size: 'medium'
                }
            }
        }
    },
    methods: {
        //通过
        pass () {
            let data = {
                approveId: this._props.BBusinessCheckItem.approveId,
                operationStatus: 3
            };
            this.$emit('down-pass', data);
        },
        //不通过
        noPass () {
            let data = {
                approveId: this._props.BBusinessCheckItem.approveId,
                operationStatus: 4
            };
            this.$emit('down-noPass', data);
        },
        //关闭弹窗
        closeDialog () {
            this.$emit('close-dialog');
        }
    },
    components: { Button },
    mounted () {
        
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
