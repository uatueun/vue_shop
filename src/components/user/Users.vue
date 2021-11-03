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
                            <el-input placeholder="請輸入內容" v-model="queryInfo.query" clearable @clear="getUserList">
                                <el-button slot="append" icon="el-icon-search" @click="getUserList"></el-button>
                            </el-input>
                    </el-col>
                    <el-col :span="3">
                        <el-button type="primary" @click="addDialogVisible = true">添加用戶</el-button>
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
                      <el-button type="primary" icon="el-icon-edit" circle @click="showEditDialog(scope.row.id)"></el-button>
                      <!-- 刪除按鈕 -->
                      <el-button type="danger" icon="el-icon-delete" circle @click="removeUserById(scope.row.id)"></el-button>
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

          <!-- 添加用戶的彈出對話框 -->
          <el-dialog
            title="添加用戶"
            :visible.sync="addDialogVisible"
            width="50%"
            @close="addDialogClosed">
            <!-- 內容主體區 -->
            <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="80px">
              <el-form-item label="用戶名稱" prop="username">
              <el-input v-model="addForm.username" ></el-input>
              </el-form-item>
              <el-form-item label="用戶密碼" prop="password">
              <el-input v-model="addForm.password" ></el-input>
              </el-form-item>
              <el-form-item label="用戶信箱" prop="email">
              <el-input v-model="addForm.email" ></el-input>
              </el-form-item>
              <el-form-item label="手機號碼" prop="mobile">
              <el-input v-model="addForm.mobile" ></el-input>
              </el-form-item>
            </el-form>
            <!-- 底部區 -->
            <span slot="footer" class="dialog-footer">
              <el-button @click="addDialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="addUser">確 定</el-button>
            </span>
          </el-dialog>
          <!-- 編輯用戶資料彈出對話框 -->
          <el-dialog
            title="編輯用戶"
            :visible.sync="editDialogVisible"
            width="50%"
            @close="editDialogClosed">

            <el-form :model="editForm" :rules="editFormRules" ref="editFormRef" label-width="80px">
              <el-form-item label="用戶名稱">
                <el-input v-model="editForm.username" disabled></el-input>
              </el-form-item>
              <el-form-item label="用戶信箱" prop="email">
                <el-input v-model="editForm.email"></el-input>
              </el-form-item>
              <el-form-item label="手機號碼" prop="mobile">
                <el-input v-model="editForm.mobile"></el-input>
              </el-form-item>
            </el-form>

            <span slot="footer" class="dialog-footer">
              <el-button @click="editDialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="editUserInfo">確 定</el-button>
            </span>
          </el-dialog>

    </div>
</template>

<script>
export default {
  data() {
    // 驗證信箱的規則
    var checkEmail = (rule, value, cb) => {
      // 驗證信箱的正則表達式
      const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/

      if (regEmail.test(value)) {
        // 合法的信箱
        return cb()
      }
      cb(new Error('請輸入正確的信箱'))
    }
    // 驗證手機的規則
    var checkMobile = (rule, value, cb) => {
      // 驗證手機的正則表達式
      const regMobile = /^09[0-9]{8}$/
      if (regMobile.test(value)) {
        return cb()
      }
      cb(new Error('請輸入正確的手機號碼'))
    }
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
      total: 0,
      // 控制添加用戶對話框的顯示跟隱藏
      addDialogVisible: false,
      // 添加用戶表單
      addForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      // 定義表單驗證規則
      addFormRules: {
        username: [
          { required: true, message: '請輸入用戶名稱', trigger: 'blur' },
          { min: 3, max: 10, message: '用戶名稱長度為3~10個字元', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '請輸入用戶密碼', trigger: 'blur' },
          { min: 6, max: 14, message: '用戶名稱長度為6~14個字元', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '請輸入用戶信箱', trigger: 'blur' },
          { validator: checkEmail, trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '請輸入用戶手機', trigger: 'blur' },
          { validator: checkMobile, trigger: 'blur' }
        ]
      },
      // 控制編輯用戶對話框的顯示跟隱藏
      editDialogVisible: false,
      // 查詢到的用戶訊息保存對象
      editForm: {},
      // 編輯表單驗證規則對象
      editFormRules: {
        email: [
          { required: true, message: '請輸入用戶信箱', trigger: 'blur' },
          { validator: checkEmail, trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '請輸入用戶手機', trigger: 'blur' },
          { validator: checkMobile, trigger: 'blur' }
        ]
      }
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
    },
    // 添加用戶對話框的關閉事件
    addDialogClosed() {
      this.$refs.addFormRef.resetFields()
    },
    // 點選按鈕增加新用戶
    addUser() {
      this.$refs.addFormRef.validate(async valid => {
        if (!valid) return false
        // 可以發起添加用戶的網路請求
        const { data: res } = await this.$http.post('users', this.addForm)
        if (res.meta.status !== 201) {
          this.$msg.error('添加用戶失敗！')
        }
        this.$msg.success('添加用戶成功！')
        // 隱藏添加用戶對話框
        this.addDialogVisible = false
        // 重新獲取用戶列表數據
        this.getUserList()
      })
    },
    // 彈出編輯用戶對話框
    async showEditDialog(id) {
      // console.log(id)
      const { data: res } = await this.$http.get('users/' + id)
      if (res.meta.status !== 200) {
        return this.$msg.error('查詢用戶訊息失敗！')
      }
      this.editForm = res.data
      this.editDialogVisible = true
    },
    // 編輯用戶對話框的關閉事件
    editDialogClosed() {
      this.$refs.editFormRef.resetFields()
    },
    // 編輯用戶訊息並提交
    editUserInfo() {
      this.$refs.editFormRef.validate(async valid => {
        // console.log(valid)
        if (!valid) return false
        // 發起編輯用戶訊息的數據請求
        const { data: res } = await this.$http.put('users/' + this.editForm.id, {
          email: this.editForm.email,
          mobile: this.editForm.mobile
        })

        if (res.meta.status !== 200) {
          return this.$msg.error('更新用戶訊息失敗！')
        }

        // 關閉對話框
        this.editDialogVisible = false
        // 刷新數據列表
        this.getUserList()
        // 提示編輯成功
        this.$msg.success('更新用戶訊息成功！')
      })
    },
    // 根據id刪除對應的用戶訊息
    async removeUserById(id) {
      // 彈出確定刪除對話框
      const confirmResult = await this.$confirm('此操作將永久刪除該用戶, 是否繼續?', '提示', {
        confirmButtonText: '確定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      // 如果用戶確認刪除 則反回字符串confirm
      // 如果用戶取消刪除 則反回字符串cancel
      // console.log(confirmResult)
      if (confirmResult !== 'confirm') {
        return this.$msg.info('已取消刪除')
      }
      const { data: res } = await this.$http.delete('users/' + id)

      if (res.meta.status !== 200) {
        return this.$msg.error('刪除用戶失敗！')
      }
      this.$msg.success('成功刪除用戶！')
      this.getUserList()
    }
  }
}
</script>

<style lang="sass" scoped>

</style>
