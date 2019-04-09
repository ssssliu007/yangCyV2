import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/pages/home'
import courses from '@/components/pages/courses'
import activities from '@/components/pages/activities'
import tutors from '@/components/pages/tutors'
import companys from '@/components/pages/companys'
import join from '@/components/pages/join'
import login from '@/components/pages/login'

import courses_detail from '@/components/pages/secondary/course'
import activitie_detail from '@/components/pages/secondary/activitie'
import tutor_detail from '@/components/pages/secondary/tutor'
import company_detail from '@/components/pages/secondary/company'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'',
      redirect:'/home/'
    },
    {
      path: '/home/',
      name: 'home',
      component: home
    },
    {
      path: '/courses/',
      name: 'courses',
      component: courses,
    },
    {
      path: '/activities/',
      name: 'activities',
      component: activities,
    },
    {
      path: '/tutors/',
      name: 'tutors',
      component: tutors,
    },
    {
      path: '/companys/',
      name: 'companys',
      component: companys,
    },
    {
      path: '/join/',
      name: 'join',
      component: join,
    },
    {
      path: '/login/',
      name: 'login',
      component: login,
    },
    {
      path: '/courses/:id',
      name: 'courses_detail',
      component: courses_detail,
    },
    {
      path: '/activities/:id',
      name: 'activitie_detail',
      component: activitie_detail,
    },
    {
      path: '/tutors/:id',
      name: 'tutor_detail',
      component: tutor_detail,
    },
    {
      path: '/companys/:id',
      name: 'company_detail',
      component: company_detail,
    },
  ]
})
