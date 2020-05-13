<template>
  <div style="width: 100%;border-left: 2px solid #ccc;">
      <el-row>

          <el-col :span="8">
            <el-container>
              <el-header style="margin-bottom: 10px; left; font-size: 15px;background: (238, 241, 246)">
                <span style="font-weight: 1000;">结构树</span>
              </el-header>

              <el-input
                placeholder="输入关键字进行过滤"
                v-model="filterText">
              </el-input>
              <el-tree
                class="filter-tree"
                :data="data"
                :props="defaultProps"
                accordion
                default-expand-all
                ref="tree"
                :filter-node-method="filterNode"
                @node-click="handleNodeClick">
              </el-tree>

            </el-container>

          </el-col>


        <el-col :span="16">

      <el-container>

        <el-header style="margin-bottom: 10px; left; font-size: 15px;background: (238, 241, 246)">
          <span style="font-weight: 1000;">部门列表</span>
        </el-header>

          <div style="display: flex;justify-content:space-between;margin-left: 10px;">
            <div>
              <el-button @click="openaddForm">新增</el-button>

              <el-dialog
                title="新增部门"
                :visible.sync="dialogVisible"
                width="30%"
                :before-close="handleClose">
                  <el-form ref="form" :model="addform" :rules="addrule" label-width="80px" :visible.sync="dialogVisible">
                    <el-form-item label="部门名称" prop="name">
                      <el-input v-model="addform.name"></el-input>
                    </el-form-item>
                    <el-form-item label="部门类型">
                     <el-select v-model="addform.type" placeholder="请选择">
                         <el-option
                           v-for="item in deptType"
                           :key="item.value"
                           :label="item.label"
                           :value="item.value">
                         </el-option>
                       </el-select>
                    </el-form-item>
                    <el-form-item label="上级部门">
                     <el-select v-model="addform.parent" placeholder="请选择">
                         <el-option
                           v-for="item in parents"
                           :key="item.iD"
                           :label="item.nAME"
                           :value="item.iD">
                         </el-option>
                       </el-select>
                    </el-form-item>
                  </el-form>

                  <center><span v-if="addMessage">确认信息完整</span></center>
                <span slot="footer" class="dialog-footer">
                  <el-button @click="dialogVisible = false">取 消</el-button>
                  <el-button type="primary" @click="submitAdd">确 定</el-button>
                </span>
              </el-dialog>

              <el-button @click="opendelForm">删除</el-button>
              <el-dialog
                title="删除部门"
                :visible.sync="dialogVisible2"
                width="30%"
                :before-close="handleClose">
                  <el-form ref="form" :model="delform" label-width="80px" :visible.sync="dialogVisible">
                    <el-form-item label="部门">
                     <el-select v-model="delform.id" placeholder="请选择">
                         <el-option
                           v-for="item in tableData"
                           :key="item.iD"
                           :label="item.nAME"
                           :value="item.iD">
                         </el-option>
                       </el-select>
                    </el-form-item>
                  </el-form>
                <span slot="footer" class="dialog-footer">
                  <el-button @click="dialogVisible2 = false">取 消</el-button>
                  <el-button type="primary" @click="submitDel">确 定</el-button>
                </span>
                <center>
                <span
                  v-if="delMessage&&child.length>1&&i>0"
                  v-for="(item,i) in child">
                   存在子部门： {{item.nAME}}<br>
                </span>
                <span
                  v-if="child.length==0||child.length==1">
                   存在员工<br>
                </span>
                </center>
              </el-dialog>
              <el-dialog
                title="修改信息"
                :visible.sync="dialogVisible3"
                width="30%"
                :before-close="handleClose">
                  <el-form ref="form" :model="updateform" :rules="updaterule" label-width="80px" :visible.sync="dialogVisible">

                    <el-form-item label="部门名称" prop="name">
                      <el-input v-model="updateform.name"></el-input>
                    </el-form-item>
                    <el-form-item label="部门类型">
                     <el-select v-model="updateform.type" placeholder="请选择">
                         <el-option
                           v-for="item in deptType"
                           :key="item.value"
                           :label="item.label"
                           :value="item.value">
                         </el-option>
                       </el-select>
                    </el-form-item>
                    <el-form-item label="上级部门">
                     <el-select v-model="updateform.parent" placeholder="请选择">
                         <el-option
                           v-for="item in parents"
                           :key="item.iD"
                           :label="item.nAME"
                           :value="item.iD">
                         </el-option>
                       </el-select>
                    </el-form-item>
                  </el-form>
                  <center><span v-if="updateMessage">确认信息完整</span></center>
                <span slot="footer" class="dialog-footer">
                  <el-button @click="dialogVisible3 = false">取 消</el-button>
                  <el-button type="primary" @click="submitUpdate">确 定</el-button>
                </span>
              </el-dialog>
            </div>
               <el-select
                  v-model="departmentName"
                  multiple
                  filterable
                  remote
                  reserve-keyword
                  placeholder="请输入名称"
                  :remote-method="remoteMethod"
                  :loading="loading">
                  <el-option
                    v-for="item in searchs"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
          </div>
        <el-table
            ref="multipleTable"
            :data="tableData"
            tooltip-effect="dark"
            style="width: 100%"
            header-row-class-name="center"
            @selection-change="handleSelectionChange">
            <el-table-column
                  label="编号"
                  type="index"
                  >
                </el-table-column>
            <el-table-column
              prop="cODE"
              label="编码"
               align="center"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="nAME"
              label="名称"
               align="center"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="tYPE"
              label="类型"
               align="center"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="parentName"
              label="上级部门"
               align="center"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              label="操作"
              align="center"
              width="120">
          <template slot-scope="scope">
            <el-button @click="openupdateForm(scope.row)" icon="el-icon-edit-outline" round></el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="tabListPage">
          <el-pagination @size-change="handleSizeChange"
      				  @current-change="handleCurrentChange"
      				  :current-page="currentPage"
      				  :page-sizes="pageSizes"
      				  :page-size="PageSize" layout="total, sizes, prev, pager, next, jumper"
      				  :total="totalCount"
      				  style="margin-top: 2.25rem;"
      				  >
      	</el-pagination>
      </div>

      </el-container>
      </el-col>
      </el-row>

  </div>

