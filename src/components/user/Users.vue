<template>
    <div>
        <!-- 麵包屑導航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首頁</el-breadcrumb-item>
            <el-breadcrumb-item>用戶管理</el-breadcrumb-item>
            <el-breadcrumb-item>用戶列表</el-breadcrumb-item>
        </el-breadcrumb>

        <!-- 卡片區 -->
        <el-card class="box-card">
            <div>
              <!-- 搜索和添加 -->
                <el-row :gutter="20">
                    <el-col :span="9">
                            <el-input placeholder="請輸入內容">
                                <el-button slot="append" icon="el-icon-search"></el-button>
                            </el-input>
                    </el-col>
                    <el-col :span="3">
                        <el-button type="primary">添加用戶</el-button>
                    </el-col>
                </el-row>

                <!-- 用戶列表區 -->
                <el-table :data="userList" border stripe>
                  <el-table-column type="index"></el-table-column>
                  <el-table-column label="姓名" prop="username"></el-table-column>
                  <el-table-column label="信箱" prop="email"></el-table-column>
                  <el-table-column label="電話" prop="mobile"></el-table-column>
                  <el-table-column label="角色" prop="role_name"></el-table-column>
                  <el-table-column label="狀態">
                    <template slot-scope="scope">
                      <el-switch v-model="scope.row.mg_state" @change="userStateChanged(scope.row)">
                      </el-switch>
                    </template>
                  </el-table-column>
                  <el-table-column label="操作" width="170px">
                    <template slot-scope="scope">
                      <!-- 編輯按鈕 -->
                      <el-button type="primary" icon="el-icon-edit" circle></el-button>
                      <!-- 刪除按鈕 -->
                      <el-button type="danger" icon="el-icon-delete" circle></el-button>
                      <!-- 分配按鈕 -->
                      <el-tooltip effect="dark" content="角色分配" placement="top" :enterable="false">
                        <el-button type="warning" icon="el-icon-s-tools" circle ></el-button>
                      </el-tooltip>
                    </template>
                  </el-table-column>
                </el-table>

                <!-- 分頁區 -->
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="queryInfo.pagenum"
                    :page-sizes="[1, 2, 5, 10]"
                    :page-size="queryInfo.pagesize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total">
                </el-pagination>

            </div>
        </el-card>
    </div>
</template>

<script>
export default {
  data() {
    return {
    // 獲取用戶列表參數物件
      queryInfo: {
        query: '',
        // 當前頁數
        pagenum: 1,
        // 當前每頁顯示的數據數量
        pagesize: 2
      },
      userList: [],
      total: 0
    }
  },
  created() {
    this.getUserList()
  },
  methods: {
    async getUserList() {
      const { data: res } = await this.$http.get('users', { params: this.queryInfo })
      if (res.meta.status !== 200) {
        return this.$message.error('獲取用戶列表失敗')
      }
      this.userList = res.data.users
      this.total = res.data.total
      console.log(res)
    },
    // pagesize改變事件
    handleSizeChange(newSize) {
      // console.log(newSize)
      this.queryInfo.pagesize = newSize
      this.getUserList()
    },
    // 頁碼值改變事件
    handleCurrentChange(newPage) {
      // console.log(newPage)
      this.queryInfo.pagenum = newPage
      this.getUserList()
    },
    // switch 開關狀態的改變事件
    async userStateChanged(userinfo) {
      console.log(userinfo)
      const { data: res } = await this.$http.put(`users/${userinfo.id}/state/${userinfo.mg_state}`)

      if (res.meta.status !== 200) {
        userinfo.mg_state = !userinfo.mg_state
        return this.$msg.error('更新用戶狀態失敗！')
      }
      return this.$msg.success('更新用戶狀態成功！')
    }
  }
}
</script>

<style lang="sass" scoped>

</style>
