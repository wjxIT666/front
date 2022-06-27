<template>
    <div class="index">
        <!-- 主页 -->
        <el-container>
            <!-- 头部 -->
            <el-header height="56px">
                <Header :headerItem="indexItem" :showDialog="showDialog" :helpCenterFlag="helpCenterFlag" :path="path"></Header>
            </el-header>
        </el-container>
        <!-- 内容 -->
        <div>
            <el-row>
                <el-col :span="4">
                    <!-- 左侧边栏 -->
                    <HAside :elMenu="elMenu"></HAside>
                </el-col>
                <el-col :span="20">
                    <router-view></router-view>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
import Header from '../../../../components/Header/Header.vue';
import HAside from '../../../../components/Aside/HAside.vue';
export default {
    name: 'index',
    data () {
        return {
            indexItem: {
                flag: 'answer'
            },
            showDialog: true,
            elMenu: {
                defaultActive: '',
                router: true,
                class: 'elMenuStyle',
                bgColor: '#fff',
                textColor: '#333',
                activeTextColor: '#154898',
                listArray: [
                    {
                        index: '1',
                        solt: 'title',
                        icon: 'al-changjianwenti-',
                        titleText: '常见问题',
                        itemArray: [
                            {
                                index: '/answer/Acount',
                                icon: '',
                                text: '账号问题'
                            },
                            {
                                index: '/answer/H5',
                                icon: '',
                                text: '云化服务问题'
                            },
                            {
                                index: '/answer/other',
                                icon: '',
                                text: '名词字典'
                            }
                        ]
                    }
                ]
            },
            helpCenterFlag: 'help',
            path: sessionStorage.getItem('pathName')
        }
    },
    components: { Header, HAside },
    methods: {
        
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
    },
    mounted () {
        let token = sessionStorage.getItem('token');
        if (token) {
            this.showDialog = true;
        } else {
            this.showDialog = false;
        };
    },
    beforeRouteEnter (to, from, next) {
        let path = from.path;
        //将数据存储到session中
        sessionStorage.setItem('pathName', path);
        next();
    }
}
</script>

<style lang="scss" scoped>
@import '../../../../scss/header.scss';
@import '../../../../scss/base.scss';
.index {
    min-width: 1200px;
    .el-header {
        @include headerStyle ($mainColor, 56px, $baseColor);
    };

};
</style>
