<template>
  <div>

  <div id ="app">
    <el-row class="tac">
      <el-col :span="12">
        <h4>快借宝</h4>
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose">

          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-star-on"></i>
              <span>我要借款</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="1-1">借款申请</el-menu-item>
              <el-menu-item index="1-2">借款管理</el-menu-item>
            </el-menu-item-group>
          </el-submenu>

          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-star-on"></i>
              <span>我要理财</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="2-1">理财产品管理</el-menu-item>
              <el-menu-item index="2-2">我的债权</el-menu-item>
              <el-menu-item index="2-3">债权转让</el-menu-item>
            </el-menu-item-group>
          </el-submenu>

          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-star-on"></i>
              <span>信用管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="3-1">信用查询</el-menu-item>
              <el-menu-item index="3-2">信用额度管理</el-menu-item>
            </el-menu-item-group>
          </el-submenu>

          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-star-on"></i>
              <span>咨询</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="4-1">常见问题咨询</el-menu-item>
              <el-menu-item index="4-2">在线咨询</el-menu-item>
            </el-menu-item-group>
          </el-submenu>

          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-star-on"></i>
              <span>数据统计</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="5-1">借还款统计</el-menu-item>
              <el-menu-item index="5-2">理财统计</el-menu-item>
            </el-menu-item-group>
          </el-submenu>

          <el-submenu index="6">
            <template slot="title">
              <i class="el-icon-star-on"></i>
              <span>个人中心</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="6-1">个人信息管理</el-menu-item>
              <el-menu-item index="6-2">个人安全管理</el-menu-item>
              <el-menu-item index="6-3">银行卡管理</el-menu-item>
              <el-menu-item index="6-4">退出登录</el-menu-item>
            </el-menu-item-group>
          </el-submenu>

        </el-menu>
      </el-col>
    </el-row>
  </div>
  </div>
</template>

<script>
export default {
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<style>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
</style>