</template>

<script>
import $ from 'jquery'
export default {
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    }
  },
  name:'Main',
  data() {
      return {
        filterText: '',
        data: [{
          id: 1,
          label: '一级 1',
          children: [{
            id: 4,
            label: '二级 1-1',
            children: [{
              id: 9,
              label: '三级 1-1-1'
            }, {
              id: 10,
              label: '三级 1-1-2'
            }]
          }]
        }, {
          id: 2,
          label: '一级 2',
          children: [{
            id: 5,
            label: '二级 2-1'
          }, {
            id: 6,
            label: '二级 2-2'
          }]
        }, {
          id: 3,
          label: '一级 3',
          children: [{
            id: 7,
            label: '二级 3-1'
          }, {
            id: 8,
            label: '二级 3-2'
          }]
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        addrule:{
          name:[{
              required: true,
              message: '不能为空',
              trigger: 'blur'
              }
            ]

        },
        updaterule:{
          name:[{
              required: true,
              message: '不能为空',
              trigger: 'blur'
              }
            ]
        },
        deptType: [{
                  value: '机构',
                  label: '机构'
                }, {
                  value: '部门',
                  label: '部门'
                }],
        addform: {
                  name: '',
                  type: '',
                  parent: ''
                }
              ,
        delform:{
                  id:''
        },
        updateform:{
          iid:'',
          name:'',
          parent:'',
          type:''
        },
        parents:{},
        dialogVisible: false,
        dialogVisible2: false,
        dialogVisible3: false,
        currentPage:1,
                   // 总条数，根据接口获取数据长度(注意：这里不能为空)
        totalCount:1,
                   // 个数选择器（可修改）
        pageSizes:[1,2,3,4,5,6,7,8,9,10],
                   // 默认每页显示的条数（可修改）
        PageSize:5,
        tableData:{},
        child:{},
        delMessage:false,
        updateMessage:false,
        departmentName:'',
        searchs:[],
        currentDept:null
      }
    },
    mounted:function(){
      let that =this;
      $.getJSON('http://localhost:9000/department/tree',{},function(data){
        that.data = data;
      });
      this.loadData();
    },
    methods:{
      handleNodeClick(val) {
        let that = this;
           console.log(val.id);
            this.currentDept = val.id;
            this.loadData();
            },
      handleSizeChange(val) {
      	// 改变每页显示的条数;
          this.PageSize=val;
          // 注意：在改变每页显示的条数时，要将页码显示到第一页
          this.currentPage=1;
          this.loadData();
      },
      // 显示第几页
      handleCurrentChange(val) {
          // 改变默认的页数
          this.currentPage=val
          this.loadData();
      },
      handleSelectionChange(){

      },
      handleClose(done) {
              this.$confirm('确认关闭？')
                .then(_ => {
                  this.loadData();
                  done();
                })
                .catch(_ => {});
            },
      submitAdd(){

          let name = this.addform.name;
          let type = this.addform.type;
          let parentid = this.addform.parent
          let that =this;
          if(name.replace(/\s+/g,"")==""){
            name =null;
          }
          if(name!=null&&type!=null&&parentid!=null){
            $.getJSON('http://localhost:9000/department/add',{NAME:name,TYPE:type,PARENTID:parentid},function(data,stat){
              if(data == "done"){
                that.tableData = data;
              console.log(data)
              that.dialogVisible = false;
              $.getJSON('http://localhost:9000/department/tree',{},function(data){
                that.data = data;
              });
              that.loadData();
              that.addMessage = false;
              }else{
                console.log(data)
              }

          });
          }else {
           this.addMessage = true;
          }



      },
      openaddForm(){
        if(this.currentDept!=null){
          this.dialogVisible = true;
          this.addform.parent = this.currentDept;
          let that =this;
        $.getJSON('http://localhost:9000/department/getDepartments',{},function(data,stat){
          if(stat=="success"){
            that.parents = data;
            console.log(data)
          }else{
            console.log(data)
          }
        });
        }else{

        }

        console.log("-------------------------------------------")
      },
      loadData() {
          let that = this;
          console.log("-------------------------------------------")
          console.log(this.currentDept)
          if(this.currentDept==null){
            $.getJSON('http://localhost:9000/department/getDepartments',{},function(data,stat){
            if(stat=="success"){
              console.log("-------------------------------------------")
              console.log(data)

              that.tableData = data;
              that.totalCount = data.length
              let start = (that.currentPage-1)*that.PageSize;
              let end = that.currentPage*that.PageSize;

              that.tableData= that.tableData.slice(start,end)
            }else{
              console.log(data)
            }
          });
          }else{
            let that = this;
            $.getJSON('http://localhost:9000/department/getChilds',{id:this.currentDept},function(data){
              that.tableData = data;
              console.log(data);
              console.log(that.totalCount)
              that.totalCount = data.length
              let start = (that.currentPage-1)*that.PageSize;
              let end = that.currentPage*that.PageSize;

              that.tableData= that.tableData.slice(start,end)
            });
          }

      },
      opendelForm(){
        if(this.currentDept!=null){
          this.dialogVisible2 = true;
          this.delMessage=false;
          let that =this;
          $.getJSON('http://localhost:9000/department/getChilds',{id:this.currentDept},function(data,stat){
            if(stat=="success"){
              that.tableData = data;
              console.log(data)
            }else{
              console.log(data)
            }
          });
        }else{

        }

        console.log("-------------------------------------------")
      },
      submitDel(){

        let i = this.delform.id;
        let that =this
        console.log(i);
        $.getJSON('http://localhost:9000/department/del',{id:i},function(data,stat){
          if(data == "done"){

            console.log(data);
             that.dialogVisible2 = false;
             that.loadData();
          }else{
            console.log(data)
            that.child = data;
            that.delMessage = true;

          }
        });
      },
      openupdateForm(val){
        console.log(val)
       this.updateform.name=val.nAME;
        this.updateform.parent = val.pARENTID;
        this.updateform.type = val.tYPE;
          this.updateform.iid = val.iD;
         this.dialogVisible3 = true;
         let that =this;
        $.getJSON('http://localhost:9000/department/getDepartments',{},function(data,stat){
          if(stat=="success"){
            that.parents = data;
            console.log(data)
          }else{
            console.log(data)
          }
        });

      },
      submitUpdate(){
        let that = this;
        let name = this.updateform.name;
        console.log(name)
        let iid = this.updateform.iid;
         console.log(iid)
        let parent = this.updateform.parent;
         console.log(parent)
         let type = this.updateform.type;
          console.log(type)
          if(name.replace(/\s+/g,"")=="")
          {
           name =null;
          }
          if(iid!=null&&name!=null&&type!=null&&parent!=null){
        $.getJSON('http://localhost:9000/department/update',{ID:iid,NAME:name,TYPE:type,PARENTID:parent},function(data,stat){
          if(data == "done"){

            console.log("ok");
            that.dialogVisible3 = false;
            $.getJSON('http://localhost:9000/department/tree',{},function(data){
              that.data = data;
            });
            that.loadData();
            that.updateMessage = false;
          }else{
            console.log(data)

          }
        });}else{
          this.updateMessage = true;
        }
      },
      remoteMethod (query) {
            console.log(query)
            let that = this;
            if(this.currentDept==null){
              if (query !== '') {
              this.loading = true
              setTimeout(() => {
                $.getJSON('http://localhost:9000/department/search',{name:query},function(data,stat){
                  console.log(data)
                  that.tableData = data;
                 that.totalCount = data.length
                 let start = (that.currentPage-1)*that.PageSize;
                 let end = that.currentPage*that.PageSize;

                 that.tableData= that.tableData.slice(start,end)
                });
              }, 200)
            } else {
              this.loadData();
            }
            }else{
                if (query !== '') {
                  this.loading = true
                  setTimeout(() => {
                    $.getJSON('http://localhost:9000/department/search2',{name:query,id:that.currentDept},function(data,stat){
                      console.log(data)
                      that.tableData = data;
                      that.totalCount = data.length
                      let start = (that.currentPage-1)*that.PageSize;
                      let end = that.currentPage*that.PageSize;

                      that.tableData= that.tableData.slice(start,end)
                    });
                  }, 200)
                } else {
                  this.loadData();
                }
            }

          },
          filterNode(value, data) {
            if (!value) return true;
            return data.label.indexOf(value) !== -1;
          }

    }
  };

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
