<template>
    <div class="main">
        <navnav></navnav>
        <div class="main-title"><h4>增加博文</h4></div>
        <div class="main-input">
            <label for="title">博文标题：</label>
            <input type="text" id="title" v-model="titletxt">
            <label for="select">博文类型：</label>
            <select id="select" v-model="typetxt">
                <option v-for="(time,index) in typedata" :key="index" :value="time.typename">{{time.typename}}</option>
            </select>
        </div>
        <div class="main-input">
            <label for="file">博文介绍图片：</label>
            <label class="btn" for="file">上传图片</label>
            <input type="file" name="file" id="file" @change="changeimg">
            <img :src="srcimg" alt="没有选取图片，建议200+120px的图片">
        </div>
        <div class="main-input">
            <label for="introduce" >博文介绍：</label>
            <textarea id="introduce" v-model="introduce"></textarea>
        </div>
        <div class="main-input">
            <label for="content">博文内容：</label>
            <div id="editorElem" style="text-align:left;display: inline-block;max-width:1000px;"></div>
        </div>
        <div class="main-input">
            <label></label>
            <button @click="increase">增加</button>
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
            srcimg:''
        }
    },
    mounted(){
        axios.get('http://39.108.13.166:3000/typeallfind')
        .then((data)=>{
            this.typedata=data.data;
        }).catch(()=>{
            this.reload()
        })
        var editor = new E('#editorElem')
        editor.customConfig.onchange = (html) => {
          this.content = html;
        }
        editor.customConfig.uploadImgShowBase64 = true;
        editor.create()

        if(!sessionStorage.adminid){
            this.$router.push('/');
        }

    },
    components:{
        navnav
    },
    methods:{
        increase(){
            if(this.titletxt!=''&&this.typetxt!=''&&this.introduce!=''&&this.content!=''){
                axios.post('http://39.108.13.166:3000/articleadd',{
                    title:this.titletxt,
                    type:this.typetxt,
                    introduce:this.introduce,
                    content:this.content,
                    srcimg:this.srcimg
                }).then((data)=>{
                    if(data.data){
                        this.$router.push('/Article_query');
                    }
                }).catch(()=>{
                    console.log('获取失败！')
                })
            }else{
                 alert('请填上所有的信息，不能留空！')
            }
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
.btn{
    padding: 5px 20px;
    font-size: 14px;
    text-align: center;
    cursor: pointer;
    border-radius: 4px;
    border:1px solid #DCDFE6;
    color: #555;
    width: auto !important;
}
.btn:hover{
    background-color: #DCDFE6;
    color: #409EFF;
}
input[type=file]{
    position: fixed;
    left: -10000px;
}
.main-input img{
    margin-left: 50px;
    min-height: 50px;
}
</style>

