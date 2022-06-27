<template>
    <div class="saas_b_operation">
        <!-- 查询 -->
        <div class="saas_b_operation_search">
            <el-row type="flex" justify="end">
                <el-col :span="24">
                    <el-row type="flex" justify="end" align="middle">
                        <el-col :span="9">
                            <InputSelect :inpItem="inpItem" @inp-search="inpSearch"></InputSelect>
                        </el-col>
                    </el-row>
                </el-col>
            </el-row>
        </div>
        <!-- 表格 -->
        <el-table
            v-if="tableData.length"
            :data="tableData"
            stripe
            size="small"
            :header-cell-style="{background:'#EEEEEE', color:'#333', 'text-align':'center'}"
            :cell-style="{'text-align':'center'}"
            >
                <!-- CP -->
                <el-table-column
                    prop="corpName"
                    width="150px"
                    label="CP"
                    >
                </el-table-column>
                <!-- 计划ID -->
                <el-table-column
                    prop="planVid"
                    width="150px"
                    label="计划ID"
                    >
                </el-table-column>
                <!-- 游戏名称 -->
                <el-table-column
                    prop="gameName"
                    width="150px"
                    label="游戏名称">
                </el-table-column>
                <!-- 云游戏产品形态 -->
                <el-table-column
                    prop="plantype"
                    width="150px"
                    label="云游戏产品形态">
                </el-table-column>
                <!-- 商务 -->
                <el-table-column
                    prop="confirmUser"
                    width="150px"
                    label="商务">
                </el-table-column>
                <!-- 商务审核时间 -->
                <el-table-column
                    prop="confirmTime"
                    width="200px"
                    label="商务审核时间"
                    :formatter="businessTime">
                </el-table-column>
                <!-- 状态 -->
                <el-table-column
                    width="150px"
                    label="状态">
                    <template slot-scope="scope">
                        {{operationStatus(scope.row.approveStatus)}}
                    </template>
                </el-table-column>
                <!-- 执行人 -->
                <el-table-column
                    prop="approveUser"
                    width="150px"
                    label="执行人">
                </el-table-column>
                <!-- 云游戏资源 -->
                <el-table-column label="操作" width="200px">
                    <template slot-scope="scope">
                        <el-button
                            size="mini"
                            type="text"
                            @click="check(scope.$index, scope.row)">计划详情
                            <!-- 计划详情弹窗 -->
                            <BCheckOperation v-if="BCheckOperationShow" :BCheckOperationItem="BCheckOperationItem" @close-cancel="cancel"></BCheckOperation>
                        </el-button>
                        <el-button
                            size="mini"
                            type="text"
                            :disabled="scope.row.planStatus === 8"
                            @click="download(scope.$index, scope.row)">上传云化信息
                        </el-button>
                        <!-- 云化信息反馈弹窗 未上传 -->
                        <BOperationCommit v-if="BOperationCommitShow" :BOperationCommitItem="BOperationCommitItem" @commit-boperation="commitBOperation" @close-dialog="closeDialog"></BOperationCommit>
                        <!-- 云化信息反馈弹窗 已上传 -->
                        <BOperationUpdate v-if="BOperationUpdateShow" :BOperationUpdateItem="BOperationUpdateItem" :BManageInfoItem="BManageInfoItem" @commit-bocheck="checkBOperation" @close-updialog="closeUpDialog" @commit-boupdate="commitUpdate"></BOperationUpdate>
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
import InputSelect from '../Input/InputSelect.vue';
import Page from '../Page/Page.vue';
import BCheckOperation from '../../pages/BackOfficeSystem/views/Dialog/BCheckOperation.vue';
import BOperationCommit from '../../pages/BackOfficeSystem/views/Dialog/BOperationCommit.vue';
import BOperationUpdate from '../../pages/BackOfficeSystem/views/Dialog/BOperationUpdate.vue';
import { MessageInterface } from '../../js/ELE_Message/message.js';
import { dateChange, operationStatusChange } from '../../utils/common.js';
export default {
    name: 'saas_b_operation',
    data () {
        return {
            currentPage: 1, //当前初始化页
            pageCount: 10, //每页条数
            tableData: [],
            BCheckOperationShow: false,
            BOperationCommitShow: false,
            BCheckOperationItem: {},
            BOperationCommitItem: {},
            BOperationUpdateShow: false,
            BOperationUpdateItem: {},
            BManageInfoItem: {},
            inpItem: {
                placeholder: '请输入',
                size: 'medium',
                slot: 'append',
                icon: 'el-icon-search',
                prepend: 'prepend',
                width: '110px',
                selectOption: [
                    {
                        label: 'CP',
                        value: '1'
                    },
                    {
                        label: '游戏名称',
                        value: '2'
                    }
                ]
            },
            cpName: '',
            gameName: ''
        }
    },
    components: { Page, BCheckOperation, BOperationCommit, BOperationUpdate, InputSelect },
    methods: {
        //分页改动时触发
        async getPage (data) {
            this.currentPage = data;
            //获取列表接口
            let params = { pageNo: this.currentPage, pageSize: this.pageCount, cpName: this.cpName, gameName: this.gameName };
            let BManagePageRes = await this.$api.BManagePagesInterface(params);
            if (BManagePageRes.code === 0) {
                //列表赋值
                this.tableData = [...BManagePageRes.data.rows];
                //总条数
                this.tableData.length = BManagePageRes.data.totalRows;
            } else {
                MessageInterface(`${BManagePageRes.msg}`, 'error', 5000);
            };
        },
        //计划详情
        check (index, row) {
            this.BCheckOperationShow = true;
            this.BCheckOperationItem = {...row};
        },
        //关闭计划详情
        cancel () {
            this.BCheckOperationShow = false;
        },
        //云信息反馈发开
        async download (index, row) {
            if (row.approveStatus === 5) {
                this.BOperationCommitShow = true;
                this.BOperationCommitItem = {...row};
            } else if (row.approveStatus === 6) {
                this.BOperationUpdateItem = {...row};
                //获取修改详情接口
                let BManageInfoRes = await this.$api.BManageInfoInterface({planId: row.planId});
                if (BManageInfoRes.code === 0) {
                    this.BManageInfoItem = {...BManageInfoRes.data};
                    this.BOperationUpdateShow = true;
                };
            };
        },
        //上传云化信息
        async commitBOperation (data) {
            //获取审核接口
            let BManageAuditRes = await this.$api.BManageAuditInterface(data);
            if (BManageAuditRes.code === 0) {
                MessageInterface('提交成功', 'success', 5000);
                //获取列表接口
                let params = { pageNo: this.currentPage, pageSize: this.pageCount, cpName: this.cpName, gameName: this.gameName };
                let BManagePageRes = await this.$api.BManagePagesInterface(params);
                // console.log(BManagePageRes);
                if (BManagePageRes.code === 0) {
                    //列表赋值
                    this.tableData = [...BManagePageRes.data.rows];
                    //总条数
                    this.tableData.length = BManagePageRes.data.totalRows;
                } else {
                    MessageInterface(`${BManagePageRes.msg}`, 'error', 5000);
                };
                this.BOperationCommitShow = false;
            } else {
                MessageInterface(`${BManageAuditRes.msg}`, 'error', 5000);
            };
        },
        //上传云化信息
        async checkBOperation (data) {
            let BManageUpdateRes = await this.$api.BManageUpdateInterface(data);
            if (BManageUpdateRes.code === 0) {
                MessageInterface('提交成功', 'success', 5000);
                //获取列表接口
                let params = { pageNo: this.currentPage, pageSize: this.pageCount, cpName: this.cpName, gameName: this.gameName };
                let BManagePageRes = await this.$api.BManagePagesInterface(params);
                // console.log(BManagePageRes);
                if (BManagePageRes.code === 0) {
                    //列表赋值
                    this.tableData = [...BManagePageRes.data.rows];
                    //总条数
                    this.tableData.length = BManagePageRes.data.totalRows;
                } else {
                    MessageInterface(`${BManagePageRes.msg}`, 'error', 5000);
                };
                this.BOperationUpdateShow = false;
            } else {
                MessageInterface(`${BManageUpdateRes.msg}`, 'error', 5000);
            };
        },
        //上传云化信息
        async commitUpdate (data) {
            let BManageUpdateRes = await this.$api.BManageUpdateInterface(data);
            if (BManageUpdateRes.code === 0) {
                MessageInterface('提交成功', 'success', 5000);
                //获取列表接口
                let params = { pageNo: this.currentPage, pageSize: this.pageCount, cpName: this.cpName, gameName: this.gameName };
                let BManagePageRes = await this.$api.BManagePagesInterface(params);
                // console.log(BManagePageRes);
                if (BManagePageRes.code === 0) {
                    //列表赋值
                    this.tableData = [...BManagePageRes.data.rows];
                    //总条数
                    this.tableData.length = BManagePageRes.data.totalRows;
                } else {
                    MessageInterface(`${BManagePageRes.msg}`, 'error', 5000);
                };
                this.BOperationUpdateShow = false;
            } else {
                MessageInterface(`${BManageUpdateRes.msg}`, 'error', 5000);
            };
        },
        //关闭云信息
        closeDialog () {
            this.BOperationCommitShow = false;
        },
        //关闭云信息
        closeUpDialog () {
            this.BOperationUpdateShow = false;
        },
        //审核时间转换
        businessTime (row, column) {
            let dateRes = dateChange(row, column);
            return dateRes;
        },
        //审核状态转换
        operationStatus (approveStatus) {
            let operationStatusRes = operationStatusChange(approveStatus);
            return operationStatusRes;
        },
        //查询cp/game名称
        async inpSearch (cpName, gameName) {
            this.currentPage = 1;
            //设置请求参数
            let data = {
                cpName,
                gameName
            };
            //判断cpName
            if (cpName !== undefined) {
                delete data.gameName;
            } else if (cpName === undefined) {
                delete data.cpName;
            };
            this.cpName = data.cpName;
            this.gameName = data.gameName;
            // console.log(data);
            //获取列表接口
            let BManagePageRes = await this.$api.BManagePagesInterface(data);
            if (BManagePageRes.code === 0) {
                //列表赋值
                this.tableData = [...BManagePageRes.data.rows];
                //总条数
                this.tableData.length = BManagePageRes.data.totalRows;
            } else {
                MessageInterface(`${BManagePageRes.msg}`, 'error', 5000);
            };
        }
    },
    async mounted () {
        //获取列表接口
        let params = { pageNo: this.currentPage, pageSize: this.pageCount };
        let BManagePageRes = await this.$api.BManagePagesInterface(params);
        if (BManagePageRes.code === 0) {
            //列表赋值
            this.tableData = [...BManagePageRes.data.rows];
            //总条数
            this.tableData.length = BManagePageRes.data.totalRows;
        } else {
            MessageInterface(`${BManagePageRes.msg}`, 'error', 5000);
        };
    }
}
</script>

<style lang="scss" scoped>
.saas_b_operation {
    .saas_b_operation_search {
        margin: 1% 0 3% 0;
    };
    .page {
        margin: 20% 0 10% 0;
    };
};

//解决el-table窗口抖动问题
.el-table{
  width:99.9% !important;
};
</style>

<style>
</style>
