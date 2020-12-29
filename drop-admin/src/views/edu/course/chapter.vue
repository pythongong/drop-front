<template>
  <div class="app-container">
    <h2 style="text-align: center;">发布新课程</h2>
    <el-steps :active="2" process-status="wait" align-center style="margin-
bottom: 40px;">
      <el-step title="填写课程基本信息"/>
      <el-step title="创建课程大纲"/>
      <el-step title="提交审核"/>
    </el-steps>


   <el-button type="text" @click="openChapterDialog">添加章节</el-button>

    <el-form label-width="120px">

      <el-form-item>
        <el-button @click="previous">上一步</el-button>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="next">下一步</el-button>
      </el-form-item>

    </el-form>

    <el-dialog :visible.sync="dialogChapterFormVisible" title="章节">
      <el-form :model="chapter" label-width="120px">
        <el-form-item label="章节标题">
            <el-input v-model="chapter.title"/>
        </el-form-item>
        <el-form-item label="章节排序">
            <el-input-number v-model="chapter.sort" :min="0" controlsposition="right"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogChapterFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveOrUpdate">确 定</el-button>
      </div>
    </el-dialog> 


    <el-dialog :visible.sync="dialogVideoFormVisible" title="课时">
      <el-form :model="video" label-width="120px">

        <el-form-item label="课时标题">
          <el-input v-model="video.title" placeholder=""></el-input>
        </el-form-item>

        <el-form-item label="课时排序">
          <el-input v-model="video.sort" placeholder="" :min="0" controlsposition="right"></el-input>
        </el-form-item>

        <el-form-item label="上传视频">
         <el-upload
           :on-success="handleVodUploadSuccess"
           :on-remove="handleVodRemove"
           :before-remove="beforeVodRemove"
           :on-exceed="handleUploadExceed"
           :file-list="fileList"
           :action="BASE_API+'/service-vod/video/upload'"
           :limit="1"
           class="upload-demo">

          <el-button size="small" type="primary">上传视频</el-button>

          <el-tooltip placement="right-end">
            <div slot="content">最大支持1G，<br>
            支持3GP、ASF、AVI、DAT、DV、FLV、F4V、<br>
            GIF、M2T、M4V、MJ2、MJPEG、MKV、MOV、MP4、<br>
            MPE、MPG、MPEG、MTS、OGG、QT、RM、RMVB、<br>
            SWF、TS、VOB、WMV、WEBM 等视频格式上传</div>

          <i class="el-icon-question"/>
       </el-tooltip>

      </el-upload>
     </el-form-item>

        <el-form-item label="是否免费">
          <el-radio-group v-model="video.isFree">
            <el-radio label=0>免费</el-radio>
            <el-radio label=1>收费</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVideoFormVisible=false">取消</el-button>
        <el-button type="primary" @click="saveOrUpdateVideo">确认</el-button>
      </div>
      
    </el-dialog>



    <ul class="chapterList">
      <li v-for="chapter in chapterList" :key="chapter.id">
         <p>
            {{ chapter.title }}
            <span class="acts">
              <el-button type="text" @click="openVideoDialog(chapter.id)">添加课时</el-button>
                <el-button style="" type="text" @click="openEditChapter(chapter.id)">编辑</el-button>
                <el-button type="text" @click="removeChapter(chapter.id)">删除</el-button>
            </span>
        </p>

      <ul>
        <li v-for="video in chapter.videos" :key="video.id">
          <p>{{ video.title }}
              <span class="acts">
                   <el-button type="text" @click="openEditVideo(chapter.id,video.id)">编辑</el-button>
                   <el-button type="text" @click="removeVideo(video.id)">删除</el-button>
              </span>
          </p>
        </li>
      </ul>
   
      </li>
    </ul>

    
  </div>
</template>


<script>
import chapterApi from '@/api/edu/chapter'

import videoApi from '@/api/edu/video'

const defaultChapter = {
  title:"",
  sort:0
}

