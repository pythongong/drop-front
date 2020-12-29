<template>
  <div class="app-container">
   <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="课程名称">
          <el-input v-model="courseQuery.name" placeholder="请输入课程名称"></el-input>
      </el-form-item>

      <el-form-item label="开始时间">
          <el-date-picker 
          v-model="courseQuery.begin" 
          placeholder="请选择开始时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          default-time="00:00:00"
          >

          </el-date-picker>
      </el-form-item>

      <el-form-item label="结束时间">
          <el-date-picker 
          v-model="courseQuery.end" 
          placeholder="请选择结束时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          default-time="00:00:00"
          >
              
          </el-date-picker>
      </el-form-item>
    </el-form>


    <el-table :data="courseList"
      border
      fit
      highlight-current-row>


      <el-table-column label="序号" width="70" align="center">
       <template slot-scope="scope">
         {{ (page - 1) * limit + scope.$index + 1 }}
       </template>
     </el-table-column>

     <el-table-column prop="title" label="课程名称"></el-table-column>
     

    <el-table-column prop="gmtCreate" label="添加时间" width="160"/>

    <el-table-column prop="gmtModified" label="添加时间" width="160"/>

    <el-table-column prop="lessonNum" label="课时" width="160"/>
      
    <el-table-column prop="status" label="发布信息" width="160">
      <template slot-scope="scope">
        {{scope.row.status == 'Normal' ? '已发布' : '未发布'}}
      </template>
    </el-table-column>
    
  <el-table-column label="价格" width="100" align="center" >
    <template slot-scope="scope">
      {{ Number(scope.row.price) === 0 ? '免费' :
      '¥' + scope.row.price.toFixed(2) }}
    </template>
  </el-table-column>

  <el-table-column prop="buyCount" label="付费学员" width="100" align="center" 
>
    <template slot-scope="scope">
      {{ scope.row.buyCount }}人
    </template>
  </el-table-column>

  <el-table-column label="操作" width="150" align="center">
    <template slot-scope="scope">
        
      <router-link :to="'/course/info/'+scope.row.id">
        <el-button type="text" size="mini" icon="el-icon-edit">编辑课程信息</el-button>
      </router-link>

      <router-link :to="'/course/chapter/'+scope.row.id">
        <el-button type="text" size="mini" icon="el-icon-edit">编辑课程大纲</el-button>
      </router-link>

      <el-button type="text" size="mini" icon="el-icon-delete" @click="removeCourse(scope.row.id)">删除</el-button>
    </template>
  </el-table-column>
    </el-table>

    <el-pagination 
    :total="total" 
    :current-page="page" 
    :page-size="limit" 
    @current-change="getAllCourses()"
    style="padding: 30px 0; text-align: center;" 
    layout="total, prev, pager, next, jumper">
    </el-pagination>
  
  </div>
    

</template>


<script>

import courseApi from '@/api/edu/course'

export default {
    data(){
     return{
        courseList: null,
        page:1,
        limit:10,
        total:0,
        courseQuery:{}
            }
    },

    created(){
        this.getAllCourses()
    },

    methods:{

      getAllCourses(){
        courseApi.getAllCourses()
        .then(response => {
            this.courseList = response.data.list
            this.total = response.data.total
            console.log(this.courseList)
        })
        },
      removeCourse(courseId){
        this.$confirm('此操作将永久删除课程, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
        }).then(() => {  //点击确定，执行then方法
                //调用删除的方法
            courseApi.delete(courseId)
            .then(response =>{//删除成功
                    //提示信息
                  this.$message({
                      type: 'success',
                      message: '删除成功!'
                  });
                    //回到列表页面
                  this.getAllCourses()
              })
          })
      }
    }
}
</script>


<style scoped>
.myClassList .info {
    width: 450px;
    overflow: hidden;
}
.myClassList .info .pic {
    width: 150px;
    height: 90px;
    overflow: hidden;
    float: left;
}
.myClassList .info .pic a {
    display: block;
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
}
.myClassList .info .pic img {
    display: block;
    width: 100%;
}
.myClassList td .info .title {
    width: 280px;
    float: right;
    height: 90px;
}
.myClassList td .info .title a {
    display: block;
    height: 48px;
    line-height: 24px;
    overflow: hidden;
    color: #00baf2;
    margin-bottom: 12px;
    }
.myClassList td .info .title p {
    line-height: 20px;
    margin-top: 5px;
    color: #818181;
}
</style>