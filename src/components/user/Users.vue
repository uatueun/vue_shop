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
                      <el-switch v-model="scope.row.mg_state">
                      </el-switch>
                    </template>
                  </el-table-column>
                  <el-table-column label="操作"></el-table-column>
                </el-table>
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
        pagenum: 1,
        pagesize: 10
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
    }
  }
}
</script>

<style lang="sass" scoped>

</style>
