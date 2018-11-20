<template>
    <div class="main">
        <navnav></navnav>
        <div class="main-title"><h4>查询评论</h4></div>
        <div class="main-query">
            <div class="main-input" style="width: 60%;float: left">
                <label for="text">按内容搜索：</label>
                <input type="text" id="text" v-model="comment">
            </div>
            <div class="main-input" style="width: 40%;float: left">
                <label></label>
                <button @click="search">查询</button>
            </div>
        </div>
        <div class="table">
            <div class="table-h4">
                <h4 style="width: 25%;">博文标题</h4>
                <h4 style="width: 15%;">用户名</h4>
                <h4 style="width: 35%;">内容</h4>
                <h4 style="width: 15%;">时间</h4>
                <h4 style="width: 10%;">操作</h4>
            </div>
            <div class="table-p">
                <div class="tr" v-for="(time,index) in commentdata" :key="index">
                    <div class="td" style="width: 25%;">{{time.title}}</div>
                    <div class="td" style="width: 15%;">{{time.userid}}</div>
                    <div class="td" style="width: 35%;text-align: left;">{{time.comment}}</div>
                    <div class="td" style="width: 15%;">{{time.time}}</div>
                    <div class="td" style="width: 10%;"><button @click="commentdelete(time._id)">删除</button></div>
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
            pagingnum:'',
            commentdata:'',
            comment:''
        }
    },
    mounted(){
        axios.get('http://39.108.13.166:3000/commentfind',{
            params:{
                num:0,
                comment:this.comment
            }
        }).then((data)=>{
            this.commentdata=data.data;
            console.log(data.data)
        }).catch(()=>{
            this.reload()
        })
        axios.get('http://39.108.13.166:3000/commentnum',{
            params:{
                comment:this.comment
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
        paging(data){
            axios.get('http://39.108.13.166:3000/commentfind',{
                params:{
                    num:data,
                    comment:this.comment
                }
            }).then((data)=>{
                this.commentdata=data.data;
            }).catch(()=>{
                this.reload()
            })
        },
        commentdelete(data){
            let o= confirm('是否删除???');
            if(o){
                axios.get('http://39.108.13.166:3000/commentdelete',{
                    params:{
                        _id:data
                    }
                }).then((data)=>{
                    if(data.data){
                        this.reload()
                    }
                }).catch(()=>{
                    this.reload()
                })
            }
        },
        search(){
            axios.get('http://39.108.13.166:3000/commentfind',{
                params:{
                    num:0,
                    comment:this.comment
                }
            }).then((data)=>{
                this.commentdata=data.data;
            }).catch(()=>{
                this.reload()
            })

            axios.get('http://39.108.13.166:3000/commentnum',{
                params:{
                    comment:this.comment
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
        }
    }
}
</script>

<style>

</style>
