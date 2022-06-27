<template>
    <div class="inp">
        <!-- 封装通用的Input搜索框 -->
        <el-input v-model="inpVal" :placeholder="inpItem.placeholder" :size="inpItem.size">
            <!-- 输入框前置内容 -->
            <template :slot="inpItem.prepend">
                <el-select :style="{'width': inpItem.width}" v-model="select" placeholder="游戏名称">
                    <div v-for="selItem in inpItem.selectOption" :key="selItem.value">
                        <el-option :label="selItem.label" :value="selItem.value"></el-option>
                    </div>
                </el-select>
            </template>
            <!-- 输入框后置内容 -->
            <template :slot="inpItem.slot">
                <el-button :icon="inpItem.icon" @click="btnClick(inpVal)"></el-button>
            </template>
        </el-input>
    </div>
</template>

<script>
export default {
    name: 'inp',
    props: {
        inpItem: {
            default: Object
        }
    },
    data () {
        return {
            inpVal: '',
            select: ''
        }
    },
    methods: {
        btnClick (data) {
            //判断CP/游戏名称
            let cpName, gameName, gameFlag;
            if (this.select === '1') {
                cpName = data;
            } else if (this.select === '2') {
                gameName = data;
                gameFlag = true;
            } else {
                gameName = data;
            };
            this.$emit('inp-search', cpName, gameName);
        }
    }
}
</script>

<style lang="scss" scoped>

</style>
