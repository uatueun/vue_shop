<template>
<!-- 頭部區域 -->
    <el-container class="home-container">
      <el-header>
        <div>
          <img src="../assets/logo2.png" alt="">
          <span>電商後臺管理系統</span>
        </div>
        <el-button type="info" @click="logout">登出</el-button>
      </el-header>
      <!-- 頁面主要區域 -->
      <el-container>
        <!-- 左側欄位 -->
        <el-aside width="200px">
          <!-- 左側導航 -->
          <el-menu
            background-color="#80976C"
            text-color="#fff"
            active-text-color="#ffd04b">
          <!-- 一級菜單 -->
          <el-submenu :index="item.id + ''" v-for="item in menulist" :key="item.id">
            <!-- 一級菜單區塊 -->
          <template slot="title">
            <!-- 圖標 -->
            <i class="el-icon-location"></i>
            <!-- 文本 -->
            <span>{{item.authName}}</span>
          </template>
              <!-- 二級菜單 -->
            <el-menu-item :index="subItem.id + ''" v-for="subItem in item.children" :key="subItem.id">
              <template slot="title">
                <!-- 圖標 -->
                <i class="el-icon-location"></i>
                <!-- 文本 -->
                <span>{{ subItem.authName }}</span>
              </template>
            </el-menu-item>
          </el-submenu>
          </el-menu>
        </el-aside>
        <!-- 右側主要欄位 -->
        <el-main>Main</el-main>
      </el-container>
    </el-container>
</template>

<script>
export default {
  data() {
    return {
      menulist: []
    }
  },
  created() {
    this.getMenuList()
  },
  methods: {
    logout() {
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
    // 獲取所有左側菜單
    async getMenuList() {
      const { data: res } = await this.$http.get('menus')
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
      this.menulist = res.data
      console.log(res)
    }
  }
}
</script>

<style lang="scss" scoped>
.home-container {
  height: 100%;
}
.el-header {
  background-color: #363D40;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  color: #fff;
  font-size: 20px;
  div {
    display: flex;
    align-items: center;
    span {
      margin-left: 15px;
    }
  }
  img {
    margin-left: 5px;
    height: 50px;
  }

}
.el-aside {
  background-color: #80976C;
}
.el-main {
 background-color: #E9EDF0;
}
.el-submenu i,
.el-menu-item i {
  color: #fff;
}

</style>
