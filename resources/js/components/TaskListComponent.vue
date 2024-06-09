<template>
        <div class="container">
            <table class="table table-hover">
                <thead class="thead-light">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Title</th>
                        <th scope="col">Content</th>
                        <th scope="col">Person In Charge</th>
                        <th scope="col">Show</th>
                        <th scope="col">Edit</th>
                        <th scope="col">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(task, index) in tasks" :key="index">
                        <th scope="row">{{ task.id }}</th>
                        <td>{{ task.title }}</td>
                        <td>{{ task.content }}</td>
                        <td>{{ task.person_in_charge }}</td>
                        <td>
                            <router-link v-bind:to="{name: 'task.show', params: {taskId: task.id }}">
                                <button class="btn btn-primary">Show</button>
                            </router-link>
                        </td>
                        <td>
                            <router-link v-bind:to="{name: 'task.edit', params: {taskId: task.id }}">
                                <button class="btn btn-success">Edit</button>
                            </router-link>
                        </td>
                        <td>
                            <button class="btn btn-danger" v-on:click="deleteTask(task.id)">Delete</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </template>
    
    <script>
        export default {
            data: function () {
                return {
                    tasks: []
                }
            },
            methods: {
                getTasks() {
                    // axios.get('/pokemongraphql/pokemongraphqllaravel/public/api/tasks')
                    //     .then((response) => {
                    //         this.tasks = response.data;
                    //     });

                    var xhr = new XMLHttpRequest();
                    xhr.open('GET', 'http://localhost:8080/pokemongraphql/pokemongraphqllaravel/public/api/tasks');
                    xhr.addEventListener("load", (event) => { // loadイベントを登録します。
                        // console.log(JSON.parse(this.response)); 
                        this.tasks = JSON.parse(event.target.response);
                        console.log(this.tasks);
                    }, false);
                    xhr.send();
                },
                deleteTask(id) {
                        // axios.delete('/api/tasks/' + id)
                        //     .then((res) => {
                        //         this.getTasks();
                        //     });
                        var xhr = new XMLHttpRequest();
                        xhr.open('DELETE', 'http://localhost:8080/pokemongraphql/pokemongraphqllaravel/public/api/tasks/'+id);
                        xhr.addEventListener("load", (event) => { // loadイベントを登録します。
                            // console.log(JSON.parse(this.response)); 
                            if (xhr.status >= 200 && xhr.status < 300) {
                                console.log('Task deleted successfully');
                                this.getTasks(); // タスクリストを更新
                            } else {
                                console.error('Error:', xhr.statusText);
                            }
                            // this.tasks = JSON.parse(event.target.response);
                            // console.log(this.tasks);
                        }, false);
                        xhr.send();
                    }    
                },
                mounted() {
                    this.getTasks();
                }
        }
    </script>
