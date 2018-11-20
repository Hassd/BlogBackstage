<template>
    <nav>
        <div>
            <h1>Hassd</h1>
            <h3>博客系统</h3>
        </div>
        <ul>
            <li><h3 class="h3">博文表</h3></li>
            <li><router-link to="/Article_query">查询博文</router-link></li>
            <li><router-link to="/Article_add">增加博文</router-link></li>
            <li><h3>类型表</h3></li>
            <li><router-link to="/type_query">查询类型</router-link></li>
            <li><router-link to="/type_add">增加类型</router-link></li>
            <li><h3>用户表</h3></li>
            <li><router-link to="/user_query">用户查询</router-link></li>
            <li><h3>评论表</h3></li>
            <li><router-link to="/comment_query">评论查询</router-link></li>
            <li><h3>回复表</h3></li>
            <li><router-link to="/reply_query">回复查询</router-link></li>
        </ul>
    </nav>
</template>
