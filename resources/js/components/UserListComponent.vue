<template>
    <div class="container">
        <h2>ユーザー一覧</h2>
        <div>
            <input type="text" name="userName" placeholder="名前" v-model="userName">
            <input type="email" name="email"  placeholder="メールアドレス" v-model="email">
            <input type="password" name="password"  placeholder="パスワード" v-model="password">
            <button @click="onClickCreateUser">ユーザー作成</button>
        </div>
        <table class="table table-hover">
            <thead class="thead-light">
                <tr>
                    <th scope="col">id</th>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">created_at</th>
                    <th scope="col">updated_at</th>
                    <th scope="col">Posts</th>
                    <th scope="col">Delete</th>
                    <th scope="col">EDIT</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(user, index) in users" :key="index">
                    <th scope="row">{{ user.id }}</th>
                    <td>{{ user.name }}</td>
                    <td>{{ user.email }}</td>
                    <td>{{ user.created_at }}</td>
                    <td>{{ user.updated_at }}</td>
                    <td>
                        <template v-if="user.posts && user.posts.length > 0">
                            <span v-for="(post, index) in user.posts" :key="index">
                                {{ post.id }}
                                <!-- もしくは、post.title などの適切なプロパティを表示 -->
                                <br v-if="index !== user.posts.length - 1">
                            </span>
                        </template>
                        <template v-else>
                            No posts
                        </template>
                    </td>
                    <td>
                        <button @click="onClickDeleteUser(user.id)">DELETE</button>
                    </td>
                    <td>
                        <router-link v-bind:to="{name: 'users.edit', params: {userId: user.id }}">
                            <button class="btn btn-success">Edit {{ user.id }}</button>
                        </router-link>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    import gql from 'graphql-tag'

    export default {
        data: function () {
            return {
                users: [],
                id:0,
                userName:'',
                email:'',
                password:'',
            }
        },
        methods: {
            onClickCreateUser() {
                const variables = {
                    userName: this.userName,
                    email: this.email,
                    password: this.password,
                };
                console.log('Query variables:', variables); 

                this.$apollo.mutate({
                    mutation: gql`
                        mutation createUserMutation ($userName: String!,$email: String!,$password: String!) {
                            createUser(
                                name: $userName
                                email: $email
                                password: $password
                            ) {
                                id
                                name
                                email
                            }
                        }
                    `,
                    variables
                }).then(({ data }) => {
                    // ミューテーションが成功した後にApolloクエリを再実行
                    this.$apollo.queries.users.refetch();
                    console.log(data);
                }).catch(error => {
                console.error('Error fetching users:', error);
                });
            },
            onClickDeleteUser(id) {
                const variables = {
                    id: id
                };
                console.log('Query variables:', variables); 

                this.$apollo.mutate({
                    mutation: gql`
                        mutation deleteUserMutation ($id: ID!) {
                            deleteUser(
                                id: $id
                            ) {
                                id
                            }
                        }
                    `,
                    variables
                }).then(({ data }) => {
                    // ミューテーションが成功した後にApolloクエリを再実行
                    console.log(data);
                    this.$apollo.queries.users.refetch();
                }).catch(error => {
                    console.error('Error fetching users:', error);
                });
            }
        },
        apollo: {
                users: gql`
                    query {
                        users{
                            id,
                            name,
                            email,
                            created_at
                            updated_at
                        }
                }`,
        },
        watch: {
            userName: function(newVal) {
                console.log(newVal);
            }
        },
    }
</script>
