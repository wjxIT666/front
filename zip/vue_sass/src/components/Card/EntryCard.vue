<template>
    <div class="entry_card">
        <el-card class="box-card">
            <!-- 入口卡片 -->
            <!-- 图片 -->
            <el-row type="flex" justify="center">
                <el-col :span="12">
                    <div class="position gutter_bot">
                        <el-image style="width: 100%;" :src="entryItem.image" fit="fit"></el-image>
                    </div>
                </el-col>
            </el-row>
            <!-- 文字 -->
            <el-row>
                <el-col :span="24">
                    <!-- 标题 -->
                    <el-row type="flex" justify="center">
                        <el-col :span="12">
                            <h4 class="position titleText">{{entryItem.textTitle}}</h4>
                        </el-col>
                    </el-row>
                    <!-- 描述 -->
                    <el-row type="flex" justify="center">
                        <el-col :span="14">
                            <p class="position descText">{{entryItem.textDesc}}</p>
                        </el-col>
                    </el-row>
                </el-col>
            </el-row>
            <!-- 按钮 -->
            <el-row v-if="entryItem.btnFlag">
                <el-col :span="24">
                    <div class="gutter_top">
                        <BigButton :btnItem="entryItem.btnItem" @click-btn="immediately"></BigButton>
                    </div>
                </el-col>
            </el-row>
        </el-card>
    </div>
</template>

<script>
import BigButton from '../Button/BigButton.vue';
export default {
    name: 'entry_card',
    props: {
        entryItem: {
            default: Object
        }
    },
    data () {
        return {
           
        }
    },
    components: { BigButton },
    methods: {
        //立即入驻
        immediately (data) {
            //页面跳转
            switch (data) {
                case '立即入驻':
                    this.$router.push({ path: '/baseInfo' });
                    break;
                case '请修改信息':
                    this.$router.push({ path: '/updateBaseInfo' });
                    break;
                case '审核中':
                    this.$alert('入驻信息已提交成功，审核时间1-3个工作日，请耐心等待审核结果', {
                        confirmButtonText: '确定',
                        callback: action => {
                            
                        }
                    });
                    break;
            };
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../../scss/base.scss';
.position {
    text-align: $center;
};

.titleText {
    font-size: $fontSizeMedium;
    font-weight: 700;
    line-height: $lineHeiht;
};

.descText {
    font-size: $fontSizeExtra;
};

.gutter_bot {
    margin-bottom: 18%;  
};

.gutter_top {
    margin-top: 10%;
};

.el-card {
    @include elCard(8%, 10%, 8%, 10%);
};
</style>
