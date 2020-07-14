<template>
    <div id="userSystem">
        <div v-show="!isEdit">
            <template>
                <el-table
                        :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
                        :default-sort="{prop: 'date', order: 'descending'}"
                >
                    <el-table-column label="日期" prop="date" sortable></el-table-column>
                    <el-table-column label="名字" prop="name" sortable></el-table-column>
                    <el-table-column label="联系电话" prop="phone"></el-table-column>
                    <el-table-column label="性别" prop="sex"></el-table-column>
                    <el-table-column label="地址" prop="address"></el-table-column>
                    <el-table-column align="right">
                        <template slot="header" slot-scope>
                            <el-input v-model="search" size="mini" placeholder="输入关键字搜索" />
                        </template>
                        <template slot-scope="scope">
                            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="currentPage"
                        :page-sizes="[5, 10, 15, 20]"
                        :page-size="10"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="4"
                ></el-pagination>
            </template>
        </div>

        <edit-page v-show="isEdit" :userInfo="editUser" @handleUser="handleUser"></edit-page>
    </div>
</template>
</div>
</template>

<script>
    import EditPage from "./EditPage";
    export default {
        name: "UserSystem",
        data() {
            return {
                tableData: [
                    {
                        id: 23234,
                        date: "2016-05-02",
                        name: "赵四",
                        address: "上海市普陀区金沙江路 1518 弄",
                        phone: 13890633074,
                        sex: "男"
                    },
                    {
                        id: 23235,
                        date: "2016-05-04",
                        name: "王小虎",
                        address: "上海市普陀区金沙江路 1517 弄",
                        phone: 13890633074,
                        sex: "男"
                    },
                    {
                        id: 23236,
                        date: "2016-05-01",
                        name: "李三",
                        address: "上海市普陀区金沙江路 1519 弄",
                        phone: 13890633074,
                        sex: "男"
                    },
                    {
                        id: 23237,
                        date: "2016-05-03",
                        name: "王二",
                        address: "上海市普陀区金沙江路 1516 弄",
                        phone: 13890633074,
                        sex: "男"
                    }
                ],
                search: "",
                currentPage: 1,
                isEdit: false,
                editUser: "",
                editIndex: ""
            };
        },
        methods: {
            handleEdit(index, row) {
                console.log(index, row);
                this.editUser = {
                    id: row.id,
                    name: row.name,
                    phone: row.phone,
                    address: row.address,
                    sex: row.sex,
                    date: row.date
                };
                this.isEdit = !this.isEdit;
                this.editIndex = index;
            },
            handleDelete(index, row) {
                console.log(index);
                this.$confirm("是否删除该用户?", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                })
                    .then(() => {
                        /*删除数据*/
                        let del_index = this.tableData.findIndex(item => item.id === row.id);
                        this.tableData.splice(del_index, 1);
                        this.$message({
                            type: "success",
                            message: "删除成功!"
                        });
                    })
                    .catch(() => {
                        this.$message({
                            type: "info",
                            message: "已取消删除"
                        });
                    });
            },
            handleUser(type, user) {
                /*编辑后的结果*/
                if (type === "edit") {
                    /*用户编辑*/
                    let index = this.tableData.findIndex(item => item.id === user.id);

                    this.tableData.splice(index, 1, user);
                }
                this.isEdit = !this.isEdit;
            }
        },
        components: {
            EditPage
        }
    };
</script>

<style scoped  lang="stylus">
    #userSystem
        padding 20px 0 0 20px
</style>
