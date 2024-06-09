import './bootstrap';
import { createApp } from 'vue';
const app = createApp({});

import { createRouter, createWebHistory } from 'vue-router';
import ExampleComponent from './components/ExampleComponent.vue';
import HeaderComponent from './components/HeaderComponent.vue';
import TaskListComponent from "./components/TaskListComponent.vue";
import TaskShowComponent from "./components/TaskShowComponent.vue";
import TaskCreateComponent from "./components/TaskCreateComponent.vue";
import TaskEditComponent from "./components/TaskEditComponent.vue";
import PokemonComponent from "./components/PokemonComponent.vue";
import PokemonShowComponent from "./components/PokemonShowComponent.vue";
import PokemonSearchComponent from "./components/PokemonSearchComponent.vue";
import UserListComponent from "./components/UserListComponent.vue";
import UserEditComponent from "./components/UserEditComponent.vue";
import apolloProvider from './apollo-client-other.js';

app.component('example-component', ExampleComponent);
app.component('header-component', HeaderComponent);

const router = createRouter({
    history: createWebHistory('/user-graphql/public/'),
    routes: [
        {
            path: '/tasks',
            name: 'task.list',
            component: TaskListComponent
        },
         {
            path: '/tasks/create',
            name: 'task.create',
            component: TaskCreateComponent
        },
        {
            path: '/tasks/:taskId',
            name: 'task.show',
            component: TaskShowComponent,
            props: true
        },
        {
            path: '/tasks/:taskId/edit',
            name: 'task.edit',
            component: TaskEditComponent,
            props: true
        },
        {
            path: '/pokemon',
            name: 'pokemon.list',
            component: PokemonComponent,
            props: true
        },
        {
            path: '/pokemon/:pokemonName',
            name: 'pokemon.show',
            component: PokemonShowComponent,
            props: true
        },
        {
            path: '/pokemon-search',
            name: 'pokemon.search',
            component: PokemonSearchComponent,
            props: true
        },
        {
            path: '/users',
            name: 'users.list',
            component: UserListComponent
        },
        {
            path: '/users/:userId/edit',
            name: 'users.edit',
            component: UserEditComponent,
            props: true
        },
    ]
});
app.use(router); 
app.use(apolloProvider);
app.mount('#app');





