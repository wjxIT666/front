<template>
    <div class="index">
        <!-- 主页 -->
        <el-container>
            <!-- 头部 -->
            <el-header height="56px">
                <el-row type="flex" justify="end">
                    <el-col :span="4">
                        <el-popover
                            placement="top"
                            trigger="hover"
                        >
                            <div style="text-align: center; font-size: 12px;">
                                <div>
                                    <!-- 退出系统 -->
                                    <i class="al-tuichu"></i>
                                    <span style="margin-left: 15px; cursor: pointer; vertical-align: top;" @click="exit">退出系统</span>
                                </div>
                            </div>
                            <div slot="reference" style="text-align: center;">                             
                                <span>{{userName}}</span>
                            </div>
                        </el-popover>
                    </el-col>
                </el-row>
            </el-header>
        </el-container>
        <!-- 内容 -->
        <div>
            <el-row>
                <el-col :span="4">
                    <!-- 左侧边栏 -->
                    <Aside :elMenu="elMenu"></Aside>
                </el-col>
                <el-col :span="20">
                    <router-view></router-view>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
import Aside from '../../../../components/Aside/BAside.vue';
import { MessageInterface } from '../../../../js/ELE_Message/message.js';
export default {
    name: 'index',
    data () {
        return {
            elMenu: {
                defaultActive: '',
                class: 'elMenuStyle',
                bgColor: '#fff',
                textColor: '#333',
                activeTextColor: '#154898',
                router: true,
                listArray: [
                    {
                        index: '1',
                        solt: 'title',
                        icon: 'al-icon-project',
                        titleText: '项目管理',
                        itemArray: [
                            {
                                index: '/index/asideOperation',
                                icon: 'al-yunying',
                                text: '云化计划管理'
                            },
                            {
                                index: '/index/asideCP',
                                icon: 'al-youxi',
                                text: 'CP云游戏管理'
                            }
                        ]
                    },
                    // {
                    //     index: '',
                    //     solt: '',
                    //     icon: '',
                    //     titleText: '',
                    //     itemArray: [
                            
                    //     ]
                    // }
                ]
            },
            userName: ''
        }
    },
    components: { Aside },
    methods: {
        //退出登录
        async exit () {
            //调用退出登录的接口
            await this.$api.BUserExitInterface();
            //清空token
            sessionStorage.removeItem('token');
            //回到登录页
            this.$router.push({ path: '/login' });
        }
    },
    async created () {
        //获取用户登录信息
        let BUserStatusRes = await this.$api.BUserStatusInterface();
        if (BUserStatusRes.code === 0) {
            this.userName = BUserStatusRes.data.username;
            //权限配置
            let powerConfig = BUserStatusRes.data.roles.map( item => item.code );
            // console.log(powerConfig);
            //数组转字符串
            let powerStr = powerConfig.join('');
            // console.log(powerStr);
            //添加企业管理
            let itemCompany = {
                index: '3',
                solt: 'title',
                icon: 'al-qiyeguanli',
                titleText: '企业管理',
                itemArray: [
                    {
                        index: '/index/asideCompany',
                        icon: 'al-xinxi',
                        text: '企业信息'
                    }
                ]
            };
            //添加用户管理
            let itemUser = {
                index: '4',
                solt: 'title',
                icon: 'al-yonghuguanli',
                titleText: '用户管理',
                itemArray: [
                    {
                        index: '/index/asideUser',
                        icon: 'al-yonghu-fuben',
                        text: '用户列表'
                    },
                    {
                        index: '/index/asidePower',
                        icon: 'al-authority',
                        text: '角色权限配置'
                    }
                ]
            };
            //商务表
            let itemBusiness = {
                index: '/index/asideBusiness',
                icon: 'al-10',
                text: '云化计划进度'
            };
            if (powerStr.indexOf('admin') > -1) {
                //增加数组列表--增
                this.elMenu.listArray.splice(0, 0, itemCompany);
                this.elMenu.listArray.splice(this.elMenu.listArray.length, 0, itemUser);
                //可以查看商务表--增
                this.elMenu.listArray[1].itemArray.splice(0, 0, itemBusiness);
            } else {
                if (powerStr.indexOf('businessoperation') > -1) {
                    //增加数组列表--增
                    this.elMenu.listArray.splice(0, 0, itemCompany);
                    //可以查看商务表--增
                    this.elMenu.listArray[1].itemArray.splice(0, 0, itemBusiness);
                } else {
                    if (powerStr.indexOf('business') > -1) {
                        //增加数组列表--增
                        this.elMenu.listArray.splice(0, 0, itemCompany);
                        //可以查看商务表--增
                        this.elMenu.listArray[1].itemArray.splice(0, 0, itemBusiness);
                        //不可以看运营表--删
                        this.elMenu.listArray[1].itemArray.splice(1, 1);
                    } else if (powerStr.indexOf('operation') > -1) {
                        
                    };
                }
            };
        } else {
            MessageInterface(`${BUserStatusRes.msg}`, 'error', 5000);
        };
    },
    watch: {
        $route: {
            deep: true,
            immediate: true,
            handler: function (newVal) {
                // console.log('监听路由');
                // console.log(newVal);
                this.elMenu.defaultActive = newVal.path;
                // console.log(this.elMenu.defaultActive);
            }
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../../../../scss/base.scss';
.el-header {
    background-color: $mainColor;
    color: $baseColor;
    line-height: 56px;
    font-size: $fontSizeBase;
}
</style>
