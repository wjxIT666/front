<template>
    <div class="index">
        <!-- 主页 -->
        <el-container>
            <!-- 头部 -->
            <el-header height="56px">
                <Header :headerItem="indexItem" :showDialog="showDialog"></Header>
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
import Header from '../../../../components/Header/Header.vue';
import Aside from '../../../../components/Aside/Aside.vue';
export default {
    name: 'index',
    data () {
        return {
            indexItem: {
                flag: 'index'
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
                        icon: 'al-ziyuanguanli',
                        titleText: '云游戏产品资源',
                        itemArray: [
                            {
                                index: '/index/asideIndexResource',
                                icon: '',
                                text: '资源管理'
                            }
                        ]
                    },
                    {
                        index: '2',
                        solt: 'title',
                        icon: 'al-digital',
                        titleText: '数据查询',
                        itemArray: [
                            {
                                index: '/index/asideIndexURL',
                                icon: '',
                                text: '云游戏URL'
                            },
                            {
                                index: '/index/asideIndexAndroid',
                                icon: '',
                                text: '云微端'
                            }
                        ]
                    }
                ]
            }
        }
    },
    components: { Header, Aside },
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
