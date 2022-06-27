<template>
    <div class="saas_b_power">
        <!-- 创建角色 -->
        <!-- <div class="saas_b_power_search">
            <el-row type="flex" justify="star">
                <el-col :span="4">
                    <Button :btnItem="btnItem" @click-btn="addUser"></Button>
                </el-col>
                
                <BPowerAdd v-if="BPowerAddShow" @bpower-add="BPowerAdd" @close-dialog="closeDialog"></BPowerAdd>
            </el-row>
        </div> -->
        <!-- 表格 -->
        <el-table
            v-if="tableData.length"
            :data="tableData"
            stripe
            size="small"
            :header-cell-style="{background:'#EEEEEE', color:'#333', 'text-align':'center'}"
            :cell-style="{'text-align':'center'}"
            >
                <!-- ID -->
                <el-table-column
                    prop="id"
                    label="ID"
                    >
                </el-table-column>
                <!-- 角色名称 -->
                <el-table-column
                    prop="name"
                    label="角色名称"
                    >
                </el-table-column>
                <!-- 角色状态 -->
                <el-table-column
                    label="角色状态"
                    >
                    <template slot-scope="scope">
                        {{roleStatus(scope.row.roleStatus)}}
                    </template>
                </el-table-column>
                <!-- 操作 -->
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button
                            size="small"
                            @click="freeze(scope.$index, scope.row)">{{scope.row.roleStatus === 1 ? '冻结' : '启用'}}
                        </el-button>
                        <!-- <el-button
                            size="small"
                            @click="disposition(scope.$index, scope.row)">配置权限
                            <BPowerConfig v-if="BPowerConfigShow" :BPowerConfigItem="BPowerConfigItem" @close-powerConfig="closePowerConfig"></BPowerConfig>
                        </el-button> -->
                    </template>
                </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-row type="flex" justify="center">
            <el-col :span="8">
                <div class="page">
                    <Page v-if="tableData.length" :totalLength="tableData.length" :pageSize="pageCount" :currentPage="currentPage" @current-page="getPage"></Page>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import Button from '../Button/Button.vue';
import Page from '../Page/Page.vue';
import BPowerAdd from '../../pages/BackOfficeSystem/views/Dialog/BPowerAdd.vue';
import BPowerConfig from '../../pages/BackOfficeSystem/views/Dialog/BPowerConfig.vue';
import { MessageInterface } from '../../js/ELE_Message/message.js';
import { userStatusChange } from '../../utils/common.js';
export default {
    name: 'saas_b_power',
    data () {
        return {
            currentPage: 1, //当前初始化页
            pageCount: 10, //每页条数
            btnItem: {
                type: 'primary',
                text: '创建角色',
                plain: false,
                size: 'medium'
            },
            tableData: [],
            BPowerAddShow: false,
            BPowerConfigShow: false,
            BPowerConfigItem: {}
        }
    },
    components: { Button, BPowerAdd, Page, BPowerConfig },
    methods: {
        //分页改动时触发
        async getPage (data) {
            this.currentPage = data;
            //获取角色列表
            let params = { pageNo: this.currentPage, pageSize: this.pageCount };
            let BPowerPageRes = await this.$api.BPowerPageInterface(params);
            if (BPowerPageRes.code === 0) {
                //列表赋值
                this.tableData = [...BPowerPageRes.data.rows];
                //总条数
                this.tableData.length = BPowerPageRes.data.totalRows;
            } else {
                MessageInterface(`${BPowerPageRes.msg}`, 'error', 5000);
            };
        },
        //打开创建角色弹窗 
        addUser () {
            this.BPowerAddShow = true;
        },
        //关闭创建角色弹窗
        closeDialog () {
            this.BPowerAddShow = false;
        },
        //关闭创建角色弹窗--提交
        async BPowerAdd (data) {
            let BPowerAddRes = await this.$api.BPowerAddInterface(data);
            // console.log(BPowerAddRes);
            if (BPowerAddRes.code === 0) {
                MessageInterface(`新增角色成功`, 'success', 5000);
                //获取角色列表
                let params = { pageNo: this.currentPage, pageSize: this.pageCount };
                let BPowerPageRes = await this.$api.BPowerPageInterface(params);
                if (BPowerPageRes.code === 0) {
                    //列表赋值
                    this.tableData = [...BPowerPageRes.data.rows];
                    //总条数
                    this.tableData.length = BPowerPageRes.data.totalRows;
                } else {
                    MessageInterface(`${BPowerPageRes.msg}`, 'error', 5000);
                };
                this.BPowerAddShow = false;
            } else {
                MessageInterface(`${BPowerAddRes.msg}`, 'error', 5000);
            };
        },
        //冻结/启用
        freeze (index, row) {
            // console.log(row);
            let msg;
            let statusCode;
            if (row.roleStatus == 1) {
                msg = '冻结';
                statusCode = 9;
            } else if (row.roleStatus == 9) {
                msg = '启用';
                statusCode = 1;
            };
            this.$confirm(`确认${msg}此角色吗？`, '温馨提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消'
            }).then(async () => {
                let data = { roleId: row.roleId, roleStatus: statusCode };
                let BPowerStatusChangeRes = await this.$api.BPowerStatusChangeInterface(data);
                if (BPowerStatusChangeRes.code === 0) {
                    MessageInterface(`状态修改成功`, 'success', 5000);
                    //获取角色列表
                    let params = { pageNo: this.currentPage, pageSize: this.pageCount };
                    let BPowerPageRes = await this.$api.BPowerPageInterface(params);
                    if (BPowerPageRes.code === 0) {
                        //列表赋值
                        this.tableData = [...BPowerPageRes.data.rows];
                        //总条数
                        this.tableData.length = BPowerPageRes.data.totalRows;
                    } else {
                        MessageInterface(`${BPowerPageRes.msg}`, 'error', 5000);
                    };
                } else {
                    MessageInterface(`${BPowerStatusChangeRes.msg}`, 'error', 5000);
                };     
            }).catch(() => {
                //取消 默认关闭弹窗      
            });        
        },
        //配置权限
        async disposition (index, row) {
            this.BPowerConfigShow = true;
            this.BPowerConfigItem = {...row};
            //获取配置权限的接口
            let data = {
                id: row.id,
                name: row.name,
                roleStatus: row.roleStatus
            };
            let BPowerConfigRes = await this.$api.BPowerConfigInterface(data);
            // console.log(BPowerConfigRes);
        },
        //关闭配置权限
        closePowerConfig () {
            this.BPowerConfigShow = false;
        },
        //判断用户状态
        roleStatus (roleStatus) {
           let roleStatusRes = userStatusChange(roleStatus);
           return roleStatusRes;
        }
    },
    async mounted () {
        //获取角色列表
        let params = { pageNo: this.currentPage, pageSize: this.pageCount };
        let BPowerPageRes = await this.$api.BPowerPageInterface(params);
        if (BPowerPageRes.code === 0) {
            //列表赋值
            this.tableData = [...BPowerPageRes.data.rows];
            //总条数
            this.tableData.length = BPowerPageRes.data.totalRows;
        } else {
            MessageInterface(`${BPowerPageRes.msg}`, 'error', 5000);
        };
    }
}
</script>

<style lang="scss" scoped>
.saas_b_power {
    .saas_b_power_search {
        margin: 1% 0 3% 0;
    };
    .page {
        margin: 20% 0 10% 0;
    };
};

.el-button /deep/ span {
    margin-left: 5px;
};

.name {
    font-size: 14px;
};

//解决el-table窗口抖动问题
.el-table{
  width:99.9% !important;
}
</style>
