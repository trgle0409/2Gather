import { createRouter, createWebHistory } from 'vue-router'
import Veranstaltungen from '../views/Veranstaltungen.vue'
import MessageView from '../views/MessageView.vue'
import CatchUp from '../views/CatchUp.vue'
import Profil from '../views/Profil.vue'
import Login from '../views/LoginView.vue'
import Chat from '../views/ChatView.vue'



const router = createRouter({
    history: createWebHistory(
        import.meta.env.BASE_URL),
    routes: [{
            path: '/',
            name: "login",
            component: Login
        },
        {
            path: '/Veranstaltungen',
            name: 'veranstaltungen',
            component: Veranstaltungen
        },
        {
            path: '/chat',
            name: 'chat',
            component: MessageView
        }, {
            path: '/catchup',
            name: 'catchup',
            component: CatchUp
        },
        {
            path: '/profil',
            name: 'profil',
            component: Profil
        },
        {
            path: '/chatWith',
            name: 'chatWith',
            component: Chat
        },
    ]
})

export default router