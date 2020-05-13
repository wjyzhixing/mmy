import Vue from 'vue'
import Router from 'vue-router'

import Main from '../components/Main'
import staff from '../components/staff.vue'
import dept from '../components/department.vue'
import form from '../components/form.vue'

Vue.use(Router)

export default new Router({
	routes: [{
			path: '/',
			name: 'Main',
			component: Main
		},
    {
      path: '/staff',
      name: 'staff',
      component: staff
    },
    {
      path: '/dept',
      name: 'dept',
      component: dept
    },
    {
      path: '/form',
      name: 'form',
      component: form
    }
	]
})
