<template>
  <div>
  
  <div id ="app">
    <div>这是{{count}}</div>
    <button v-on:click="to0">asd</button>
    <el-menu
  :default-active="activeIndex2"
  class="el-menu-demo"
  mode="horizontal"
  @select="handleSelect"
  background-color="#545c64"
  text-color="#fff"
  active-text-color="#ffd04b">
  <el-menu-item index="1" @click = "to0">首页</el-menu-item>
  <el-submenu index="2">
    <template slot="title">我要借款</template>
    <el-menu-item index="2-1">借款申请</el-menu-item>
    <el-menu-item index="2-2">借款管理</el-menu-item>
  </el-submenu>
  <el-submenu index="3">
    <template slot="title">我要理财</template>
    <el-menu-item index="3-1">理财产品管理</el-menu-item>
    <el-menu-item index="3-2">我的债权</el-menu-item>
    <el-menu-item index="3-3">债权转让</el-menu-item>
  </el-submenu>
  <el-submenu index="4">
    <template slot="title">信用管理</template>
    <el-menu-item index="4-1">信用查询</el-menu-item>
    <el-menu-item index="4-2">信用额度管理</el-menu-item>
  </el-submenu>
  <el-submenu index="5">
    <template slot="title">数据统计</template>
    <el-menu-item index="5-1">支出统计</el-menu-item>
    <el-menu-item index="5-2">借款统计</el-menu-item>
    <el-menu-item index="5-3">理财统计</el-menu-item>
  </el-submenu>
  <el-submenu index="6">
    <template slot="title">我的账户</template>
    <el-menu-item index="6-1">个人信息管理</el-menu-item>
    <el-menu-item index="6-2">个人安全管理</el-menu-item>
    <el-menu-item index="6-3">银行卡管理</el-menu-item>
    <el-menu-item index="6-4">退出登录</el-menu-item>
  </el-submenu>
  <el-submenu index="7">
    <template slot="title">咨询</template>
    <el-menu-item index="4-1">常见问题</el-menu-item>
    <el-menu-item index="4-2">在线咨询</el-menu-item>
  </el-submenu>
  <el-submenu index="8" disabled>
    <template slot="title" >后台管理</template>
    <el-menu-item index="4-1">用户管理</el-menu-item>
    <el-menu-item index="4-2">理财产品管理</el-menu-item>
  </el-submenu>
  <el-menu-item index="1">登录/注册</el-menu-item>
 
</el-menu>

  </div>
  </div>
</template>

<script>
export default {
   data() {
      return {
        activeIndex: '1',
        activeIndex2: '1',
        pos: 3,
        count:1,
      };
    },
    methods: {
      to0(){
        count++;
      },
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }
    }

}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
