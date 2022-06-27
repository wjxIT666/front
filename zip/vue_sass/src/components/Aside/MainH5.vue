<template>
    <div class="aside_mainH5">
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
                desc: '云化服务问题'
            },
            AnswerItem: {
                title: '云化服务问题',
                question: [
                    {
                        id: '1',
                        name: '如何获取云游戏产品资源？',
                        content: '进入开放平台>>注册开放平台账号>>选择游戏服务“游戏云化”>>选择“云游戏产品资源” >>创建需要云化的游戏>> 创建计划>>提交游戏相关信息>>提交>>提交审核（审核时间：预计 3个工作日） >> 获取云游戏产品资源（云游戏URL/云微端apk包）。'
                    },
                    {
                        id: '2',
                        name: '创建计划是什么意思？',
                        content: '',
                        list: [
                            {
                                id: '1）',
                                content: '创建计划是创建游戏的下属层级，即同一个游戏名下，可创建多个计划。'
                            },
                            {
                                id: '2）',
                                content: '主要应用场景如下：',
                                list: [
                                    {
                                        id: '1',
                                        flag: '•',
                                        content: '由于各种原因，已经云化的apk包有变更时（游戏有版本更新、替换渠道包），需要及提交新版本的apk包，重新云化才能正常使用；'
                                    },
                                    {
                                        id: '2',
                                        flag: '•',
                                        content: '云游戏内导下载模块，需要更换导下载地址，需重新提交计划。'
                                    }
                                ]
                            },
                        ]
                    },
                    {
                        id: '3',
                        name: '快盘云游戏是否支持游戏内的充值？',
                        content: '',
                        list: [
                            {
                                id: '',
                                content: '支持，快盘提供2种支付方案：支付宝网页版支付、本地支付宝app和微信app支付；',
                                list: [
                                    {
                                        id: '1',
                                        flag: '•',
                                        content: '支付宝网页支付：云游戏内使用支付宝网页版支付，需要手动输入支付宝账号及密码；不支持微信支付。'
                                    },
                                    {
                                        id: '2',
                                        flag: '•',
                                        content: '本地支付宝app或微信app支付：拉起用户本机安装的支付宝app或微信app完成支付，提升支付体验。（本方案需要在游戏内植入快盘云通信插件，云通信插件详见“名词字典”）'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        id: '4',
                        name: '云游戏URL内的倒计时作用是什么？',
                        content: '云游戏URL形态的产品，主要应用于买量场景 ，主打试玩，因此限制设置试玩时长，试玩倒计时结束后，会自动提示下载游戏继续完，实现转化。'
                    },
                    {
                        id: '5',
                        name: '我的云游戏产品怎么没有导下载？',
                        content: '创建计划时未填写“云游戏内导下载地址（安卓端）”和“云游戏内导下载地址（IOS端）”，因此没有导下载模块。如需要，请重新提交计划，填写“导下载地址（安卓端）”和“导下载地址（IOS端）”'
                    },
                    {
                        id: '6',
                        name: '为什么查不到数据？',
                        content: '快盘数据查询服务目前仅支持正式合作伙伴。'
                    },
                ]
            }
        }
    },
    components: { Crumbs, AnswerText }
}
</script>

<style lang="scss" scoped>
@import '../../scss/base.scss';
.aside_mainH5 {
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
