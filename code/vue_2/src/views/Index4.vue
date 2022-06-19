<template>
    <div class="index4">
        <!-- 单元素过渡 -->
        <div>
            <button @click="btnClick">按钮A</button>
            <transition name="fade">
                <div class="box" v-if="isShow1"></div>
            </transition>
        </div>

        <!-- 多元素过渡 -->
        <div>
            <button @click="btnClickB">按钮B</button>
            <transition name="slide">
                <p v-if="isShow2" key="111">111</p>
                <p v-else key="222">222</p>
            </transition>
        </div>

        <!-- 动态组件过渡 -->
        <div>
            <button @click="currentComponent = 'Header'">头部组件</button>
            <button @click="currentComponent = 'Footer'">底部组件</button>
            <transition name="slide">
                <component :is="currentComponent"></component>
            </transition>
        </div>

        <!-- 多列表过渡 -->
        <div>
            <input type="text" v-model="schoolName"/>
            <button @click="addSchool">添加学校</button>
            <transition-group name="slide" tag="div" mode="out-in">
                <div v-for="item in listArr" :key="item.idno">
                    <h5>{{item.name}}</h5>
                </div>
            </transition-group>
        </div>
    </div>
</template>

<script>
import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue';
export default {
    name: 'index4',
    data () {
        return {
            isShow1: false,
            isShow2: true,
            currentComponent: 'Header',
            listArr: [
                {
                    idno: '0001',
                    name: '北大'
                },
                {
                    idno: '0002',
                    name: '清华'
                }
            ],
            schoolName: ''
        }
    },
    methods: {
        btnClick () {
            this.isShow1 = !this.isShow1;
        },
        btnClickB () {
            this.isShow2 = !this.isShow2;
        },
        addSchool () {
            this.listArr.push({idno: '0003', name: this.schoolName});
        }
    },
    components: { Header, Footer },
    updated () {
        console.log('状态更新时触发');
    }
}
</script>

<style lang="scss" scoped>
.box {
    width: 100px;
    height: 100px;
    background-color: pink;
    &.fade-enter-active, &.fade-leave-active {
        transition: all 2s;
    }
    &.fade-enter, &.fade-leave-to {
        opacity: 0;
    }
    &.fade-enter-to, &.fade-leave {
        opacity: 1;
    }
}

.slide-enter-active, .slide-leave-active {
    transition: all 2s;
}
.slide-enter, .slide-leave-to {
    transform: translate(100px, 0);
}
.slide-enter-to, .slide-leave {
    transform: translate(0, 0);
}
</style>
