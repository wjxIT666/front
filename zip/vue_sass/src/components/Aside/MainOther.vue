<template>
    <div class="aside_mainOther">
        <!-- 右侧内容 -->
        <!-- 面包屑 -->
        <div class="crumbs">
            <Crumbs :CrumbsItem="CrumbsItem"></Crumbs>
        </div>
        <!-- 内容 -->
        <div class="main">
            <AnswerText :AnswerItem="AnswerItem"></AnswerText>
        </div>
    </div>
</template>

<script>
import Crumbs from '../Crumbs/Crumbs.vue';
import AnswerText from '../Text/AnswerText.vue';
export default {
    name: 'aside_main',
    data () {
        return {
            CrumbsItem: {
                title: '常见问题',
                desc: '名词字典'
            },
            AnswerItem: {
                title: '名词字典',
                question: [
                    {
                        id: '1',
                        name: '游戏云化',
                        content: '快盘通过技术手段把游戏apk包部署在服务器上，使得用户无需下载游戏原生的apk包就能直接体验游戏，主要载体为云微端及云游戏URL。'
                    },
                    {
                        id: '2',
                        name: '云游戏URL',
                        content: '快盘云游戏产品形态之一，可适用于任何支持webview场景。云游戏URL可降低无效转化，获取更精准的用户。适用场景如下：',
                        list: [
                            {
                                id: '1）',
                                content: '投放买量场景进行拉新，如抖音、b站信息流、百度信息流、百度品专、短信push、app push等；'
                            },
                            {
                                id: '2）',
                                content: '私域流量场景进行拉新、召回，如微信群、QQ群等；'
                            },
                            {
                                id: '3）',
                                content: '仅单端（安卓端）上线的游戏，可通过云游戏URL实现IOS端快速上线。'
                            }
                        ]
                    },
                    {
                        id: '3',
                        name: '云微端',
                        content: '',
                        list: [
                            {
                                id: '1）',
                                content: '快盘云微端提供一种全新的拉新方式，用户无需下载较大的游戏安装包，省略繁琐的资源下载加载流程，提高注册率及创角率。'
                            },
                            {
                                id: '2）',
                                content: '云微端目前仅支持安卓系统，安装包大小在1M左右，实现快速下载快速安装。'
                            }
                        ]
                    },
                    {
                        id: '4',
                        name: '导下载',
                        content: '云游戏产品内设计了导下载的逻辑，具体如下：',
                        images: [
                            {
                                id: '1',
                                url: require('../../images/answer_pic1.jpg')
                            },
                            {
                                id: '2',
                                url: require('../../images/answer_pic2.jpg')
                            },
                            {
                                id: '3',
                                url: require('../../images/answer_pic3.jpg')
                            },
                            {
                                id: '4',
                                url: require('../../images/answer_pic4.jpg')
                            }
                        ]
                    },
                    {
                        id: '5',
                        name: '试玩包',
                        content: '游戏的安卓端安装包（apk文件），用于快盘云化部署，建议提供有游客账号或无账号无实名认证的定制包，方便用户快速进入游戏，体验游戏的趣味性，从而提高转化。'
                    },
                    {
                        id: '6',
                        name: '云通信插件',
                        content: [
                            {
                                id: '1',
                                content: '主要用途：真机本地与云手机之间的信息传输桥梁。'
                            },
                            {
                                id: '2',
                                content: '主要搭载能力：本地支付、授权登录。'
                            }
                        ]
                    },
                    {
                        id: '7',
                        name: '本地支付',
                        content: `云游戏可调起用户真机上支付宝app或微信app完成支付模块。`
                    }
                ]
            }
        }
    },
    components: { Crumbs, AnswerText }
}
</script>

<style lang="scss" scoped>
@import '../../scss/base.scss';
.aside_mainOther {
    margin-left: 2%;
    .crumbs {
        @include elCurmbs ();
    };
    .main {
        padding: 2%;
        width: $_90width;
        background-color: $baseColor;
    };
}
</style>
