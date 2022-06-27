<template>
    <div class="view_plan_add">
        <!-- 游戏新增弹窗 -->
        <el-dialog title="查看计划" custom-class="change_dialog" :visible.sync="centerDialogVisible" width="50%" center :hide-required-asterisk="true" :close-on-click-modal="false" :close-on-press-escape="false" :append-to-body="true" @close="closeViewPlan" :lock-scroll="false">
            <!-- 表单 -->
            <el-form :model="form" label-position="right">
                <!-- Input框 -->
                <!-- 计划ID -->
                <el-form-item label="计划ID" :label-width="labelWidth">
                    {{formItemView.id}}
                </el-form-item>
                <!-- 游戏名称 -->
                <el-form-item label="游戏名称" :label-width="labelWidth">
                    {{formItemView.gameName}}
                </el-form-item>
                <!-- 云游戏产品形态 -->
                <el-form-item label="云游戏产品形态" :label-width="labelWidth">
                    {{formItemView.planTypes | planTypesFilter}}
                </el-form-item>
                <!-- 试玩包 -->
                <el-form-item label="试玩包" :label-width="labelWidth">
                    <span >{{formItemView.playPkgUrl}}</span>
                </el-form-item>
                <div v-if="playPackageShow" class="textItemTip">
                    {{formItemView.playPkgUrl}}
                </div>
                <!-- 游戏icon -->
                <el-form-item label="游戏icon" :label-width="labelWidth">
                    <el-image style="width: 100px; height: 100px;" :src="formItemView.gameIcon" fit="fit"></el-image>
                </el-form-item>
                <!-- 安卓包下载地址 -->
                <el-form-item label="导下载地址（安卓端）" :label-width="labelWidth">
                    <span >{{formItemView.androidUrl}}</span>
                </el-form-item>
                <div v-if="AddressShow" class="textItemTipAndrod">
                    {{formItemView.androidUrl}}
                </div>
                <!-- 苹果应用商店跳转地址 -->
                <el-form-item label="导下载地址（IOS端）" :label-width="labelWidth">
                    <span >{{formItemView.iosUrl}}</span>
                </el-form-item>
                <div v-if="IOSAddressShow" class="textItemTipIOS">
                    {{formItemView.iosUrl}}
                </div>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-row type="flex" justify="center">
                    <!-- 修改 -->
                    <el-col :span="12">
                        <div v-if="formItemView.planStatus == 4">
                            <Button :btnItem="btnItem.commit" @click-btn="update()"></Button>
                        </div>
                        <div v-else>
                            <Button :btnItem="btnItem.close" @click-btn="close()"></Button>
                        </div>
                    </el-col>
                    <!-- 更改创建计划 -->
                    <UpdatePlanAdd v-if="UpdatePlanAddShow" @down-plan="downPlan" @close-plan="closePlan"></UpdatePlanAdd>
                </el-row>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import Button from '../../../../components/Button/Button.vue';
