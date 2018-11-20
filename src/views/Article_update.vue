<template>
    <div class="main">
        <navnav></navnav>
        <div class="main-title"><h4>修改博文</h4></div>
        <div class="main-input" style="width:50%;">
            <label for="title">博文标题：</label>
            <input type="text" id="title" v-model="titletxt">
            <label for="select">博文类型：</label>
            <select id="select" v-model="typetxt">
                <option v-for="(time,index) in typedata" :key="index" :value="time.typename">{{time.typename}}</option>
            </select>
        </div>
        <div class="main-input" style="width:100%;">
            <label for="file">博文介绍图片：</label>
            <label class="btn" for="file">上传图片</label>
            <input type="file" name="file" id="file" @change="changeimg">
            <img :src="srcimg" alt="没有选取图片，建议200+120px的图片">
        </div>
        <div class="main-input" style="width:100%;">
            <label for="introduce" >博文介绍：</label>
            <textarea id="introduce" v-model="introduce"></textarea>
        </div>
        <div class="main-input" style="width:100%;">
            <label for="content">博文内容：</label>
            <div id="editorElem" style="text-align:left;display: inline-block;width:90%;"></div>
        </div>
        <div class="main-input" style="width:100%;">
            <label></label>
            <button @click="modify">修改</button>
        </div>
    </div>
</template>

<script>
import navnav from '@/components/navnav.vue'
import E from 'wangeditor'
import axios from 'axios'

export default {
    inject:['reload'],
    data(){
        return{
            typedata:'',
            typetxt:'',
            titletxt:'',
            introduce:'',
            content:'',
            articleroute:'',
            srcimg:''
        }
    },
    mounted(){
        this.editor = new E('#editorElem');
       
        this.editor.customConfig.onchange = (html) => {
          this.content = html;
        }
        this.editor.customConfig.uploadImgShowBase64 = true;
        this.editor.create()

        axios.get('http://39.108.13.166:3000/typeallfind')
        .then((data)=>{
            this.typedata=data.data;
        }).catch(()=>{
            this.reload()
        })

        axios.post('http://39.108.13.166:3000/articlefindone',{
            _id:this.$route.params.id,
        }).then((data)=>{
            this.typetxt=data.data.type;
            this.titletxt=data.data.title;
            this.articleroute=data.data.articleroute;
            this.introduce=data.data.introduce;
            this.editor.txt.html(data.data.content);
            this.srcimg=data.data.srcimg;
            console.log(data.data)
        }).catch(()=>{
            this.reload()
        })
        if(!sessionStorage.adminid){
            this.$router.push('/');
        }
    },
    components:{
        navnav
    },
    methods:{
        modify(){
            axios.post('http://39.108.13.166:3000/articleup',{
                _id:this.$route.params.id,
                title:this.titletxt,
                type:this.typetxt,
                articleroute:this.articleroute,
                introduce:this.introduce,
                srcimg:this.srcimg,
                content:this.content
            }).then((data)=>{
                if(data.data){
                    this.$router.push('/Article_query');
                }
            }).catch(()=>{
                this.reload()
            })
        },
        changeimg(e){
            let formData = new FormData();
            formData.append('file',e.target.files[0]);
            let config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
            axios.post('http://39.108.13.166:3000/img',formData,config)
            .then((data)=>{
                this.srcimg='http://39.108.13.166:3000/'+data.data.filename;
            })
        }
    }
}
</script>

<style>

</style>
