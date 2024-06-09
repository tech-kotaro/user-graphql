<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-sm-6">
                <form v-on:submit.prevent="submit">
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
                    <button type="submit" class="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data: function () {
            return {
                task: {}
            }
        },
        methods: {
            submit() {
                var token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

                var xhr = new XMLHttpRequest();
                    xhr.open('POST', 'http://localhost:8080/pokemongraphql/pokemongraphqllaravel/public/api/tasks');
                    xhr.setRequestHeader('Content-Type', 'application/json');
                    xhr.setRequestHeader('X-CSRF-TOKEN', token);

                    xhr.addEventListener("load", (event) => { // loadイベントを登録します。
                        if (xhr.status >= 200 && xhr.status < 300) {
                            this.task = JSON.parse(event.target.response);
                            console.log(this.task);
                            // this.$router.push({ name: 'task.list' });
                            } else {
                            // リクエストが失敗した場合
                            console.error('Error:', xhr.statusText);
                            // 必要に応じてエラーメッセージを表示するなどの処理を行います
                        }
                    }, false);
                    console.log(token);
                    console.log('Sending data:', this.task);
                    xhr.send(JSON.stringify(this.task)); 
            }
        }
    }
</script>
