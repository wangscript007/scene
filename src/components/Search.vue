<template>
    <div class="search">
        <p>搜索:</p>
        <el-input
            :placeholder="placeholder"
            @blur="change"
            prefix-icon="el-icon-search"
            v-model="input">
        </el-input>
        <el-button type="primary"
                   style="margin-left: 10px"
                   @click="search">搜索</el-button>
        <el-button @click="reset">重置</el-button>
    </div>
</template>

<script>
    export default {
        props: {
            placeholder: {
                type: String,
                default: '请输入搜索内容'
            }
        },
        data() {
            return {
                input: ''
            }
        },
        methods: {
            search() {
                this.$emit('search', this.input)
            },
            reset() {
                this.input = ''
                this.$emit('reset', '')
            },
            change () {
                this.$emit('change', this.input)
            }
        }
    }
</script>

<style lang="scss" scoped>
    .search {
        display: flex;
        align-items: center;
        height: 74px;
        background-color: #fff;
        border-radius: 10px;
        width: 95%;
        p {
            margin-left: 25px;
            font-size: 16px;
            padding-right: 26px;
            color: #666;
            font-weight: 500;
            width:80px;
        }
        /deep/ .el-button {
            margin-left: 29px !important;
        }
        /deep/ .el-input{
            width: calc(100% - 240px);
        }
    }
</style>
