<template>
    <div class="index6">
        <p v-bg="bg">自定义背景</p>
        <button @click="changeBg">更换背景色</button>
    </div>
</template>

<script>
export default {
    name: 'index6',
    data () {
        return {
            bg: 'pink'
        }
    },
    directives: {
        bg: {
            //状态初始化
            inserted (el, bind) {
                el.style.backgroundColor = bind.value;
            },
            //状态更新
            update (el, bind) {
                el.style.backgroundColor = bind.value;
            }
        }
    },
    methods: {
        changeBg () {
            this.bg = 'red';
        }
    }
}
</script>

<style lang="scss" scoped>

</style>
