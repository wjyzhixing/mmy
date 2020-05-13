<template>
  <div style="width: 100%;border-left: 2px solid #ccc;">



      <el-container>

        <el-header style="margin-bottom: 10px; left; font-size: 15px;background: (238, 241, 246)">
          <span style="font-weight: 1000;">合同列表</span>
        </el-header>

          <div style="display: flex;justify-content:space-between;margin-left: 10px;">
            <div>
              <el-button @click="openaddForm">新增</el-button>

              <el-dialog
                title="新增合同"
                :visible.sync="dialogVisible"
                width="70%"
                :before-close="handleClose">
                  <el-card class="box-card" >
                    <div slot="header" class="clearfix" style="text-align: center;">
                      <span>新建合同</span>
                    </div>
                    <div class="demo-input-suffix" style="margin: 20px;">
                      <el-form :model="addform" status-icon :rules="addrules" ref="addform" label-width="100px" class="demo-ruleForm">
                        <el-form-item label="合同名称" prop="name">
                          <el-input
                                      placeholder="请输入内容"
                                      v-model="addform.name"
                                      clearable>
                                    </el-input>
                        </el-form-item>

                        <el-form-item label="合同金额" prop="price">
                          <el-input
                                      placeholder="请输入内容"
                                      v-model="addform.price"
                                      clearable
                                      oninput="value=value.replace(/[^0-9.]/g,'')">
                                    </el-input>
                        </el-form-item>

                        <el-form-item label="合同类型" prop="type">
                         <el-select v-model="addform.type" placeholder="请选择">
                                     <el-option
                                       v-for="item in options"
                                       :key="item.value"
                                       :label="item.label"
                                       :value="item.value">
                                     </el-option>
                                   </el-select>
                        </el-form-item>

                        <el-form-item label="签订部门" prop="deptid">
                          <el-select v-model="addform.deptid" placeholder="请选择" @change="selectChange">
                              <el-option
                                v-for="item in depts"
                                :key="item.iD"
                                :label="item.nAME"
                                :value="item.iD">
                              </el-option>
                            </el-select>
                        </el-form-item>

                        <el-form-item label="签订人" prop="userid">
                          <el-select v-model="addform.userid" placeholder="请选择">
                              <el-option
                                v-for="item in staffs"
                                :key="item.iD"
                                :label="item.nAME"
                                :value="item.iD">
                              </el-option>
                            </el-select>
                        </el-form-item>

                        <el-form-item label="签订产品" prop="productname">
                          <el-input
                                      placeholder="请输入内容"
                                      v-model="addform.productname"
                                      clearable>
                                    </el-input>
                           </el-form-item>

                           <el-form-item label="合同描述" prop="desc">
                             <el-input
                                         placeholder="请输入内容"
                                         v-model="addform.desc"
                                         clearable>
                                       </el-input>
                              </el-form-item>

                      </el-form>

                    </div>

                  </el-card>
                  <center>
                  <span
                    v-if="addMessage">
                    确认信息完整
                    <br>
                  </span>
                  </center>
                <span slot="footer" class="dialog-footer">
                  <el-button @click="dialogVisible = false">取 消</el-button>
                  <el-button type="primary" @click="submitAdd">确 定</el-button>
                </span>

              </el-dialog>

              <el-button @click="opendelForm">删除</el-button>
              <el-dialog
                title="删除合同"
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
                     <el-select v-model="delform.user" placeholder="请选择" @change="selectChange2">
                         <el-option
                           v-for="item in staffs"
                           :key="item.iD"
                           :label="item.nAME"
                           :value="item.iD">
                         </el-option>
                       </el-select>
                    </el-form-item>

                    <el-form-item label="合同">
                     <el-select v-model="delform.contract" placeholder="请选择">
                         <el-option
                           v-for="item in contracts"
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
                   确认信息完整
                </span>
                </center>
              </el-dialog>
              <el-dialog
                title="修改信息"
                :visible.sync="dialogVisible3"
                width="70%"
                :before-close="handleClose">
                  <el-card class="box-card" >
                    <div slot="header" class="clearfix" style="text-align: center;">
                      <span>修改合同</span>
                    </div>
                    <div class="demo-input-suffix" style="margin: 20px;">
                      <el-form :model="updateform" status-icon :rules="updaterules" ref="updateform" label-width="100px" class="demo-ruleForm">
                        <el-form-item label="合同名称" prop="name">
                          <el-input
                                      placeholder="请输入内容"
                                      v-model="updateform.name"
                                      clearable>
                                    </el-input>
                        </el-form-item>
                        <el-form-item label="合同金额" prop="price">
                          <el-input
                                      placeholder="请输入内容"
                                      v-model="updateform.price"
                                      clearable >
                                    </el-input>
                        </el-form-item>

                        <el-form-item label="合同类型" prop="type">
                          <el-select v-model="updateform.type" placeholder="请选择">
                                      <el-option
                                        v-for="item in options"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                      </el-option>
                                    </el-select>
                        </el-form-item>

                        <el-form-item label="签订部门" prop="deptid">
                          <el-select v-model="updateform.deptid" placeholder="请选择" @change="selectChange">
                              <el-option
                                v-for="item in depts"
                                :key="item.iD"
                                :label="item.nAME"
                                :value="item.iD">
                              </el-option>
                            </el-select>
                        </el-form-item>


                        <el-form-item label="签订人" prop="userid">
                          <el-select v-model="updateform.userid" placeholder="请选择">
                              <el-option
                                v-for="item in staffs"
                                :key="item.iD"
                                :label="item.nAME"
                                :value="item.iD">
                              </el-option>
                            </el-select>

                        </el-form-item>

                        <el-form-item label="签订产品" prop="productname">
                          <el-input
                                      placeholder="请输入内容"
                                      v-model="updateform.productname"
                                      clearable>
                                    </el-input>

                        </el-form-item>

                        <el-form-item label="合同描述" prop="desc">
                          <el-input
                                      placeholder="请输入内容"
                                      v-model="updateform.desc"
                                      clearable>
                                    </el-input>

                        </el-form-item>

                        </el-form>



                    </div>

                  </el-card>
                  <center>
                  <span v-if="updateMessage"> 确认信息完整</span>
                  </center>
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
            @row-click="onRowClick"
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
  </div>

