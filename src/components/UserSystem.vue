<template>
    <div id="userSystem">
        <div>
            <h4>{{tableTitle}}</h4>
            <template>
                <el-table
                        :data="tableData"
                        border
                        v-loading="loading"
                        ref="multipleTable"
                        width="600px"
                        size="mini"
                        @selection-change="selectUserList"
                        @select-all="selectAll"

                >
                    <el-table-column
                            type="selection"
                            width="35"
                            align="center"
                    >
                    </el-table-column>
                    <el-table-column label="日期" prop="recordDate" sortable  align="center" :formatter="formatDate"></el-table-column>
                    <el-table-column label="名字" prop="username" sortable  align="center"></el-table-column>
                    <el-table-column label="联系电话" prop="phone" align="center"></el-table-column>
                    <el-table-column label="性别" prop="sex" align="center"></el-table-column>
                    <el-table-column label="地址" prop="address" align="center"></el-table-column>
                    <el-table-column label="操作" width="200" align="center" >
                        <template slot-scope="scope">
                            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div style="padding: 5px 0;">
                    <el-button type="danger" @click="delMany">批量删除</el-button>
                </div>
                <el-pagination
                        :current-page="pageForm.pageNumber"
                        :page-sizes="[5, 10, 15, 20]"
                        :page-size="pageForm.limit"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="pageForm.total"
                        @size-change="changePageSize"
                        @current-change="changeCurrentPage"
                        @prev-click="prevClick"
                        @next-click="nextClick"
                ></el-pagination>
            </template>
        </div>
        <el-dialog
                title="修改用户信息"
                :visible.sync="dialogVisible"
                width="30%"
                >
            <edit-page v-show="dialogVisible" :userInfo="editUser" @handleUser="handleUser"></edit-page>
        </el-dialog>

    </div>
</template>

<script>
    import EditPage from "./EditPage";
    export default {
        name: "UserSystem",
         created(){
            this.loadUser();
        },
        mounted(){
        },
        data() {
            return {
                tableData: [
                ],
                search: "",
                editUser: {},
                loading:true,
                selectData:[],
                pageForm:{
                    limit:10,
                    pageNumber:1,
                    total:0
                },
                tableTitle:"用户数据表",
                dialogVisible:false
            };
        },
        methods: {
            handleEdit(index, row) {
                /*编辑用户*/
                this.editUser = {
                    _id: row._id,
                    username: row.username,
                    phone: row.phone,
                    address: row.address,
                    sex: row.sex,
                    recordDate: row.recordDate
                };
                this.dialogVisible = !this.dialogVisible;
            },
            handleDelete(index, row) {
                /*删除用户*/
                this.$confirm("是否删除该用户?", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                }).then(() => {
                        /*删除数据*/
                        this.$axios.post("http://localhost:3000/user/deleteUser",{userList:[row._id]}).then((res)=>{
                            if(res.data.err===0){
                                this.$message({
                                    type: "success",
                                    message:res.data.data
                                });
                                this.loadUser();
                            }
                        })
                    })
                    .catch(() => {
                        this.$message({
                            type: "info",
                            message: "已取消删除"
                        });
                    });
            },
            async handleUser(type, user) {
                /*提交用户修改*/
                if (type === "edit") {
                    /*用户编辑*/
                    let result = await this.$axios.post('http://localhost:3000/user/updateUser',user);
                    if(result.data.err===0){
                        this.$message({
                            type: "success",
                            message:result.data.data
                        });
                    }else{
                        this.$message({
                            type: "warn",
                            message:result.data.data
                        });
                    }
                    this.tableData.forEach((userItem,index)=>{
                        if(userItem._id === user._id){
                            this.tableData.splice(index,1,user);
                        }
                    })
                }
                this.dialogVisible = !this.dialogVisible;
            },
            formatDate(row){
                /*日期格式化*/
                let recordDate = row.recordDate;
                recordDate = new Date(recordDate);
                let year =recordDate.getFullYear();
                let month = recordDate.getMonth()+1;
                let date = recordDate.getDate();
                return year+"-"+month+"-"+date
            },
            selectUserList(selectList){
                /*多选 选中用户*/
                this.selectData = selectList;
            },
            selectAll(selectList){
                /*用户全选*/
                this.selectData = selectList;
            },
            delMany(){
                /*批量删除*/
                if(this.selectData.length >0){
                    let delList = [];
                    this.selectData.forEach((user)=>{
                        delList.push({_id:user._id});
                    })
                    this.$axios.post("http://localhost:3000/user/deleteUser",{userList:delList}).then((res)=>{
                        if(res.data.err===0){
                            this.$message({
                                type: "success",
                                message:res.data.data
                            });
                            this.loadUser();
                        }
                    })
                }
            },
            async loadUser(){
                /*刷新用户列表*/
                this.loading = true;
                let result =await this.$axios.post('http://localhost:3000/user/getUserList',this.pageForm)
                if(result.data.err===0){
                    this.tableData = result.data.data.userList;
                    this.pageForm.total = result.data.data.total;
                }
                this.$nextTick(()=>{
                    this.loading = false
                })
            },
            changePageSize(pageSize){
                /*修改每页的数目*/
                this.pageForm.limit = pageSize;
                this.loadUser();
            },
            changeCurrentPage(pageNumber){
                /*修改当前页*/
                this.pageForm.pageNumber = pageNumber;
                this.loadUser();

            },
            prevClick(pageNumber){
                /*上一页*/
                this.pageForm.pageNumber = pageNumber;
                this.loadUser();

            },
            nextClick(pageNumber){
                /*下一页*/
                this.pageForm.pageNumber = pageNumber;
                this.loadUser();

            }
        },
        components: {
            EditPage
        }
    };
</script>

<style scoped  lang="stylus">
</style>
