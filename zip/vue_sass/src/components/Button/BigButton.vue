<template>
    <div class="big_btn">
        <!-- 封装登录、注册按钮 -->
        <el-button :class="{bigBtn: booleanEntryBtn, BigBtn: booleanBigBtn, AuditBtn: booleanAuditBtn, UpdateBtn: booleanUpdateBtn}" @click="btnClick(btnItem.Text)">{{btnItem.Text}}</el-button>
    </div>
</template>

<script>
export default {
    name: 'big_btn',
    props: {
        btnItem: {
            default: Object
        }
    },
    data () {
        return {
            booleanEntryBtn: false,
            booleanBigBtn: false,
            booleanAuditBtn: false,
            booleanUpdateBtn: false,
        }
    },
    methods: {
        //btn向父组件传值
        btnClick (data) {
            this.$emit('click-btn', data);
        }
    },
    mounted () {
        //动态添加按钮样式
        if (this.btnItem.Text === '等待开放') {
            this.booleanBigBtn = true;
        } else if (this.btnItem.Text === '审核中') {
            this.booleanAuditBtn = true;
        } else if (this.btnItem.Text === '请修改信息') {
            this.booleanUpdateBtn = true;
        } else if (this.btnItem.Text === '立即入驻' || this.btnItem.Text === '登录'
            || this.btnItem.Text === '立即注册' || this.btnItem.Text === '重置密码'
        ) {
            this.booleanEntryBtn = true;
        };
    }
}
</script>

<style lang="scss" scoped>
@import '../../scss/base.scss';
.bigBtn {
    width: $width;
    background-color: $mainColor;
    color: $baseColor;
    border-color: $mainColor;
    font-weight: 500;
};

.AuditBtn {
    width: $width;
    background-color: #0076F4;
    color: $baseColor;
    border-color: #0076F4;
    font-weight: 500;
};

.UpdateBtn {
    width: $width;
    background-color: #E93C2F;
    color: $baseColor;
    border-color: #E93C2F;
    font-weight: 500;
};

.BigBtn {
    width: $width;
    background-color: #ccc;
    border-color: #ccc;
    color: $baseColor;
    font-weight: 500;
};
</style>
