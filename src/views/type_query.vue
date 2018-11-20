<template>
    <div class="main">
        <navnav></navnav>
        <div class="main-title"><h4>类型查询</h4></div>
        <div class="main-query">
            <div class="main-input" style="width: 35%;float: left">
                <label for="select">哪个大类：</label>
                <select id="select" v-model="typeclass">
                    <option value ="">无</option>
                    <option value ="学习笔记">学习笔记</option>
                    <option value ="生活趣事">生活趣事</option>
                </select>
            </div>
            <div class="main-input" style="width: 40%;float: left">
                <label for="title">类型标题：</label>
                <input type="text" id="title" v-model="typename">
            </div>
            <div class="main-input" style="width: 25%;float: left">
                <label></label>
                <button @click="search">查询</button>
            </div>
        </div>
        <div class="table">
            <div class="table-h4">
                <h4 style="width: 15%;">类型标题</h4>
                <h4 style="width: 15%;">哪个大类</h4>
                <h4 style="width: 60%;">类型介绍</h4>
                <h4 style="width: 10%;">操作</h4>
            </div>
            <div class="table-p">
                <div class="tr" v-for="(time,index) in typedata" :key="index">
                    <div class="td" style="width: 15%;">{{time.typename}}</div>
                    <div class="td" style="width: 15%;">{{time.typeclass}}</div>
                    <div class="td" style="width: 60%;text-align: left;">{{time.typeintr}}</div>
                    <div class="td" style="width: 10%;"><router-link :to="{name:'type_update',params:{id:time._id}}">修改</router-link>|<button @click="typedelete(time._id)">删除</button></div>
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
            typedata:'',
            typeclass:'',
            typename:'',
            pagingnum:''
        }
    },
    mounted(){
        axios.get('http://39.108.13.166:3000/typeallskip',{
            params:{
                num:0,
                typename:this.typename,
                typeclass:this.typeclass
            }
        }).then((data)=>{
            this.typedata=data.data;
        }).catch(()=>{
            this.reload()
        })

        axios.get('http://39.108.13.166:3000/typeallnum',{
            params:{
                typename:this.typename,
                typeclass:this.typeclass
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
            axios.get('http://39.108.13.166:3000/typeallskip',{
                params:{
                    num:0,
                    typename:this.typename,
                    typeclass:this.typeclass
                }
            }).then((data)=>{
                this.typedata=data.data;
            }).catch(()=>{
                this.reload()
            })
            
            axios.get('http://39.108.13.166:3000/typeallnum',{
                params:{
                    typename:this.typename,
                    typeclass:this.typeclass
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
            axios.get('http://39.108.13.166:3000/typeallskip',{
                params:{
                    num:data,
                    typename:this.typename,
                    typeclass:this.typeclass
                }
            }).then((data)=>{
                this.typedata=data.data;
            }).catch(()=>{
                this.reload()
            })

            
        },
        typedelete(id){
            let o= confirm('是否删除???');
            if(o){
                axios.get('http://39.108.13.166:3000/typedelete',{
                    params:{
                        _id:id
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
