<template>
    <div class="saas_c_table">
        <!-- 新增游戏 -->
        <el-row type="flex" justify="end">
            <el-col :span="3">
                <IconButton :btnItem="btnItem" @icon-btn="addIconGame"></IconButton>
                <!-- 新增游戏 -->
                <GameAdd v-if="GameAddIconShow" @down-game="downIconGame" @close-game="closeIconGame"></GameAdd>
            </el-col>
        </el-row>
        <!-- 表格 -->
        <div v-if="tableData.length === 0 && showFlag === 1">
            <el-table
                :data="tableData.slice((currentPage - 1) * pageCount, currentPage * pageCount)"
                stripe
                size="small"
                :header-cell-style="{background:'#EEEEEE', color:'#333', 'text-align':'center'}"
                :cell-style="{'text-align':'center'}"
                empty-text="您还没有创建游戏，赶紧去创建吧"
                >
                <el-table-column
                    label="游戏ID"
                >
                </el-table-column>
                <el-table-column
                    label="游戏名称"
                >
                </el-table-column>
                <el-table-column
                    label="状态"
                >
                </el-table-column>
                <el-table-column
                    label="操作"
                >
                </el-table-column>
            </el-table>
            <!-- 新增游戏按钮 -->
            <el-row type="flex" justify="center">
                <el-col :span="4">
                    <div class="icon_btn">
                        <IconButton :btnItem="btnItem" @icon-btn="addGame"></IconButton>
                        <!-- 新增游戏 -->
                        <GameAdd v-if="GameAddShow" @down-game="downGame" @close-game="closeGame"></GameAdd>
                    </div>
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
            <el-table-column type="expand">
                <template slot-scope="props">
                    <el-table
                        :data="props.row.gamePlans"
                        :header-cell-style="{'text-align':'center'}"
                        :cell-style="{'text-align':'center'}"
                        border
                        size="small"
                        empty-text="未计划记录，请先创建计划"
                        >
                        <!-- 计划ID -->
                        <el-table-column
                            label="计划ID"
                            prop="id"
                            >
                        </el-table-column>
                        <!-- 云游戏产品形态 -->
                        <el-table-column
                            label="云游戏产品形态"
                            >
                            <template slot-scope="sco">
                                <span>{{sco.row.planTypes | planTypesFilter}}</span>
                            </template>
                        </el-table-column>
                        <!-- 状态 -->
                        <el-table-column
                            label="状态"
                            >
                            <template slot-scope="sco">
                                <span>{{sco.row.planStatus | planStatusFilter}}</span>
                            </template>
                        </el-table-column>
                        <!-- H5云试玩资源 -->
                        <el-table-column
                            label="云游戏URL"
                            >
                            <template slot-scope="scope">
                                <el-button
                                    type="text"
                                    :disabled="((scope.row.planTypes.join('') != '1' && scope.row.planTypes.join('') != '12' && scope.row.planTypes.join('') != '21') || scope.row.planStatus != 8)"
                                    size="mini"
                                    @click="copyURL(scope.$index, scope.row)">复制URL
                                </el-button>
                            </template>
                        </el-table-column>
                        <!-- 微端资源 -->
                        <el-table-column
                            label="云微端"
                            >
                            <template slot-scope="scope">
                                <el-button
                                    type="text"
                                    :disabled="((scope.row.planTypes.join('') != '2' && scope.row.planTypes.join('') != '12' && scope.row.planTypes.join('') != '21') || scope.row.planStatus != 8)"
                                    size="mini"
                                    @click="download(scope.$index, scope.row)">下载
                                </el-button>
                            </template>
                        </el-table-column>
                        <!-- 操作 -->
                        <el-table-column
                            label="操作"
                            >
                            <template slot-scope="scope">
                                <el-button
                                    size="mini"
                                    icon="al-chakan"
                                    style="background-color: #D6EAFF; border-color: #D6EAFF; color: #007BFF;"
                                    @click="selectPlan(scope.$index, scope.row)">查看计划
                                </el-button>
                                <!-- 查看计划弹窗 -->
                                <ViewPlanAdd v-if="ViewPlanAddShow" :formItemView="formItemView" @update-viewPlan="updateViewPlan" @close-viewPlan="closeViewPlan"></ViewPlanAdd>
                            </template>
                        </el-table-column>
                    </el-table>
                </template>
            </el-table-column>
            <el-table-column
                label="游戏ID"
                prop="id">
            </el-table-column>
            <el-table-column
                label="游戏名称"
                prop="gameName">
            </el-table-column>
            <el-table-column
                label="状态"
                prop="gameStatus">
            </el-table-column>
            <el-table-column
                label="操作"
                >
                <template slot-scope="scope">
                    <el-button
                        size="mini"
                        icon="el-icon-circle-plus-outline"
                        style="background-color: #007BFF; border-color: #007BFF; color: #fff;"
                        @click="addPlan(scope.$index, scope.row)">创建计划
                    </el-button>
                    <!-- 创建计划弹窗 -->
                    <PlanAdd v-if="PlanAddShow" :formItem="formItem" @down-plan="downPlan" @close-plan="closePlan"></PlanAdd>
                    <PlanAddCommit v-if="PlanAddCommitShow" :dialogItem="dialogItem" @close-dialog="closeDialog"></PlanAddCommit>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-row type="flex" justify="center">
            <el-col :span="8">
                <div v-if="tableData.length !== 0" class="page">
                    <Page :totalLength="tableData.length" :pageSize="pageCount" :currentPage="currentPage" @current-page="getPage"></Page>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import IconButton from '../Button/IconButton.vue';