import UpdatePlanAdd from './UpdatePlanAdd.vue';
export default {
    name: 'view_plan_add',
    props: {
        formItemView: {
            default: Object
        }
    },
    data () {
        return {
            UpdatePlanAddShow: false,
            centerDialogVisible: true,
            labelWidth: '160px',
            form: {

            },
            btnItem: {
                commit: {
                    type: 'primary',
                    text: '修改',
                    plain: false,
                    size: 'medium'
                },
                close: {
                    type: 'primary',
                    text: '关闭',
                    plain: false,
                    size: 'medium'
                }
            },
            playPackageShow: false,
            AddressShow: false,
            IOSAddressShow: false
        }
    },
    methods: { 
        // 修改  
        update () {
            this.UpdatePlanAddShow = true;
            // this.$emit('update-viewPlanDialog');
        },
        // 关闭
        close () {
            this.$emit('update-viewPlan');
        },
        // 关闭查看计划弹窗
        closeViewPlan () {
            this.$emit('close-viewPlan');
        },
        //关闭修改弹窗
        closePlan () {
            this.UpdatePlanAddShow = false;
            this.$emit('close-viewPlan');
        },
        //提交关闭修改弹窗
        downPlan () {
            this.$emit('update-viewPlan');
        },
        // 鼠标移上去触发
        MouseOver (e, flag) {
            if (flag === 'playPackage') {
                this.playPackageShow = true;
            } else if (flag === 'Address') {
                this.AddressShow = true;
            } else if (flag === 'IOSAddress') {
                this.IOSAddressShow = true;
            };
        },
        // 鼠标移开触发
        MouseLeave (e, flag) {
            if (flag === 'playPackage') {
                this.playPackageShow = false;
            } else if (flag === 'Address') {
                this.AddressShow = false;
            } else if (flag === 'IOSAddress') {
                this.IOSAddressShow = false;
            };
        }
    },
    components: { Button, UpdatePlanAdd },
    filters: {
        planTypesFilter (data) {
            let planType = '';
            planType = data.join('');
            switch (planType) {
                case '1':
                    planType = '云游戏URL';
                    break;
                case '2':
                    planType = '云微端';
                    break;
                case '12':
                    planType = '云游戏URL/云微端';
                    break;
                case '21':
                    planType = '云微端/云游戏URL';
                    break;
            };
            return planType;
        }
    },
    mounted () {
        // console.log(this._props.formItemView);
        //将数据存储到sessionStorage中
        sessionStorage.setItem('formItemView', JSON.stringify(this._props.formItemView));
    }
}
</script>

<style lang="scss" scoped>
// .el-form-item /deep/ .el-form-item__content {
//     text-overflow: ellipsis;
//     white-space: nowrap;
//     overflow: hidden;
// };

//媒体查询适配 1024 1280 1366 1440 1680 1920
@media (min-width: 1024px) {
    .textItemTip {
        width: 53%;
        background: rgba(0, 0, 0, 0.7);
        font-size: 13px;
        line-height: 20px;
        color: #fff;
        padding: 1% 2%;
        box-sizing: border-box;
        border-radius: 4px;
        position: absolute;
        top: 44%;
        right: 5%;
        z-index: 100;
    };

    .textItemTipAndrod {
        width: 53%;
        background: rgba(0, 0, 0, 0.7);
        font-size: 13px;
        line-height: 20px;
        color: #fff;
        padding: 1% 2%;
        box-sizing: border-box;
        border-radius: 4px;
        position: absolute;
        top: 72%;
        right: 5%;
        z-index: 100;
    }

    .textItemTipIOS {
        width: 53%;
        background: rgba(0, 0, 0, 0.7);
        font-size: 13px;
        line-height: 20px;
        color: #fff;
        padding: 1% 2%;
        box-sizing: border-box;
        border-radius: 4px;
        position: absolute;
        top: 81%;
        right: 5%;
        z-index: 100;
    }
}

@media (min-width: 1280px) {
    .textItemTip {
        width: 53%;
        background: rgba(0, 0, 0, 0.7);
        font-size: 13px;
        line-height: 20px;
        color: #fff;
        padding: 1% 2%;
        box-sizing: border-box;
        border-radius: 4px;
        position: absolute;
        top: 44%;
        right: 12%;
        z-index: 100;
    };

    .textItemTipAndrod {
        width: 53%;
        background: rgba(0, 0, 0, 0.7);
        font-size: 13px;
        line-height: 20px;
        color: #fff;
        padding: 1% 2%;
        box-sizing: border-box;
        border-radius: 4px;
        position: absolute;
        top: 72%;
        right: 12%;
        z-index: 100;
    }

    .textItemTipIOS {
        width: 53%;
        background: rgba(0, 0, 0, 0.7);
        font-size: 13px;
        line-height: 20px;
        color: #fff;
        padding: 1% 2%;
        box-sizing: border-box;
        border-radius: 4px;
        position: absolute;
        top: 81%;
        right: 12%;
        z-index: 100;
    }
}