const defaultVideo = {
  title:"",
  sort:0,
  isFree:0,
  videoSourceId:"",
  videoOriginalName: ""
}
export default {
  data() {
    return {
      saveBtnDisabled: false, // 保存按钮是否禁用
      saveVideoBtnDisabled: false,
      courseId:"",
      chapterId:"",
      chapterList: [],
      fileList: [],
      dialogChapterFormVisible: false,
      dialogVideoFormVisible: false,
      chapter: defaultChapter,
      video: defaultVideo,
      BASE_API: process.env.BASE_API,
    }
  },


  created() {
    console.log('chapter created')
    this.init()
    },


  methods: {

    init(){
      if(this.$route.params && this.$route.params.id){
        this.courseId =  this.$route.params.id
        this.getAllChapters()
      }
      
    },

    previous() {
      console.log('previous')
      this.$router.push({ path: '/course/info/' + this.courseId})
    },
    next() {
      console.log('next')
      this.$router.push({ path: '/course/publish/'+this.courseId })
    },

    handleVodUploadSuccess(response, file, fileList){
    this.video.videoSourceId = response.data.videoId
    this.video.videoOriginalName = file.name
  },

   handleUploadExceed(file, fileList) {
  this.$message.warning('想要重新上传视频，请先删除已上传的视频')
 },

  beforeVodRemove(file, fileList) {
   return this.$confirm(`确定移除 ${file.name}？`)
 },
  handleVodRemove(file, fileList) {
   videoApi.deleteVod(this.video.videoSourceId)
   .then(response=>{
    this.$message({
      type: 'success',
      message: response.message
    });
    this.fileList=[]
    this.video.videoSourceId=''
    this.video.videoOriginalName=''
  })},
    
    getAllChapters(){
      chapterApi.getAll(this.courseId)
      .then(
        response => {
          if(response.success == true){
            this.chapterList = response.data.chapterList
          }
        }
      )
    },

    openChapterDialog(){
      this.dialogChapterFormVisible=true
      this.clearChapter()
    },

    openEditChapter(id){
      this.dialogChapterFormVisible=true
      chapterApi.get(id)
      .then(
        response => {
          if(response.success == true){
            this.chapter = response.data.chapter
            
          }
        }
      )
      this.clearChapter()
    },

    clearChapter(){
      this.chapter.title=''
      this.chapter.sort=0
    },

    saveOrUpdate(){
      this.saveBtnDisabled=true
      if(this.chapter.id){
        this.updateChapter()
      }
      else{
        this.saveChapter()
      }
    },

    saveChapter(){
      this.chapter.courseId = this.courseId
      chapterApi.save(this.chapter)
      .then(response => {//添加成功
          //提示信息
          this.$message({
              type: 'success',
              message: '添加章节成功!'
          });
          //关闭弹框
          this.dialogChapterFormVisible=false
          this.saveBtnDisabled=false
          //刷新页面
          this.getAllChapters()
        })
    },

    updateChapter(){
      chapterApi.update(this.chapter)
      .then(response => {
          //提示信息
          this.$message({
              type: 'success',
              message: '修改章节成功!'
          });
          //关闭弹框
          this.dialogChapterFormVisible=false
          //刷新页面
          this.getAllChapters()
        })
    
    },

    removeChapter(id){
           this.$confirm('此操作将永久删除章节, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {  //点击确定，执行then方法
                //调用删除的方法
                chapterApi.delete(id)
                    .then(response =>{//删除成功
                    //提示信息
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    //回到列表页面
                    this.getAllChapters()
                })
            })
    },

    saveOrUpdateVideo(){
      this.saveVideoBtnDisabled=true
      if(! this.video.id){
        this.saveVideo()
      }
      else this.updateVideo()
    },

    saveVideo(){
      this.video.courseId = this.courseId
      videoApi.save(this.video)
      .then(
        response => {
          this.$message({
            type: 'success',
            message:"添加课时成功"
          });
          this.dialogVideoFormVisible=false
          this.saveBtnDisabled=false
          this.clearVideo()
          this.getAllChapters()
          
        }
      )
    },

    updateVideo(){
      this.video.courseId = this.courseId
      videoApi.update(this.video)
      .then(
        response => {
          this.$message({
            type: 'success',
            message:"修改课时成功"
          });
          this.dialogVideoFormVisible=false
          this.saveBtnDisabled=false
          this.clearVideo()
          this.getAllChapters()
        }
      )
    },

    removeVideo(id){
          this.$confirm('此操作将永久删除课时, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {  //点击确定，执行then方法
                //调用删除的方法
                videoApi.delete(id)
                    .then(response =>{//删除成功
                    //提示信息
                     this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                     this.video.videoSourceId=''
                     this.video.videoOriginalName=''
                     this.fileList=''
                    //回到列表页面
                    this.getAllChapters()
                })
            })      
    },

    openEditVideo(chapterId, videoId){
      this.dialogVideoFormVisible=true
      this.video.chapterId=chapterId
      this.video.id=videoId
      videoApi.get(videoId)
      .then(
        response => {
          if(response.success == true){
            this.video = response.data.video
          }
        }
      )
      this.clearVideo()
      

    },

    openVideoDialog(chapterId){
      this.video.chapterId=chapterId
      this.dialogVideoFormVisible=true

      this.clearVideo()
    },

    clearVideo(){
      this.video.title=''
      this.video.sort=0
      this.video.videoSourceId=''
      this.video.videoOriginalName=''
      this.fileList=[]
    }
  
 }
}
</script>