<template>
    <div class="aside_main">
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
                desc: '账号问题'
            },
            AnswerItem: {
                title: '账号问题',
                question: [
                    {
                        id: '1',
                        name: '注册账号，开启游戏云化服务',
                        content: '注册开放平台账号http://dev.open.kuaipantech.com/#/login。'
                    },
                    {
                        id: '2',
                        name: '申请服务及流程',
                        content: '进入开放平台>>注册开放平台账号>>选择游戏云化服务>>选择入驻类型（企业入驻 / 个人入驻） >> 填写资料 >> 提交审核（审核时间：预计 3个工作日） >> 通过审核后即可进入云游戏推广后台。'
                    },
                    {
                        id: '3',
                        name: '企业开发者',
                        content: '企业信息（单位名称，统一社会信用代码，营业执照）；联系人信息（姓名，邮箱，手机号）。'
                    },
                    {
                        id: '4',
                        name: '提交审核',
                        content: '企业入驻信息申请提交后，预计会在3个工作日内完成信息审核，可登录开放平台查看审核信息。'
                    },
                    {
                        id: '5',
                        name: '管理后台',
                        content: '开放平台账号审核通过后，自动进入云游戏推广后台。'
                    },
                    {
                        id: '6',
                        flag: 'FAQ',
                        name: '如何修改企业入驻信息？',
                        content: '请您先联系快盘商务，并将需要修改的信息发送至快盘商务邮箱 xxxxxxxx@kuaipantech.com，并提供企业营业执照扫描件或其他能证明您是该企业成员的材料。快盘商务预计将在收到邮件后的3个工作日内与您取得联系，请保持联系方式通畅。'
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
.aside_main {
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
