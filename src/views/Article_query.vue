<template>
    <div class="main">
        <navnav></navnav>
        <div class="main-title"><h4>查询博文</h4></div>
        <div class="main-query">
            <div class="main-input" style="width: 20%;float: left">
                <label for="type">博文类型：</label>
                <select v-model="typetxt" >
                    <option value="">无</option>
                    <option v-for="(time,index) in typedata" :key="index" :value="time.typename">{{time.typename}}</option>
                </select>
            </div>
            <div class="main-input" style="width: 30%;float: left">
                <label for="title">博文标题：</label>
                <input type="text" v-model="titletxt">
            </div>
            <div class="main-input" style="width: 30%;float: left">
                <label for="time">时间：</label>
                <input type="text" v-model="timetxt">
            </div>
            <div class="main-input" style="width: 20%;float: left">
                <label></label>
                <button @click="search">查询</button>
            </div>
        </div>
        <div class="table">
            <div class="table-h4">
                <h4 style="width: 15%;">博文标题</h4>
                <h4 style="width: 10%;">博文类型</h4>
                <h4 style="width: 40%;">博文介绍</h4>
                <h4 style="width: 15%;">时间</h4>
                <h4 style="width: 10%;">点击量</h4>
                <h4 style="width: 10%;">操作</h4>
            </div>
            <div class="table-p">
                <div class="tr" v-for="(time,index) in articledata" :key="index">
                    <div class="td" style="width: 15%;text-align: left;">{{time.title}}</div>
                    <div class="td" style="width: 10%;">{{time.type}}</div>
                    <div class="td" style="width: 40%;text-align: left;">{{time.introduce}}</div>
                    <div class="td" style="width: 15%;">{{time.time}}</div>
                    <div class="td" style="width: 10%;">{{time.click}}</div>
                    <div class="td" style="width: 10%;"><router-link :to="{name:'Article_update',params:{id:time._id}}">修改</router-link>|<button @click="Articledelete(time._id,time.articleroute,time.srcimg)">删除</button></div>
                </div>
            </div>
        </div>
        <pagingion @change="paging" :edata="pagingnum"></pagingion>
    </div>
</template>

<script>
import navnav from '@/components/navnav.vue'
import pagingion from '@/components/pagingion.vue'
import axios from 'axios'
export default {
    inject:['reload'],
    data(){
        return{
            articledata:'',
            typedata:'',
            typetxt:'',
            titletxt:'',
            timetxt:'',
            pagingnum:''
        }
    },
    mounted(){
        axios.post('http://39.108.13.166:3000/articleallskip',{ //第一次显示的数据
            num:0,    
            title:this.titletxt,
            type:this.typetxt,
            time:this.timetxt
        }).then((data)=>{
            this.articledata=data.data;
        }).catch(()=>{
            this.reload()
        })

        axios.get('http://39.108.13.166:3000/typeallfind')      //全部类型
        .then((data)=>{
            this.typedata=data.data;
        }).catch(()=>{
            this.reload()
        })

        axios.get('http://39.108.13.166:3000/articleallnum',{   //一共有多少条数据
            params:{
                title:this.titletxt,
                type:this.typetxt,
                time:this.timetxt
            }
        }).then((data)=>{
            if(data.data%10){
                this.pagingnum=parseInt(data.data/10)+1;
            }else{
                this.pagingnum=parseInt(data.data/10);
            }
        }).catch(()=>{
            this.reload()
        })

        if(!sessionStorage.adminid){ 
            this.$router.push('/');
        }
    },
    components:{
        navnav,
        pagingion
    },
    methods:{
        search(){
            axios.post('http://39.108.13.166:3000/articleallskip',{
                num:0,
                title:this.titletxt,
                type:this.typetxt,
                time:this.timetxt
            }).then((data)=>{
                this.articledata=data.data;
            }).catch(()=>{
                this.reload()
            })
            axios.get('http://39.108.13.166:3000/articleallnum',{
                params:{
                    title:this.titletxt,
                    type:this.typetxt,
                    time:this.timetxt
                }
            }).then((data)=>{
                if(data.data%10){
                    this.pagingnum=parseInt(data.data/10)+1;
                }else{
                    this.pagingnum=parseInt(data.data/10);
                }
            }).catch(()=>{
                this.reload()
            })
        },
        paging(data){
            axios.post('http://39.108.13.166:3000/articleallskip',{
                num:data,
                title:this.titletxt,
                type:this.typetxt,
                time:this.timetxt
            }).then((data)=>{
                this.articledata=data.data;
            }).catch(()=>{
                this.reload()
            })
            
        },
        Articledelete(id,route,srcimg){             //删除文章
            let ttt='';
            let txtsrcimg='';
            if(srcimg){
                ttt=srcimg.split(":3000");
                txtsrcimg='./static'+ttt[1];
            }
            let o= confirm('是否删除???');
            if(o){
                axios.get('http://39.108.13.166:3000/articledelete',{
                    params:{
                        _id:id,
                        articleroute:route,
                        srcimg:txtsrcimg
                    }
                }).then((data)=>{
                    if(data.data){
                        this.reload()
                    }
                }).catch(()=>{
                    this.reload()
                })
            }
        }

    }
}
</script>
