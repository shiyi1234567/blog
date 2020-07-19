<template>
    <div>
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="用户名">
                <el-input v-model="form.username"></el-input>
            </el-form-item>
            <el-form-item label="联系电话">
                <el-input v-model="form.phone"></el-input>
            </el-form-item>
            <el-form-item label="性别">
                <el-input v-model="form.sex"></el-input>
            </el-form-item>
            <el-form-item label="地址">
                <el-input v-model="form.address"></el-input>
            </el-form-item>
        </el-form>
        <el-button @click="handleEdit">确定</el-button>
        <el-button @click="handleCancel">取消</el-button>
    </div>
</template>

<script>
    export default {
        name: "EditPage",
        props: ["userInfo"],
        data() {
            return {
                form: this.userInfo
            };
        },
        watch: {
            userInfo(){
                this.form = this.userInfo;
            }
        },
        methods: {
            handleEdit() {


                this.$emit("handleUser", "edit", this.form);
            },
            handleCancel() {
                this.$emit("handleUser", "cancel");
            }
        }
    };
</script>

<style scoped>
</style>
