import Vue from 'vue'
import Router from 'vue-router'
import index from './views/index.vue'

Vue.use(Router)
// 默认模式为 hash
export default new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/Article_query',
      name: 'Article_query',
      component: () => import('./views/Article_query.vue')
    },
    {
      path: '/Article_add',
      name: 'Article_add',
      component: () => import('./views/Article_add.vue')
    },
    {
      path: '/Article_update',
      name: 'Article_update',
      component: () => import('./views/Article_update.vue')
    },
    {
      path: '/type_query',
      name: 'type_query',
      component: () => import('./views/type_query.vue')
    },
    {
      path: '/type_add',
      name: 'type_add',
      component: () => import('./views/type_add.vue')
    },
    {
      path: '/type_update',
      name: 'type_update',
      component: () => import('./views/type_update.vue')
    },
    {
      path: '/user_query',
      name: 'user_query',
      component: () => import('./views/user_query.vue')
    },
    {
      path: '/comment_query',
      name: 'comment_query',
      component: () => import('./views/comment_query.vue')
    },
    {
      path: '/reply_query',
      name: 'reply_query',
      component: () => import('./views/reply_query.vue')
    },
    {
      path: '*',
      component: () => import('./views/error.vue')
    }
  ]
})
