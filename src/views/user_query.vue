<template>
    <div class="main">
        <navnav></navnav>
        <div class="main-title"><h4>查询用户</h4></div>
        <div class="main-query">
            <div class="main-input" style="width: 60%;float: left">
                <label for="userid">按用户名搜索：</label>
                <input type="text" id="userid" v-model="userid">
            </div>
            <div class="main-input" style="width: 40%;float: left">
                <label></label>
                <button @click="search">查询</button>
            </div>
        </div>
        <div class="table">
            <div class="table-h4">
                <h4 style="width: 40%;">用户名</h4>
                <h4 style="width: 40%;">密码</h4>
                <h4 style="width: 20%;">操作</h4>
            </div>
            <div class="table-p">
                <div class="tr" v-for="(time,index) in userdata" :key="index">
                    <div class="td" style="width: 40%;">{{time.userid}}</div>
                    <div class="td" style="width: 40%;">{{time.password}}</div>
                    <div class="td" style="width: 20%;"><button @click="userdelete(time._id)">删除</button></div>
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
            userdata:'',
            pagingnum:'',
            userid:''
        }
    },
    mounted(){
        axios.get('http://39.108.13.166:3000/userfind',{
            params:{
                num:0,
                userid:this.userid
            }
        }).then((data)=>{
            this.userdata=data.data
        }).catch(()=>{
            this.reload()
        })
        axios.get('http://39.108.13.166:3000/usernum',{
            params:{
                userid:this.userid
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
            axios.get('http://39.108.13.166:3000/userfind',{
                params:{
                    num:data,
                    userid:this.userid
                }
            }).then((data)=>{
                this.userdata=data.data
            }).catch(()=>{
                this.reload()
            })
        },
        userdelete(data){
            let o= confirm('是否删除???');
            if(o){
                axios.get('http://39.108.13.166:3000/userdelete',{
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
            axios.get('http://39.108.13.166:3000/userfind',{
                params:{
                    num:0,
                    userid:this.userid
                }
            }).then((data)=>{
                this.userdata=data.data
            }).catch(()=>{
                this.reload()
            })
            axios.get('http://39.108.13.166:3000/usernum',{
                params:{
                    userid:this.userid
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
