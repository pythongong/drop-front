<template>
  <div class="app-container">
    <h2 style="text-align: center;">发布新课程</h2>
    <el-steps :active="1" process-status="wait" align-center style="margin-bottom: 40px;">
      <el-step title="填写课程基本信息"/>
      <el-step title="创建课程大纲"/>
      <el-step title="提交审核"/>
    </el-steps>

    <el-form label-width="120px">

        <el-form-item label="课程标题">
            <el-input v-model="courseInfo.title" placeholder=" 示例：机器学习项目课：从基础到搭建项目视"/>
        </el-form-item>
  
        <el-form-item label="课程类别">
          <el-select v-model="courseInfo.subjectParentId" placeholder="请选择" @change="getSecondSubjects">
            <el-option
               v-for="subject in firstSubjectList"
               :key="subject.id"
               :label="subject.title"
               :value="subject.id"/> 
          </el-select>

          <el-select v-model="courseInfo.subjectId" placeholder="请选择">
            <el-option
               v-for="subject in secondSubjectList"
               :key="subject.value"
               :label="subject.title"
               :value="subject.id"/>
          </el-select>
        </el-form-item>
        
        <el-form-item label="课程讲师">
          <el-select v-model="courseInfo.teacherId" placeholder="请选择">
            <el-option
               v-for="teacher in teacherList"
               :key="teacher.id"
               :label="teacher.name"
               :value="teacher.id"/> 
          </el-select>
        </el-form-item>
        
        <el-form-item label="总课时">
            <el-input-number :min="0" v-model="courseInfo.lessonNum" controls-position="right" placeholder="课时数"/>
        </el-form-item>
  
        <el-form-item label="课程简介">
            <tinymce :height="300" v-model="courseInfo.description"/>
        </el-form-item>
  
        <el-form-item label="课程封面">
          <el-upload
             :show-file-list="false"
             :on-success="handleAvatarSuccess"
             :before-upload="beforeAvatarUpload"
             :action="BASE_API+'/service-oss/file/cover'"
            class="avatar-uploader">
            <img :src="courseInfo.cover">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg文件，且不超过2MB</div>
           </el-upload>
        </el-form-item>
        
        <el-form-item label="课程价格">
            <el-input-number :min="0" v-model="courseInfo.price" controls-position="right" placeholdrt="1000.0"/>
        </el-form-item>

        <el-form-item>
            <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate">保存并下一步</el-button>
        </el-form-item>

    </el-form>

  </div>
</template>


<script>

const defaultForm = {
  title: '',
  subjectId: '',
  subjectParentId: '',
  teacherId: '',
  lessonNum: 0,
  description: '',
  cover: '',
  price: 0
}

import course from '@/api/edu/course'

import teacher from '@/api/edu/teacher'

import subject from '@/api/edu/subject'

import Tinymce from '@/components/Tinymce'

export default {
  components:{
    Tinymce
  },
  data() {
    return {
      saveBtnDisabled: false, // 保存按钮是否禁用
      courseInfo: defaultForm,
      courseId: "",
      BASE_API: process.env.BASE_API,
      teacherList: [],
      firstSubjectList: [],
      secondSubjectList: []
    }
  },


  created() {
      console.log('info created')
      
      this.init()
  },


  methods: {
     init(){
      if(this.$route.params && this.$route.params.id){
        this.courseId =  this.$route.params.id
        this.getCourseById()
      }
      else{
        this.getAllTeachers()
        this.getFirstSubjects()
      }
     },

     saveOrUpdate(){
       if(this.courseId){
         this.updateCourse()
       }
       else{
         this.addCourse()
       }
     },

     getCourseById(){
       course.getCourseById(this.courseId)
        .then(
        response => {
           if(response.success == true){
             this.courseInfo = response.data.courseInfo
             subject.getAllSubjects()
             .then(
               response => {
               if(response.success == true){
                this.firstSubjectList = response.data.list
                for(let i=0; i < this.firstSubjectList.length; i++){
                if(this.firstSubjectList[i].id == this.courseInfo.subjectParentId){
                 this.secondSubjectList = this.firstSubjectList[i].children
                }
 
               }
               this.getAllTeachers()
             }
             })
           .catch(
             (response) => {
             this.$message({
             type: 'error',
             message: response.message
           })
          }
         )

        }
        })
        .catch(
        (response) => {
          this.$message({
            type: 'error',
            message: response.message
          })
        }
      )
    },

    updateCourse(){
      course.updateCourse(this.courseInfo)
      .then(
        response =>{
          if(response.success == true){
            this.$message(
              {
                type: 'success',
                message: '修改成功'
              }
            );
            this.$router.push({path:'/course/chapter/'+this.courseId})
          }
        }
      )
      .catch(
        (response) => {
          this.$message({
            type: 'error',
            message: response.message
          })
        }
      )
    },

    next() {
      console.log('next')
      this.saveBtnDisabled=true
      this.add()
    },

    addCourse(){
      course.addCourse(this.courseInfo)
      .then(
        response =>{
          if(response.success == true){
            this.$message(
              {
                type: 'success',
                message: '添加成功'
              }
            );
            this.$router.push({path:'/course/chapter/'+response.data.courseId})
          }
        }
      )
      .catch(
        (response) => {
          this.$message({
            type: 'error',
            message: response.message
          })
        }
      )
    },

    getAllTeachers(){
      teacher.getAllTeachers()
      .then(
        response => {
           if(response.success == true){
             this.teacherList = response.data.items
           }
        })
        .catch(
        (response) => {
          this.$message({
            type: 'error',
            message: response.message
          })
        }
      )
    },
    
    getFirstSubjects(){
      subject.getAllSubjects()
      .then(
        response => {
           if(response.success == true){
             this.firstSubjectList = response.data.list
           }
        })
        .catch(
        (response) => {
          this.$message({
            type: 'error',
            message: response.message
          })
        }
      )
      },
  
    getSecondSubjects(value){
      for(let i=0; i < this.firstSubjectList.length; i++){
        if(this.firstSubjectList[i].id == value){
          this.secondSubjectList = this.firstSubjectList[i].children
          //清空
          this.courseInfo.subjectId = ''
        }
      }
    },

    //上传成功后，接受传回来的url
    handleAvatarSuccess(res, file) {
       console.log(res)// 上传响应
       console.log(URL.createObjectURL(file.raw))// base64编码
       this.courseInfo.cover = res.data.url
    },

    //上传之前需要规定文件格式、大小
    beforeAvatarUpload(file) {
       const isJPG = file.type === 'image/jpeg'
       const isLt2M = file.size / 1024 / 1024 < 2
       if (!isJPG) {
         this.$message.error('上传头像图片只能是 JPG 格式!')
      }
       if (!isLt2M) {
         this.$message.error('上传头像图片大小不能超过 2MB!')
      }
       return isJPG && isLt2M
    }
   }
  }


</script>

<style scoped>
.tinymce-container {
  line-height: 29px;
}
</style>