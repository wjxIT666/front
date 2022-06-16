<template>
    <div class="index12">
        <button @click="login">登录</button>
    </div>
</template>

<script>
export default {
    name: 'index12',
    methods: {
        login () {
            let token = '000000';
            this.$store.commit('setToken', token);
        }
    }
}
</script>

<style lang="scss" scoped>

</style>
