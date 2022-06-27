<template>
    <div class="aside">
        <el-row>
            <el-col :span="24">
                <el-menu
                    :default-active="elMenu.defaultActive"
                    :router="elMenu.router"
                    :class="elMenu.class"
                    @select="handleSelect"
                    :background-color="elMenu.bgColor"
                    :text-color="elMenu.textColor"
                    :active-text-color="elMenu.activeTextColor">
                    <div v-for="listArray in elMenu.listArray" :key="listArray.index">
                        <el-submenu :index="listArray.index">
                            <template :slot="listArray.solt">
                                <i class="icon" :class="listArray.icon"></i>
                                <span>{{listArray.titleText}}</span>
                            </template>
                            <div v-for="itemArray in listArray.itemArray" :key="itemArray.index">
                                <el-menu-item :index="itemArray.index" @click="btnClick(itemArray.index)">
                                    <i class="icon" :class="itemArray.icon"></i>
                                    <span>{{itemArray.text}}</span>
                                </el-menu-item>
                            </div>
                        </el-submenu>
                    </div>
                </el-menu>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    props: {
        elMenu: {
            default: Object
        }
    },
    data () {
        return {
            
        }
    },
    methods: {
        handleSelect(key, keyPath) {
            // console.log(key);
            // console.log(keyPath);
        },
        btnClick (data) {
            this.$emit('silde-mainOne', data);
        }
    },
    mounted () {
        //获取当前屏幕高度
        let currentHeight = window.innerHeight;
        // console.log(currentHeight);
        //减去头部高度
        currentHeight = currentHeight - 56;
        let elMenu = document.querySelector('.elMenuStyle');
        elMenu.style.height= `${currentHeight}px`;
    }
}
</script>

<style lang="scss" scoped>
@import '../../scss/base.scss';
.el-menu {
    @include elMenu ();
    .icon {
        vertical-align: middle;
        margin-right: 5px;
        width: 24px;
        text-align: center;
        font-size: 18px;
    };
};
</style>

