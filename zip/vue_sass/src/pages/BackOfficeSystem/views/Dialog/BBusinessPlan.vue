<template>
    <div class="b_business_plan">
        <!-- 计划详情弹窗 -->
        <el-dialog title="计划详情" custom-class="change_dialog" :visible.sync="centerDialogVisible" width="80%" center :show-close="false" :hide-required-asterisk="true" :close-on-click-modal="false" :close-on-press-escape="false" :append-to-body="true" :lock-scroll="false">
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
                                {{BBusinessPlanItem.planVid}}
                            </el-form-item>
                            <!-- 游戏名称 -->
                            <el-form-item label="游戏名称" :label-width="form.labelWidth">
                                {{BBusinessPlanItem.gameName}}
                            </el-form-item>
                            <!-- 试玩包下载地址 -->
                            <el-form-item label="试玩包下载地址" :label-width="form.labelWidth">
                                {{BBusinessPlanItem.playPkgUrl}}
                            </el-form-item>
                            <!-- 安卓推广包下载地址 -->
                            <el-form-item label="安卓推广包下载地址" :label-width="form.labelWidth">
                                {{BBusinessPlanItem.androidUrl}}
                            </el-form-item>
                        </el-form>
                    </el-col>
                    <el-col :span="12">
                        <!-- 表单 -->
                        <el-form :model="form" label-position="left">
                            <!-- CP -->
                            <el-form-item label="CP" :label-width="form.labelWidth">
                                {{BBusinessPlanItem.corpName}}
                            </el-form-item>
                            <!-- 云游戏产品形态 -->
                            <el-form-item label="云游戏产品形态" :label-width="form.labelWidth">
                                {{BBusinessPlanItem.plantype}}
                            </el-form-item>
                            <!-- 游戏icon -->
                            <el-form-item label="游戏icon" :label-width="form.labelWidth">
                                <el-image style="width: 70%;" :src="BBusinessPlanItem.gameIcon" fit="fit"></el-image>
                            </el-form-item>
                            <!-- 苹果应用商店跳转地址 -->
                            <el-form-item label="苹果应用商店跳转地址" :label-width="form.labelWidth">
                                {{BBusinessPlanItem.iosUrl}}
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
                                {{BBusinessPlanItem.contactName}}
                            </el-form-item>
                            <!-- 联系人手机号 -->
                            <el-form-item label="联系人手机号" :label-width="form.labelWidth">
                                {{BBusinessPlanItem.contactPhone}}
                            </el-form-item>
                            <!-- 计划状态 -->
                            <el-form-item label="计划状态" :label-width="form.labelWidth">
                                <span class="approveStatus">{{BBusinessPlanItem.approveStatus | approveStatusFilter}}</span>
                            </el-form-item>
                        </el-form>
                    </el-col>
                    <el-col :span="12">
                        <!-- 表单 -->
                        <el-form :model="form" label-position="left">
                            <!-- 联系人邮箱 -->
                            <el-form-item label="联系人邮箱" :label-width="form.labelWidth">
                                {{BBusinessPlanItem.contactEmail}}
                            </el-form-item>
                        </el-form>
                    </el-col>
                </el-row>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-row type="flex" justify="center">
                    <!-- 提交 -->
                    <el-col :span="8">
                        <Button :btnItem="btnItem.commit" @click-btn="commit()"></Button>
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
        BBusinessPlanItem: {
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
                commit: {
                    type: 'primary',
                    text: '关闭',
                    plain: false,
                    size: 'medium'
                }
            }
        }
    },
    methods: {
        //关闭
        commit () {
            this.$emit('close-bplan');
        }
    },
    components: { Button },
    mounted () {
        // console.log(this._props.BBusinessPlanItem);
    },
    filters: {
        approveStatusFilter (data) {
            switch (data) {
                case 2: 
                    data = '待审核';
                    break;
                case 3:
                    data = '通过';
                    break;
                case 4:
                    data = '不通过';
                    break;
                case 6:
                    data = '已上传';
                    break;
            };
            return data;
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../../../../scss/base.scss';
.el-divider--horizontal {
    @include elDivider ();
};

.planItem {
    padding: 4%;
    h3 {
        margin-bottom: 4%;
    };
};

.approveStatus {
    color: red;
};
</style>
