import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
    mode: 'history',
    scrollBehavior() {
        return {
            x: 0,
            y: 0
        }
    },
    base: process.env.BASE_URL,
    routes: [
        { path: '/healthCheck'},
        // ======================
        // Blank Layout
        // ======================    
        {
            path: '',
            component: () => import('./layout/blank/Blank.vue'),
            // ======================
            // Theme routes / pages
            // ======================
            children: [{
                path: '/',
                component: () => import('./views/authentication/Login.vue'), // 컨테이너
            }, {
                path: '/login',
                name: 'Login',
                index: 1,
                component: () => import('./views/authentication/Login.vue') // 로그인 페이지
            }, {
                path: '/error404',
                name: 'Error 404',
                index: 2,
                component: () => import('./views/authentication/Error404.vue') // 에러 페이지
            }, {
                path: '/register',
                name: 'Register',
                index: 3,
                component: () => import('./views/authentication/Register.vue') // 회원가입 페이지 ( SNS 로그인을 사용하기 때문에 현재는 사용하지 않음 )
            },
            {
                path: '/Terms',
                name: '개인정보취급방침',
                index: 7,
                component: () => import('./views/Terms.vue') // 프로필 페이지
            },
            {
                path: '/Terms2',
                name: '서비스이용약관',
                index: 8,
                component: () => import('./views/Terms2.vue') // 프로필 페이지
            }
            ]
        },
        {
            // ======================
            // Full Layout
            // ======================
            path: '',
            component: () => import('./layout/full/MainContainer.vue'), // 컨테이너
            // ======================
            // Theme routes / pages
            // ======================
            children: [
            {
                path: '/Status',
                // name: '현황 페이지',
                index: 1,
                component: () => import('./views/Status.vue') // 현황 페이지
            },
            {
                path: '/Template',
                // name: '프로젝트 생성',
                index: 1,
                component: () => import('./views/Template.vue') // 템플릿 페이지
            },
            {
                path: '/ProgressProject/',
                name: 'ProgressProject',
                index: 2,
                component: () => import('./views/ProgressProject.vue') // 진행중인 프로젝트 페이지
            },
            {
                path: '/ProgressProject/:id',
                // name: '참여자 정보',
                index: 2,
                component: () => import('./views/ProgressProject.vue') // 진행중인 프로젝트 페이지
            },
            {
                path: '/CompletedProject',
                name: 'CompletedProject',
                index: 3,
                component: () => import('./views/CompletedProject.vue') // 완료된 프로젝트 페이지
            },
            {
                path: '/profile',
                name: 'profile',
                index: 4,
                component: () => import('./views/profile.vue') // 프로필 페이지
            },
            {
                path: '/canvas',
                name: 'canvas',
                index: 5,
                children:[{
                    path: ':id',
                    name: 'canvas',
                    index: 6,
                    component: () => import('./views/Canvas.vue') // 캔버스 페이지      
                }],
                component: () => import('./views/Canvas.vue') // 캔버스 페이지
            },
            {
                path: '/apps/todo',
                name: '캔버스',
                index: 61,
                meta: {
                    breadcrumb: [{
                            title: 'Apps',
                            url: '/apps/todo'
                        },
                        {
                            title: '캔버스',
                            active: true
                        },
                    ],
                },
                component: () => import('./views/apps/todo/Todo.vue')
            }

            ]
        },
        // Redirect to 404 page, if no match found
        {
            path: '*',
            redirect: '/Error404'
        }
    ]
})

import NProgress from 'nprogress';

router.beforeResolve((to, from, next) => {
    // If this isn't an initial page load.
    if (to.name) {
        // Start the route progress bar.
        NProgress.start()
    }
    next()
})

router.afterEach(() => {
    // Complete the animation of the route progress bar.
    NProgress.done()
})
export default router