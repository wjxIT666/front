<template>
    <div class="index4">
        <div class="index4_top">
            {{$route.params.id}}
        </div>
        <div class="index4_bottom">
            <div class="index4_bottom_item">
                <div @click="btn_Click1($route.params.id)">列表一</div>
                <div @click="btn_Click2($route.params.id)">列表二</div>
            </div>
            <div class="index4_bottom_item">
                <router-view name="listOne"></router-view>
                <router-view name="listTwo"></router-view>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'index4',
    methods: {
        //路径跳转
        btn_Click1 (id) {
            this.$router.push({
                path: `/index4/${id}/listOne`
            });
        },
        btn_Click2 () {
            this.$router.push({
                name: 'listTwo'
            });
        }
    }
}
</script>

<style lang="scss" scoped>
.index4_top {
    width: 100%;
    height: 100px;
    background-color: pink;
    margin-bottom: 1%;
}
.index4_bottom {
    width: 100%;
    display: flex;
    justify-content: space-between;
    .index4_bottom_item {
        width: 49.5%;
        height: 200px;
        background-color: yellow;
    }
}
</style>
