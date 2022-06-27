<template>
    <div class="select">
        <el-row type="flex" justify="space-between" :gutter="40">
            <el-col :span="14">
                <el-select v-model="value" :placeholder="selectItem.placeholder" :size="selectItem.size">
                    <el-option
                        v-for="item in selectItem.options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="10">
                <el-button :size="selectItem.btn.size" @click="btnClick">{{selectItem.btn.text}}</el-button>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    name: 'sel',
    props: {
        selectItem: {
            default: Object
        }
    },
    data () {
        return {
            value: ''
        }
    },
    methods: {
        btnClick () {
            this.$emit('sel-search', this.value);
        }
    },
    watch: {
        value: {
            deep: true,
            handler: function (newVal) {
                this.$emit('watch-selValue', newVal);
            }
        }
    }
}
</script>

<style lang="scss" scoped>

</style>