</template>

<script>
import $ from 'jquery'
export default {
  name:'Main',
  data() {
    const validateMoney = (rule,value,callback) =>{
            if(!value){
                callback(new Error('金额不能为空'))
             }else if(value.split('.').length > 2){
                callback(new Error('输入正确格式的金额')) //防止输入多个小数点
             }else{
                value = Math.round(value * Math.pow(10,2)) / Math.pow(10,2) //四舍五入
                value = Number(value).toFixed(2); //不足补位
                this.addform.price = value;
                callback();
                }
    };

      return {
        addMessage:false,
        addResult:{},
        addrules:{
          name:[{
             required: true, message: '不能为空', trigger: 'blur'
          }],
          price:[
            {
               required: true, message: '不能为空', trigger: 'blur'
            },
            {
              validator: validateMoney, trigger: 'blur'
          }],
           productname:[{
             required: true, message: '不能为空', trigger: 'blur'
           }],
           desc:[{
            required: true, message: '不能为空', trigger: 'blur'
           }]
        },
        updaterules:{
          name:[{
             required: true, message: '不能为空', trigger: 'blur'
          }],
          price:[
            {
               required: true, message: '不能为空', trigger: 'blur'
            },
            {
              validator: validateMoney, trigger: 'blur'
          }],
           productname:[{
             required: true, message: '不能为空', trigger: 'blur'
           }],
           desc:[{
            required: true, message: '不能为空', trigger: 'blur'
           }]
        },
        addform: {
                  name: '',
                  price:'',
                  userid:'',
                  deptid: '',
                  productname:'',
                  desc:''
                }
              ,
        delform:{
                  dept:'',
                  user:'',
                  contract:''
        },
        updateform:{
          iid:'',
          name:'',
          price:'',
          userid:'',
          deptid:'',
          productname:'',
          desc:'',
          type:''
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
        childs:{},
        delMessage:false,
        updateMessage:false,
        staffName:'',
        searchs:[],
        staffs:[],
        contracts:[],
        loading:false,
        options:[
          {
          lable:'制造',
          value:'制造'
          },
          {
          lable:'电网',
          value:'电网'
          },
          {
          value:'工业互联网',
          lable:'工业互联网'
          },
          {
          lable:'金融',
          value:'金融'
          }]
      }
    },
    mounted:function(){
      this.loadData();
    },
    methods:{
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
          console.log(this.addform)
          let name = this.addform.name;
          let price = this.addform.price;
          let type = this.addform.type;
          let userid = this.addform.userid;
          let deptid = this.addform.deptid;
          let productname = this.addform.productname;
          let desc = this.addform.desc;
          let that =this;
          if(name.replace(/\s+/g,"") == ""){
            name =null;
          }
          if(productname.replace(/\s+/g,"") == ""){
            productname =null;
          }
          if(desc.replace(/\s+/g,"") == ""){
            desc =null;
          }
          if(name!=null&&price!=null&&type!=null&&userid!=null&&deptid!=null&&productname!=null&&desc!==null){

          $.getJSON('http://localhost:9000/contract/add',{NAME:name,PRICE:price,TYPE:type,USERID:userid,DEPTID:deptid,PRODUCTNAME:productname,DESCRIPTION:desc},function(data,stat){
            if(data == "done"){
              that.dialogVisible = false;
              that.addMessage=false;
              that.loadData();
            }
          });
          }else{
            this.addMessage=true;
          }




      },
      openaddForm(){
        this.dialogVisible = true;
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
      loadData() {
          let that = this;
          $.getJSON('http://localhost:9000/contract/getContracts',{},function(data,stat){
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
      },
      opendelForm(){
        this.dialogVisible2 = true;
        this.delMessage=false;
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
      submitDel(){

        let i = this.delform.contract;
        let that =this
        console.log(i);
        if(i == null||i == ""){
          this.delMessage =true;
        }
        else {
          $.getJSON('http://localhost:9000/contract/del',{id:i},function(data,stat){
          if(data == "done"){

            console.log(data);
            that.delMessage=false;
             that.dialogVisible2 = false;
             that.loadData();
          }else{
            that.child = data;
            that.delMessage = true;

          }
        });
        }

      },
      openupdateForm(val){
        console.log(val)

        console.log(this.updateform.deptid)
        console.log(this.updateform.userid)
        this.updateform.deptid=val.dEPTID
         this.selectChange(val.dEPTID)
        this.updateform.userid=val.uSERID
        this.updateform.iid=val.iD;
       this.updateform.name=val.nAME;
        this.updateform.price=val.pRICE;
       this.updateform.productname=val.pRODUCTNAME;
       this.updateform.desc=val.dESCRIPTION
       this.updateform.type=val.tYPE
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
        let iid=this.updateform.iid
        let name=this.updateform.name
        let price=this.updateform.price
        let productname=this.updateform.productname
        let desc=this.updateform.desc
        let type=this.updateform.type
        let userid = this.updateform.userid
        let deptid = this.updateform.deptid
        if(name.replace(/\s+/g,"") == ""){
          name =null;
        }
        if(productname.replace(/\s+/g,"") == ""){
          productname =null;
        }
        if(desc.replace(/\s+/g,"") == ""){
          desc =null;
        }
        if(iid!=null&&name!=null&&price!=null&&type!=null&&userid!=null&&deptid!=null&&productname!=null&&desc!==null){
          $.getJSON('http://localhost:9000/contract/update',{ID:iid,NAME:name,PRICE:price,TYPE:type,USERID:userid,DEPTID:deptid,PRODUCTNAME:productname,DESCRIPTION:desc},function(data,stat){
              if(data == 'done'){
                that.dialogVisible3 = false;
                that.loadData();
                that.updateMessage=false;
              }
          });
          }else{
                this.updateMessage =true;
          }

      },
      remoteMethod (query) {
            console.log(query)
            let that = this;
            if (query !== '') {
              this.loading = true
              setTimeout(() => {
                $.getJSON('http://localhost:9000/contract/search',{name:query},function(data,stat){
                  console.log(data)
                  that.tableData = data;
                });
              }, 200)
            } else {
              this.loadData();
            }
          },
          selectChange(val){
            console.log(val);
            let that=this;
            $.getJSON('http://localhost:9000/staff/getByDeptId',{id:val},function(data,stat){
                if(stat == "success"){
                  that.staffs = data;
                  console.log(data)
                  that.addform.userid = null

                  that.delform.user = null

                }
            });

          },
          selectChange2(val){
            console.log(val);
            let that=this;
            console.log(val)
            $.getJSON('http://localhost:9000/contract/getByUserId',{userid:val},function(data,stat){
                if(stat == "success"){
                  that.contracts = data;
                  console.log(data)
                  that.delform.contract =null
                }
            });
          },
          onRowClick(row, event, column){

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
