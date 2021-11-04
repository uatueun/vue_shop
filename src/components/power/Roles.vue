<template>
    <div>
        <!-- 麵包屑導航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首頁</el-breadcrumb-item>
            <el-breadcrumb-item>權限管理</el-breadcrumb-item>
            <el-breadcrumb-item>角色列表</el-breadcrumb-item>
        </el-breadcrumb>

        <!-- 卡片視圖 -->
        <el-card>
            <!-- 添加角色按鈕 -->
            <el-row>
                <el-col>
                    <el-button type="primary">添加角色</el-button>
                </el-col>
            </el-row>

            <!-- 角色列表區 -->
            <el-table :data="rolelist" border stripe>
                <!-- 展開列 -->
                <el-table-column type="expand">
                    <template slot-scope="scope">
                        <el-row :class="['bdbottom', i1 === 0 ? 'bdtop' : '']" v-for="(item1, i1) in scope.row.children" :key="item1.id">
                            <!-- 一級權限 -->
                            <el-col :span="5">
                                <el-tag closable>{{ item1.authName }}</el-tag>
                                <i class="el-icon-caret-right"></i>
                            </el-col>
                            <!-- 二級跟三級權限 -->
                            <el-col :span="19"></el-col>
                        </el-row>

                        <pre>
                            {{ scope.row }}
                        </pre>
                    </template>
                </el-table-column>
                <!-- 索引列 -->
                <el-table-column type="index"></el-table-column>
                <el-table-column label="角色名稱" prop="roleName"></el-table-column>
                <el-table-column label="角色描述" prop="roleDesc"></el-table-column>
                <el-table-column label="操作" width="300px">
                    <template slot-scope="scope">
                        <el-button size="mini" type="primary" icon="el-icon-search">編輯</el-button>
                        <el-button size="mini" type="danger" icon="el-icon-delete">刪除</el-button>
                        <el-button size="mini" type="warning" icon="el-icon-setting">分配權限</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
    </div>
</template>

<script>
export default {
  data() {
    return {
    // 所有角色列表數據
      rolelist: []
    }
  },
  created() {
    this.getRolesList()
  },
  methods: {
    // 獲取所有角色列表
    async getRolesList() {
      const { data: res } = await this.$http.get('roles')

      if (res.meta.status !== 200) {
        return this.$msg.error('獲取角色列表失敗！')
      }
      this.rolelist = res.data
      console.log(this.rolelist)
    }
  }
}
</script>

<style lang="scss" scoped>

.el-tag {
    margin: 7px;
}

.bdtop {
    border-top: 1px solid #eee;
}

.bdbottom {
    border-bottom: 1px solid #eee;
}
</style>
