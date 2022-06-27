<template>
    <div class="code_btn">
        <!-- 封装通用的短信发送 -->
        <el-button style="font-size: 12px;" :disabled="disabled" @click="sendCode()">
            <span v-if="show">获取验证码</span>
            <span v-else>重新获取({{count}})s</span>
        </el-button>
    </div>
</template>

<script>
export default {
    name: 'code_btn',
    data () {
        return {
            show: true,
            count: '',
            timer: null,
            disabled: false
        }
    },
    methods: {
        // 子组件发送短信验证码
        sendCode () {
            const TIME_COUNT = 60; //更改倒计时时间
            if (!this.timer) {
                this.count = TIME_COUNT;
                this.show = false;
                this.disabled = true;
                this.timer = setInterval(() => {
                    if (this.count > 0 && this.count <= TIME_COUNT) {
                        this.count--;
                    } else {
                        this.show = true;
                        this.disabled = false;
                        clearInterval(this.timer); // 清除定时器
                        this.timer = null;
                        this.$emit('transfer-code');
                    };
                }, 1000);
            };
            this.$emit('send-code');
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../../scss/base.scss';
.el-button.is-disabled, .el-button.is-disabled:focus, .el-button.is-disabled:hover {
    color: #C0C4CC;
    cursor: not-allowed;
    background-image: none;
    background-color: #F5F7FA;
};

.el-button {
    padding: 8px 20px;
};
</style>
