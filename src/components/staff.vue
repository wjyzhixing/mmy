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
        <el-col :span="16"><div class="grid-content bg-purple-light">
        <el-container>

                <el-header style="margin-bottom: 10px; left; font-size: 15px;background: (238, 241, 246)">
                  <span style="font-weight: 1000;">人员列表</span>
                </el-header>

                  <div style="display: flex;justify-content:space-between;margin-left: 10px;">
                    <div>
                      <el-button @click="openaddForm">新增</el-button>

                      <el-dialog
                        title="新增人员"
                        :visible.sync="dialogVisible"
                        width="30%"
                        :before-close="handleClose">
                          <el-form ref="form" :model="addform"  label-width="80px" :rules="addrule" :visible.sync="dialogVisible">
                            <el-form-item label="人员名称" prop="name">
                              <el-input v-model="addform.name"></el-input>
                            </el-form-item>
                            <el-form-item label="所属部门">
                             <el-select v-model="addform.dept" placeholder="请选择">
                                 <el-option
                                   v-for="item in depts"
                                   :key="item.iD"
                                   :label="item.nAME"
                                   :value="item.iD">
                                 </el-option>
                               </el-select>
                            </el-form-item>
                          </el-form>
                           <center><span v-if="addMessage">确认信息完整</span></center>
                        <span slot="footer" class="dialog-footer">
                          <el-button @click="dialogVisible = false;">取 消</el-button>
                          <el-button type="primary" @click="submitAdd">确 定</el-button>
                        </span>
                      </el-dialog>

                      <el-button @click="opendelForm">删除</el-button>
                      <el-dialog
                        title="删除人员"
                        :visible.sync="dialogVisible2"
                        width="30%"
                        :before-close="handleClose">
                          <el-form ref="form" :model="delform" label-width="80px" :visible.sync="dialogVisible">
                            <el-form-item label="部门">
                             <el-select v-model="delform.dept" placeholder="请选择" @change="selectChange">
                                 <el-option
                                   v-for="item in depts"
                                   :key="item.iD"
                                   :label="item.nAME"
                                   :value="item.iD">
                                 </el-option>
                               </el-select>
                            </el-form-item>
                            <el-form-item label="人员">
                             <el-select v-model="delform.id" placeholder="请选择">
                                 <el-option
                                   v-for="item in staffs"
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
                          v-if="delMessage">
                          确认信息完整<br>
                        </span>
                        <span
                          v-if="delMessage2" v-for="item in child">
                          存在{{item.nAME}}<br>
                        </span>
                        </center>
                      </el-dialog>
                      <el-dialog
                        title="修改信息"
                        :visible.sync="dialogVisible3"
                        width="30%"
                        :before-close="handleClose">
                          <el-form ref="form" :model="updateform" :rules="updaterule" label-width="80px" :visible.sync="dialogVisible3">
                            </el-form-item>
                            <el-form-item label="人员名称" prop="name">
                              <el-input v-model="updateform.name"></el-input>
                            </el-form-item>

        <!--

        <el-form-item label="选择部门">
                            <el-select v-model="updateform.dept" placeholder="请选择" @change="selectChange">
                                <el-option
                                  v-for="item in depts"
                                  :key="item.iD"
                                  :label="item.nAME"
                                  :value="item.iD">
                                </el-option>
                              </el-select>
                           </el-form-item>

                            <el-form-item label="选择人员">
                             <el-select v-model="updateform.iid" placeholder="请选择">
                                 <el-option
                                   v-for="item in staffs"
                                   :key="item.iD"
                                   :label="item.nAME"
                                   :value="item.iD">
                                 </el-option>
                               </el-select>

                            </el-form-item>
                            <el-form-item label="人员名称">
                              <el-input v-model="updateform.name"></el-input>
                            </el-form-item>
                            -->
                            <el-form-item label="所属部门" prop="newdept">
                             <el-select v-model="updateform.newdept" placeholder="请选择">
                                 <el-option
                                   v-for="item in depts"
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
                          v-model="staffName"
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
                      prop="deptName"
                      label="所属部门"
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




        </div></el-col>
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
        addform: {
                  name: '',
                  dept: ''
                }
              ,
        delform:{
                  id:'',
                  dept:''
        },
        updateform:{
          iid:'',
          name:'',
          dept:'',
          newdept:''
        },
        depts:{},
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
        delMessage2:false,
        staffName:'',
        searchs:[],
        staffs:[],
        loading:false,
        addMessage:false,
        updateMessgae:false,
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
      	// 改变每页显示的条数
          this.PageSize=val
          // 注意：在改变每页显示的条数时，要将页码显示到第一页
          this.currentPage=1

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
          //let deptid = this.addform.dept
          let deptid = this.currentDept
          let that =this;
          if(name.replace(/\s+/g,"")==""){
            name =null;
          }
          if(name!=null&&deptid!=null){
            $.getJSON('http://localhost:9000/staff/add',{NAME:name,DEPTID:deptid},function(data,stat){
                          if(data == "done"){
                            that.tableData = data;
                          console.log(data)
                          that.dialogVisible = false;
                          that.loadData();
                          that.addMessage = false;
                          }else{
                            console.log(data)
                          }

                      });
          }else{
            this.addMessage = true;
          }




      },
      openaddForm(){
        if(this.currentDept!=null){
          this.dialogVisible = true;
          this.addform.dept = this.currentDept;
          let that =this;
          $.getJSON('http://localhost:9000/department/getDepartments',{},function(data,stat){
            if(stat=="success"){
              that.depts = data;
              console.log(data)
            }else{
              console.log(data)
            }
          });
        }

        console.log("-------------------------------------------")
      },
      loadData() {
          let that = this;
          if(this.currentDept==null){
            $.getJSON('http://localhost:9000/staff/getStaffs',{},function(data,stat){
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
           $.getJSON('http://localhost:9000/staff/getByDeptId',{id:this.currentDept},function(data){
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
        this.delform.dept = this.currentDept;
        this.selectChange(this.currentDept);
        let that =this;
        $.getJSON('http://localhost:9000/department/getDepartments',{},function(data,stat){
          if(stat=="success"){
            that.depts = data;
            console.log(data)
          }else{
            console.log(data)
          }
        });
        }else {

        }

        console.log("-------------------------------------------")
      },
      submitDel(){

        let i = this.delform.id;
        let that =this
        console.log(i);
        if(i == null){
          this.delMessage = true;
        }else{



        $.getJSON('http://localhost:9000/staff/del',{id:i},function(data,stat){
          if(data == "done"){

            console.log(data);
             that.dialogVisible2 = false;
             that.loadData();
             that.delMessage=false;
          }else{
            that.child = data;
            that.delMessage2 = true;

          }
        });
        }
      },
      openupdateForm(val){
        this.updateform.name=val.nAME;
        this.updateform.dept = val.dEPTID;
        this.updateform.type = val.tYPE;
        this.updateform.newdept = val.dEPTID;
        this.updateform.iid = val.iD;
        this.dialogVisible3 = true;
        let that =this;
        $.getJSON('http://localhost:9000/department/getDepartments',{},function(data,stat){
          if(stat=="success"){
            that.depts = data;
            console.log(data)
          }else{
            console.log(data)
          }
        });
        console.log("-------------------------------------------")

      },
      submitUpdate(){
        let that = this;
        let name = this.updateform.name;
        console.log(name)
        let iid = this.updateform.iid;
         console.log(iid)
        let dept = this.updateform.dept;
         console.log(dept)
         let newdept = this.updateform.newdept;
          console.log(newdept)
          if(name.replace(/\s+/g,"")==""){
            name = null;
          }
          if(iid!=null&&name!=null&&newdept!=null){
            $.getJSON('http://localhost:9000/staff/update',{ID:iid,NAME:name,DEPTID:newdept},function(data,stat){
              if(data == 'done'){
                that.dialogVisible3 = false;
                that.loadData();
                that.updateMessage = false;
              }
          });
          }else{
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
                $.getJSON('http://localhost:9000/staff/search',{name:query},function(data,stat){
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
                  $.getJSON('http://localhost:9000/staff/search2',{name:query,id:that.currentDept},function(data,stat){
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
          selectChange(val){
            console.log(val);
            let that=this;
            $.getJSON('http://localhost:9000/staff/getByDeptId',{id:val},function(data,stat){
                if(stat == "success"){
                  that.staffs = data;
                  that.delform.id = null;
                }
            });
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
