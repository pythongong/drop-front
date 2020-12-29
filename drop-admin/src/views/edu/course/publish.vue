<template>
  <div class="app-container">
    <h2 style="text-align: center;">发布新课程</h2>
    <el-steps :active="3" process-status="wait" align-center style="margin-
bottom: 40px;">
      <el-step title="填写课程基本信息"/>
      <el-step title="创建课程大纲"/>
      <el-step title="提交审核"/>
    </el-steps>


     <div class="ccInfo">
      <img :src="publishInfo.cover">
      <div class="main">
        <h2>{{ publishInfo.title }}</h2>
        <p class="gray"><span>共{{ publishInfo.lessonNum }}课时</span></p>
        <p><span>所属分类：{{ publishInfo.firstSubject }} — {{ publishInfo.secondSubject }}</span></p>
        <p>课程描述：<textarea name="description" cols="40">{{publishInfo.description}}</textarea></p>
        <p>课程讲师：{{ publishInfo.name }}</p>
        <h3 class="red">￥{{ publishInfo.price }}</h3>
      </div>
    </div>


    <div>
      <el-button @click="previous">返回修改</el-button>
      <el-button :disabled="saveBtnDisabled" type="primary" @click="publish">发布课程</el-button>
    </div>
  </div>
</template>


<script>

import courseApi from '@/api/edu/course'

export default {
  data() {
    return {
      saveBtnDisabled: false, // 保存按钮是否禁用
      courseId: "",
      publishInfo: {}
    }
    },
  created() {
    console.log('publish created')
    this.init()
    
  },
  methods: {
    previous() {
      console.log('previous')
      this.$router.push({ path: '/course/info/'+this.courseId })
    },
    publish() {
      console.log('publish')
      courseApi.publish(this.courseId)
      .then(response => {
        this.$message({
              type: 'success',
              message: '发布课程成功!'
          });
        this.$router.push({ path: '/course/list'})
      })
      
    },

    getPublisInfor(){
      courseApi.getPublisInfor(this.courseId)
      .then(
        response => {
          if(response.success == true){
            this.publishInfo = response.data.publishInfo
          }
        }
      )
    },

    init(){
      if(this.$route.params && this.$route.params.id){
        this.courseId = this.$route.params.id
        this.getPublisInfor()
    
      }
    }
  }
}
</script>

<!--margin-left是给左边的照片预留的大小-->
<style scoped>

.ccInfo {
    background: #f5f5f5;
    padding: 20px;
    overflow: hidden;
    border: 1px dashed #DDD;
    margin-bottom: 4px;
    position: relative;
}
.ccInfo img {
    background: #d6d6d6;
    width: 200px;
    height: 300px;
    display: block;
    float: left;
    border: none;
}
.ccInfo .main {
  margin-left: 250px;
}
.ccInfo .main h2 {
    font-size: 28px;
    margin-bottom: 1px;
    line-height: 24px;
    font-weight: normal;
  
}
.ccInfo .main p {
    margin-bottom: 1px;
    word-wrap: break-word;
    line-height: 24px;
    max-height: 48px;
    overflow: hidden;
}
.ccInfo .main p {
    margin-bottom: 10px;
    word-wrap: break-word;
    line-height: 24px;
    max-height: 100px;
    overflow: hidden;
}
.ccInfo .main h3 {
    left: 270px;
    bottom: 2px;
    line-height: 24px;
    font-size: 20px;
    color: #d32f24;
    font-weight: normal;
    position: absolute;
}
</style>