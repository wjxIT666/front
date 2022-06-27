<template>
    <div class="answer_text">
        <!-- 封装通用的帮助中心文案 -->
        <h3>{{AnswerItem.title}}</h3>
        <div class="textStyle" v-for="item in AnswerItem.question" :key="item.id">
            <!-- FAQ -->
            <p v-if="item.flag === 'FAQ'">{{`${item.id}、${item.flag}`}}</p>
            <!-- 标题 -->
            <p v-if="item.flag !== 'FAQ'">{{`${item.id}、${item.name}`}}</p>
            <p v-else>{{item.name}}</p>
            <!-- 内容 -->
            <div>
                <div v-if="Array.isArray(item.content)">
                    <div v-for="itemContent in item.content" :key="itemContent.id">
                        <p>{{itemContent.content}}</p>
                    </div>
                </div>
                <div v-else>{{item.content}}</div>
            </div>
            <!-- 二级数据 -->
            <div v-if="item.list">
                <div v-for="itemList in item.list" :key="itemList.id">
                    <div>{{`${itemList.id}${itemList.content}`}}</div>
                    <div v-if="itemList.list">
                        <div v-for="itemListSec in itemList.list" :key="itemListSec.id">
                            <p style="text-indent:20px;">{{`${itemListSec.flag} ${itemListSec.content}`}}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="item.images">
                <div v-for="itemList in item.images" :key="itemList.id">
                    <el-image style="width: 300px;" :src="itemList.url" :preview-src-list="srcList">

                    </el-image>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'answer_text',
    props: {
        AnswerItem: {
            default: Object
        }
    },
    data () {
        return {
            srcList: []
        }
    },
    mounted () {
        this._props.AnswerItem.question.forEach( item => {
            if (item.images) {
                item.images.forEach( item2 => {
                    this.srcList.push(item2.url);
                } );
            };
        } );
        // console.log(this.srcList, '~~~');
    }
}
</script>

<style lang="scss" scoped>
.textStyle {
    font-size: 14px;
    margin: 2% 0;
    line-height: 26px;
}
</style>