@media (min-width: 1366px) {
    .textItemTip {
        width: 53%;
        background: rgba(0, 0, 0, 0.7);
        font-size: 13px;
        line-height: 20px;
        color: #fff;
        padding: 1% 2%;
        box-sizing: border-box;
        border-radius: 4px;
        position: absolute;
        top: 44%;
        right: 14%;
        z-index: 100;
    };

    .textItemTipAndrod {
        width: 53%;
        background: rgba(0, 0, 0, 0.7);
        font-size: 13px;
        line-height: 20px;
        color: #fff;
        padding: 1% 2%;
        box-sizing: border-box;
        border-radius: 4px;
        position: absolute;
        top: 72%;
        right: 14%;
        z-index: 100;
    }

    .textItemTipIOS {
        width: 53%;
        background: rgba(0, 0, 0, 0.7);
        font-size: 13px;
        line-height: 20px;
        color: #fff;
        padding: 1% 2%;
        box-sizing: border-box;
        border-radius: 4px;
        position: absolute;
        top: 81%;
        right: 14%;
        z-index: 100;
    }
}


@media (min-width: 1440px) {
    .textItemTip {
        width: 53%;
        background: rgba(0, 0, 0, 0.7);
        font-size: 13px;
        line-height: 20px;
        color: #fff;
        padding: 1% 2%;
        box-sizing: border-box;
        border-radius: 4px;
        position: absolute;
        top: 44%;
        right: 15%;
        z-index: 100;
    };

    .textItemTipAndrod {
        width: 53%;
        background: rgba(0, 0, 0, 0.7);
        font-size: 13px;
        line-height: 20px;
        color: #fff;
        padding: 1% 2%;
        box-sizing: border-box;
        border-radius: 4px;
        position: absolute;
        top: 72%;
        right: 15%;
        z-index: 100;
    }

    .textItemTipIOS {
        width: 53%;
        background: rgba(0, 0, 0, 0.7);
        font-size: 13px;
        line-height: 20px;
        color: #fff;
        padding: 1% 2%;
        box-sizing: border-box;
        border-radius: 4px;
        position: absolute;
        top: 81%;
        right: 15%;
        z-index: 100;
    }
}

@media (min-width: 1680px) {
    .textItemTip {
        width: 53%;
        background: rgba(0, 0, 0, 0.7);
        font-size: 13px;
        line-height: 20px;
        color: #fff;
        padding: 1% 2%;
        box-sizing: border-box;
        border-radius: 4px;
        position: absolute;
        top: 44%;
        right: 19%;
        z-index: 100;
    };

    .textItemTipAndrod {
        width: 53%;
        background: rgba(0, 0, 0, 0.7);
        font-size: 13px;
        line-height: 20px;
        color: #fff;
        padding: 1% 2%;
        box-sizing: border-box;
        border-radius: 4px;
        position: absolute;
        top: 72%;
        right: 19%;
        z-index: 100;
    }

    .textItemTipIOS {
        width: 53%;
        background: rgba(0, 0, 0, 0.7);
        font-size: 13px;
        line-height: 20px;
        color: #fff;
        padding: 1% 2%;
        box-sizing: border-box;
        border-radius: 4px;
        position: absolute;
        top: 81%;
        right: 19%;
        z-index: 100;
    }
}

@media (min-width: 1920px) {
    .textItemTip {
        width: 53%;
        background: rgba(0, 0, 0, 0.7);
        font-size: 13px;
        line-height: 20px;
        color: #fff;
        padding: 1% 2%;
        box-sizing: border-box;
        border-radius: 4px;
        position: absolute;
        top: 44%;
        right: 22%;
        z-index: 100;
    };

    .textItemTipAndrod {
        width: 53%;
        background: rgba(0, 0, 0, 0.7);
        font-size: 13px;
        line-height: 20px;
        color: #fff;
        padding: 1% 2%;
        box-sizing: border-box;
        border-radius: 4px;
        position: absolute;
        top: 72%;
        right: 22%;
        z-index: 100;
    }

    .textItemTipIOS {
        width: 53%;
        background: rgba(0, 0, 0, 0.7);
        font-size: 13px;
        line-height: 20px;
        color: #fff;
        padding: 1% 2%;
        box-sizing: border-box;
        border-radius: 4px;
        position: absolute;
        top: 81%;
        right: 22%;
        z-index: 100;
    }
}
</style>

<style>
.el-dialog {
    padding: 1% 3%;
};
</style>