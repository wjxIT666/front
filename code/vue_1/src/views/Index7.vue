<template>
    <div class="index7">
        <!-- mapState -->
        <div>
            <div>
                姓名：{{name}}
            </div>
            <div>
                数量：{{count}}
            </div>
            <div>
                <button @click="btnClick(10)">添加数量</button>
            </div>
        </div>

        <!-- mapGetters -->
        <div>
            <div>
                Getters：{{msgFun}}
            </div>
        </div>

        <!-- mapActions -->
        <div>
            <div>
                {{duanzi}}
            </div>
            <div>
                <button @click="getDZ">发送段子</button>
                <button @click="getDZ">发送段子</button>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';
export default {
    name: 'index7',
    computed: {
        ...mapState({
            name: 'name',
            count: 'count',
            duanzi: 'duanzi'
        }),
        ...mapGetters({
            msgFun: 'msgFun'
        })
    },
    methods: {
        btnClick (value) {
            this.$store.commit('ADD_COUNT', value);
        },
        getDZ () {
            this.$store.dispatch('getDZ');
        },
        ...mapActions({
            getDZ: 'getDZ'
        })
    }
}
</script>

<style lang="scss" scoped>

</style>
