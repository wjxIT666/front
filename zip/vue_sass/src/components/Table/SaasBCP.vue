<template>
    <div class="saas_b_cp">
        <!-- 查询 -->
        <div class="saas_b_cp_search">
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
            @selection-change="handleSelectionChange"
            :header-cell-style="{background:'#EEEEEE', color:'#333', 'text-align':'center'}"
            :cell-style="{'text-align':'center'}"
            >
                <!-- 设置多选 -->
                <!-- <el-table-column
                    type="selection"
                >
                </el-table-column> -->
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
                <!-- 云游戏产品 -->
                <el-table-column
                    prop="plantype"
                    width="150px"
                    label="云游戏产品">
                </el-table-column>
                <!-- 商务审核时间 -->
                <el-table-column
                    prop="confirmTime"
                    width="200px"
                    label="商务审核时间"
                    :formatter="CPTime">
                </el-table-column>
                <!-- 商务 -->
                <el-table-column
                    prop="confirmUser"
                    width="150px"
                    label="商务">
                </el-table-column>
                <!-- 运营执行人 -->
                <el-table-column
                    prop="uploadUser"
                    width="150px"
                    label="运营执行人">
                </el-table-column>
                <!-- 状态 -->
                <el-table-column
                    width="150px"
                    label="状态">
                    <template slot-scope="scope">
                        {{CPstatus(scope.row.approveStatus)}}
                    </template>
                </el-table-column>
                <!-- 云游戏资源 -->
                <el-table-column label="操作" width="240px">
                    <template slot-scope="scope">
                        <el-button
                            size="mini"
                            type="text"
                            @click="download(scope.$index, scope.row)">{{statusText(scope.row.approveStatus)}}
                        </el-button>
                        <el-button
                            size="mini"
                            type="text"
                            :disabled="scope.row.plantype == '云微端' || scope.row.cloudUrl == null"
                            @click="copy(scope.$index, scope.row)">复制URL
                        </el-button>
                        <el-button
                            size="mini"
                            type="text"
                            @click="check(scope.$index, scope.row)">查看详情
                            <BCheckCP v-if="BCheckCPShow" :BCheckCPItem="BCheckCPItem" :BManageInfoItem="BManageInfoItem" @close-bcheckCP="closeBCheckCP"></BCheckCP>
                        </el-button>
                        <el-button
                            size="mini"
                            type="text"
                            :disabled="scope.row.plantype == '云游戏URL' || scope.row.cloudPkgUrl == null"
                            @click="downCloud(scope.$index, scope.row)">下载云微端
                        </el-button>
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
import BCheckCP from '../../pages/BackOfficeSystem/views/Dialog/BCheckCP.vue';
import { MessageInterface } from '../../js/ELE_Message/message.js';
import { dateChange, CPStatusChange, copyURL, urlDownload } from '../../utils/common.js';
export default {
    name: 'saas_b_cp',
    data () {
        return {
            currentPage: 1, //当前初始化页
            pageCount: 10, //每页条数
            tableData: [],
            BCheckCPShow: false,
            BCheckCPItem: {},
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
    components: { Page, BCheckCP, InputSelect },
    methods: {
        //分页改动时触发
        async getPage (data) {
            this.currentPage = data;
            let params = { pageNo: this.currentPage, pageSize: this.pageCount, cpName: this.cpName, gameName: this.gameName };
            let BCPPageRes = await this.$api.BCPPagesInterface(params);
            // console.log(BCPPageRes);
            if (BCPPageRes.code === 0) {
                //列表赋值
                this.tableData = [...BCPPageRes.data.rows];
                //总条数
                this.tableData.length = BCPPageRes.data.totalRows;
            } else {
                MessageInterface(`${BCPPageRes.msg}`, 'error', 5000);
            }
        },
        //URL复制
        copy (index, row) {
            copyURL(row.cloudUrl);
        },
        //下载
        async download (index, row) {
            //设置上下线状态
            let operationStatus;
            if (row.approveStatus == 8) {
                operationStatus = 9;
            } else if (row.approveStatus == 9 || row.approveStatus == 10) {
                operationStatus = 8;
            };
            //调用上下线接口
            let data = {
                approveId: row.approveId,
                operationStatus: operationStatus
            };
            let BCPupRes = await this.$api.BCPupInterface(data);
            if (BCPupRes.code === 0) {
                MessageInterface('操作成功', 'success', 5000);
                let params = { pageNo: this.currentPage, pageSize: this.pageCount, cpName: this.cpName, gameName: this.gameName };
                let BCPPageRes = await this.$api.BCPPagesInterface(params);
                if (BCPPageRes.code === 0) {
                    //列表赋值
                    this.tableData = [...BCPPageRes.data.rows];
                    //总条数
                    this.tableData.length = BCPPageRes.data.totalRows;
                } else {
                    MessageInterface(`${BCPPageRes.msg}`, 'error', 5000);
                };
            } else {
                MessageInterface(`${BCPupRes.msg}`, 'error', 5000);
            };
        },
        //查看详情
        async check (index, row) {
            this.BCheckCPItem = {...row};
            //获取详情列表
            let params = {
                planId: this.BCheckCPItem.planId
            };
            let BManageInfoRes = await this.$api.BManageInfoInterface(params);
            // console.log(BManageInfoRes);
            if (BManageInfoRes.code === 0) {
                this.BManageInfoItem = {...BManageInfoRes.data};
                this.BCheckCPShow = true;
            };
        },
        //关闭查看详情弹窗
        closeBCheckCP (index, row) {
            this.BCheckCPShow = false;
        },
        //下载云微端
        downCloud (index, row) {
            // console.log(row.cloudPkgUrl, '~~~');
            urlDownload(row.cloudPkgUrl);
        },
        //表格多选
        handleSelectionChange(val) {
            // console.log(val);
            this.multipleSelection = val;
        },
        //审核时间转换
        CPTime (row, column) {
            let dateRes = dateChange(row, column);
            return dateRes;
        },
        //状态转换
        CPstatus (CPstatus) {
            let CPStatusRes = CPStatusChange(CPstatus);
            return CPStatusRes;
        },
        //上线/下线转换
        statusText (status) {
            if (status === 8) {
                return '下线';
            } else if (status === 9 || status === 10) {
                return '上线';
            };
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
            let BCPPageRes = await this.$api.BCPPagesInterface(data);
            // console.log(BCPPageRes);
            if (BCPPageRes.code === 0) {
                //列表赋值
                this.tableData = [...BCPPageRes.data.rows];
                //总条数
                this.tableData.length = BCPPageRes.data.totalRows;
            } else {
                MessageInterface(`${BCPPageRes.msg}`, 'error', 5000);
            };
        }
    },
    async mounted () {
        let params = { pageNo: this.currentPage, pageSize: this.pageCount };
        let BCPPageRes = await this.$api.BCPPagesInterface(params);
        // console.log(BCPPageRes);
        if (BCPPageRes.code === 0) {
            //列表赋值
            this.tableData = [...BCPPageRes.data.rows];
            //总条数
            this.tableData.length = BCPPageRes.data.totalRows;
        } else {
            MessageInterface(`${BCPPageRes.msg}`, 'error', 5000);
        }
    }
}
</script>

<style lang="scss" scoped>
.saas_b_cp {
    .saas_b_cp_search {
        margin: 1% 0 3% 0;
    }
    .page {
        margin: 20% 0 10% 0;
    };
};

//解决el-table窗口抖动问题
.el-table{
  width:99.9% !important;
};
</style>
