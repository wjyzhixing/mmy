<template>
<div id="app">
<el-container style="height: 800px; border: 1px solid #eee">
  <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
    <div style="height: 60px;">
      <span style="font-weight: 1000;line-height: 60px;">导航</span>
    </div>
    <el-menu>
        <el-menu-item-group>
          <el-menu-item >
            <router-link class="list-group-item" to="/form">部门结构</router-link>
          </el-menu-item>
          <el-menu-item >
            <router-link class="list-group-item" to="/">合同管理</router-link>
          </el-menu-item>
          <el-menu-item>
            <router-link class="list-group-item" to="/staff">人员管理</router-link>
          </el-menu-item>
          <el-menu-item >
            <router-link class="list-group-item" to="/dept">部门管理</router-link>
          </el-menu-item>
        </el-menu-item-group>

    </el-menu>
  </el-aside>
    <router-view></router-view>
</el-container>

</div>
</template>

<script>
import Main from '../src/components/Main';
import renyuan from '../src/components/staff'

export default {
    name:'App',
    data(){
      return {
        tableData:{}
      }
    },
    mounted:function(){
    },
    methods:{
     
      }
    }
</script>

<style scoped>
  .el-header {
    background-color: rgb(238, 241, 246);
    color: #333;
    line-height: 60px;
  }

  .el-aside {
    color: #333;
  }
</style>