import Page from '../Page/Page.vue';
import PlanAdd from '../../pages/FrontOfficeSystem/views/Dialog/PlanAdd.vue';
import ViewPlanAdd from '../../pages/FrontOfficeSystem/views/Dialog/ViewPlanAdd.vue';
import GameAdd from '../../pages/FrontOfficeSystem/views/Dialog/GameAdd.vue';
import PlanAddCommit from '../../pages/FrontOfficeSystem/views/Dialog/PlanAddCommit.vue';
import { MessageInterface } from '../../js/ELE_Message/message.js';
import { urlDownload } from '../../utils/common.js';
export default {
    name: 'saas_c_table',
    data () {
        return {
            currentPage: 1, //当前初始化页
            pageCount: 10, //每页条数
            tableData: [
               
            ],
            PlanAddShow: false,
            ViewPlanAddShow: false,
            formItem: {},
            formItemView: {},
            tableDataItem: [
                
            ],
            btnItem: {
                type: '',
                plain: false,
                size: 'medium',
                icon: 'el-icon-circle-plus-outline',
                text: '创建游戏'
            },
            GameAddShow: false,
            GameAddIconShow: false,
            paginationBoxReflow: true,
            Yid: '1232',
            PlanAddCommitShow: false,
            dialogItem: {
                title: '温馨提示',
                center: true,
                width: '40%',
                text: ''
            },
            showFlag: 0
        }
    },
    components: { IconButton, Page, PlanAdd, ViewPlanAdd, GameAdd, PlanAddCommit },
    methods: {
        //创建计划
        addPlan (index, row) {
            //打开创建计划弹窗
            this.PlanAddShow = true;
            //赋值
            this.formItem = {...row};
        },
        //分页改动时触发
        async getPage (data) {
            this.currentPage = data;
            //获取分页列表
            let params = {
                pageNo: this.currentPage,
                pageSize: this.pageCount
            };
            let pageRes = await this.$api.pageInterface(params);
            if (pageRes.code === 0) {
                //给列表赋值
                this.tableData = JSON.parse(JSON.stringify(pageRes.data.rows));
                //状态转换
                this.tableData.forEach( item => {
                    if (item.gameStatus == '2') {
                        item.gameStatus = '已计划';
                    } else if (item.gameStatus == '1') {
                        item.gameStatus = '未计划';
                    };
                } );
                this.tableData.length = pageRes.data.totalRows;
            } else {
                MessageInterface(`${pageRes.msg}`, 'error', 5000);
            };
        },
        //关闭创建计划弹窗
        async downPlan (data, id) {
            // console.log(id);
            let addPlanRes = await this.$api.addPlanInterface(data);
            if (addPlanRes.code === 0) {
                MessageInterface(`创建计划成功`, 'success', 5000);
                //获取分页列表
                let params = {
                    pageNo: this.currentPage,
                    pageSize: this.pageCount
                };
                let pageRes = await this.$api.pageInterface(params);
                if (pageRes.code === 0) {
                    //给列表赋值
                    this.tableData = [...pageRes.data.rows];
                    this.tableData.forEach( item => {
                        //状态转换
                        if (item.gameStatus == '2') {
                            item.gameStatus = '已计划';
                        } else if (item.gameStatus == '1') {
                            item.gameStatus = '未计划';
                        };
                        //云计划id
                        // console.log(item);
                        let idArr = [];
                        if (item.id == id) {
                            // console.log(item.gamePlans);
                            idArr = item.gamePlans.map( item => item.id );
                            this.Yid = idArr[0];
                            // console.log('???'+this.Yid);
                            this.dialogItem.text = `您的云计划${this.Yid}已提交，快盘将在1-3个工作日内审核完毕。`;
                        };
                    } );
                    //总条数
                    this.tableData.length = pageRes.data.totalRows;
                    this.PlanAddCommitShow = true;
                } else {
                    MessageInterface(`${pageRes.msg}`, 'error', 5000);
                };
                // this.PlanAddShow = false;
            } else {
                MessageInterface(`${addPlanRes.msg}`, 'error', 5000);
            };
        },
        //关闭创建计划弹窗
        closePlan () {
            this.PlanAddShow = false;
        },
        closeDialog () {
            this.PlanAddCommitShow = false;
            this.PlanAddShow = false;
        },
        //复制URL
        copyURL (index, row) {
            let url = row.cloudUrl;
            if (url === '') {
                return false;
            };
            let oInput = document.createElement('input');
            oInput.value = url;
            document.body.appendChild(oInput);
            oInput.select(); // 选择对象;
            document.execCommand("Copy"); // 执行浏览器复制命令
            this.$message({
                message: '复制成功',
                type: 'success',
                duration: 5000
            });
            oInput.remove();
        },
        //下载
        download (index, row) {
            urlDownload(row.cloudPkgUrl);
        },
        //查看计划
        selectPlan (index, row) {
            this.ViewPlanAddShow = true;
            this.formItemView = {...row};
        },
        //关闭查看计划
        updateViewPlan () {
            this.ViewPlanAddShow = false;
        },
        //关闭查看计划
        closeViewPlan () {
            this.ViewPlanAddShow = false;
        },
        //打开新增游戏
        addGame () {
            this.GameAddShow = true;
        },
        //关闭新增游戏弹窗
        async downGame (data) {
            //请求增加游戏接口
            let addGameRes = await this.$api.addGameInterface(data);
            if (addGameRes.code === 0) {
                MessageInterface(`创建游戏成功`, 'success', 5000);
                //获取分页列表
                let params = {
                    pageNo: this.currentPage,
                    pageSize: this.pageCount
                };
                let pageRes = await this.$api.pageInterface(params);
                if (pageRes.code === 0) {
                    //给列表赋值
                    this.tableData = [...pageRes.data.rows];
                    this.tableData.forEach( item => {
                        //状态转换
                        if (item.gameStatus == '2') {
                            item.gameStatus = '已计划';
                        } else if (item.gameStatus == '1') {
                            item.gameStatus = '未计划';
                        };
                    } );
                    //总条数
                    this.tableData.length = pageRes.data.totalRows;
                } else {
                    MessageInterface(`${pageRes.msg}`, 'error', 5000);
                };
                this.GameAddShow = false;
            } else {
                MessageInterface(`${addGameRes.msg}`, 'error', 5000);
            }
        },
        //关闭新增游戏弹窗
        closeGame () {
            this.GameAddShow = false;
        },
        addIconGame () {
            this.GameAddIconShow = true;
        },
        //关闭新增游戏弹窗
        async downIconGame (data) {
            //请求增加游戏接口
            let addGameRes = await this.$api.addGameInterface(data);
            if (addGameRes.code === 0) {
                MessageInterface(`创建游戏成功`, 'success', 5000);
                //获取分页列表
                let params = {
                    pageNo: this.currentPage,
                    pageSize: this.pageCount
                };
                let pageRes = await this.$api.pageInterface(params);
                if (pageRes.code === 0) {
                    //给列表赋值
                    this.tableData = [...pageRes.data.rows];
                    this.tableData.forEach( item => {
                        //状态转换
                        if (item.gameStatus == '2') {
                            item.gameStatus = '已计划';
                        } else if (item.gameStatus == '1') {
                            item.gameStatus = '未计划';
                        };
                    } );
                    //总条数
                    this.tableData.length = pageRes.data.totalRows;
                } else {
                    MessageInterface(`${pageRes.msg}`, 'error', 5000);
                };
                this.GameAddIconShow = false;
            } else {
                MessageInterface(`${addGameRes.msg}`, 'error', 5000);
            }
        },
        //关闭新增游戏弹窗
        closeIconGame () {
            this.GameAddIconShow = false;
        }
    },
    async mounted () {
        //获取分页列表
        let params = {
            pageNo: this.currentPage,
            pageSize: this.pageCount
        };
        let pageRes = await this.$api.pageInterface(params);
        if (pageRes.code === 0) {
            //给列表赋值
            this.tableData = [...pageRes.data.rows];
            this.tableData.forEach( item => {
                //状态转换
                if (item.gameStatus == '2') {
                    item.gameStatus = '已计划';
                } else if (item.gameStatus == '1') {
                    item.gameStatus = '未计划';
                };
            } );
            //总条数
            this.tableData.length = pageRes.data.totalRows;
            //判断无数据时，显示
            if (this.tableData.length == 0) {   
                this.showFlag = 1;
            };
        } else {
            MessageInterface(`${pageRes.msg}`, 'error', 5000);
        };
    },
    filters: {
        //云游戏产品形态过滤
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
        },
        //状态过滤
        planStatusFilter (data) {
            let planStatus = '';
            switch (data) {
                case 1:
                    planStatus = '审核中';
                    break;
                case 4:
                    planStatus = '未通过';
                    break;
                case 8:
                    planStatus = '在线';
                    break;
                case 9:
                    planStatus = '下线';
                    break;
            };
            return planStatus;
        }
    }
}
</script>

<style lang="scss" scoped>
.saas_c_table {
    margin: 0 0 3% 0;
    .page {
        margin: 20% 0 10% 0;
    };
};

.icon_btn {
    margin: 5% 0 12% 0; 
};

.el-button /deep/ span {
    margin-left: 5px;
};

//解决el-table窗口抖动问题
.el-table{
  width:99.9% !important;
}
</style>

<style>
.el-table__expand-icon > .el-icon {
    font-weight: 700;
};
</style>
