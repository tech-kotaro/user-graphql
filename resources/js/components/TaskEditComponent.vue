<template>
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-sm-6">
                    <form>
                        <div class="form-group row">
                            <label for="id" class="col-sm-3 col-form-label">ID</label>
                            <input type="text" class="col-sm-9 form-control-plaintext" readonly id="id" v-model="task.id">
                        </div>
                        <div class="form-group row">
                            <label for="title" class="col-sm-3 col-form-label">Title</label>
                            <input type="text" class="col-sm-9 form-control" id="title" v-model="task.title">
                        </div>
                        <div class="form-group row">
                            <label for="content" class="col-sm-3 col-form-label">Content</label>
                            <input type="text" class="col-sm-9 form-control" id="content" v-model="task.content">
                        </div>
                        <div class="form-group row">
                            <label for="person-in-charge" class="col-sm-3 col-form-label">Person In Charge</label>
                            <input type="text" class="col-sm-9 form-control" id="person-in-charge" v-model="task.person_in_charge">
                        </div>
                        <button type="submit" class="btn btn-primary" @click="update">UPDATE</button>
                    </form>
                </div>
            </div>
        </div>
    </template>
    
    <script>
        export default {
            props: {
                taskId: {
                    type: Number,
                    required: true
                }
            },
            data: function () {
                return {
                    task: {}
                }
            },
            methods: {
                getTask() {
                    var xhr = new XMLHttpRequest();
                    xhr.open('GET', 'http://localhost:8888/pokemongraphql/pokemongraphqllaravel/public/api/tasks/'+ this.taskId);
                    xhr.addEventListener("load", (event) => { // loadイベントを登録します。
                        // console.log(JSON.parse(this.response)); 
                        this.task = JSON.parse(event.target.response);
                        console.log(this.task);
                    }, false);
                    xhr.send();
                },
                update() {
                    var xhr = new XMLHttpRequest();
                    xhr.open('PUT', 'http://localhost:8888/pokemongraphql/pokemongraphqllaravel/public/api/tasks/'+ this.taskId);
                    xhr.setRequestHeader('Content-Type', 'application/json');
                    xhr.addEventListener("load", (event) => { // loadイベントを登録します。
                        // console.log(JSON.parse(this.response)); 
                        this.task = JSON.parse(event.target.response);
                        console.log(this.task);
                        this.$router.push({name: 'task.list'})
                    }, false);
                    xhr.send(JSON.stringify(this.task));
                }
            },
            mounted() {
                this.getTask();
            }

        }
    </script>
    
    <style>
        form{
            margin-top: 2rem;
        }
    </style>