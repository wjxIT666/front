<template>
    <div class="index13">
        <div class="box" v-for="item in listArr" :key="item.idno" @click="boxClick(item.name)">
            <h5>{{item.name}}</h5>
        </div>
    </div>
</template>

<script>
export default {
    name: 'index13',
    data () {
        return {
            listArr: [
                {
                    idno: '0001',
                    name: '北大'
                },
                {
                    idno: '0002',
                    name: '清华'
                }
            ]
        }
    },
    methods: {
        boxClick (id) {
            this.$router.push({
                name: 'detail',
                params: { id }
            });
        }
    }
}
</script>

<style lang="scss" scoped>
.box {
    width: 100%;
    height: 100px;
    background-color: pink;
    margin-bottom: 1%;
}
</style>