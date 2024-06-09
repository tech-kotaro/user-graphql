<template>
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-sm-6">
                    <form>
                        <div class="form-group row border-bottom">
                            <label for="id" class="col-sm-3 col-form-label">ID</label>
                            <input type="text" class="col-sm-9 form-control-plaintext" readonly id="id"
                                v-model="task.id">
                        </div>
                        <div class="form-group row border-bottom">
                            <label for="title" class="col-sm-3 col-form-label">Title</label>
                            <input type="text" class="col-sm-9 form-control-plaintext" readonly id="title"
                                v-model="task.title">
                        </div>
                        <div class="form-group row border-bottom">
                            <label for="content" class="col-sm-3 col-form-label">Content</label>
                            <input type="text" class="col-sm-9 form-control-plaintext" readonly id="content"
                                v-model="task.content">
                        </div>
                        <div class="form-group row border-bottom">
                            <label for="person-in-charge" class="col-sm-3 col-form-label">Person In Charge</label>
                            <input type="text" class="col-sm-9 form-control-plaintext" readonly id="person-in-charge"
                                v-model="task.person_in_charge">
                        </div>
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
                    task: []
                }
            },
        methods: {
            getTask() {
                // axios.get('/api/tasks/' + this.taskId)
                //     .then((res) => {
                //         this.task = res.data;
                //     });
                var xhr = new XMLHttpRequest();
                    xhr.open('GET', 'http://localhost:8080/pokemongraphql/pokemongraphqllaravel/public/api/tasks/'+ this.taskId);
                    xhr.addEventListener("load", (event) => { // loadイベントを登録します。
                        // console.log(JSON.parse(this.response)); 
                        this.task = JSON.parse(event.target.response);
                        console.log(this.task);
                    }, false);
                    xhr.send();
            }
        },
        mounted() {
            this.getTask();
            }
        }
    </script>
