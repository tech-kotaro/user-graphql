<template>
    <div class="container">
        <p v-if="userId">User ID: {{ userId }}</p>
        <div class="row justify-content-center">
            <div class="col-sm-6">
                <button @click="onClickUpdateUser(editableAuthor.id,editableAuthor.name,editableAuthor.email)">UPDATE</button>
                <form v-if="editableAuthor">
                    <div class="form-group row border-bottom">
                        <label for="id" class="col-sm-3 col-form-label">Number</label>
                        <input type="text" class="col-sm-9 form-control-plaintext"  id="id"
                            v-model="editableAuthor.id">
                    </div>
                    <div class="form-group row border-bottom">
                        <label for="name" class="col-sm-3 col-form-label">Name</label>
                        <input type="text" class="col-sm-9 form-control-plaintext"  id="name"
                            v-model="editableAuthor.name">
                    </div>
                    <div class="form-group row border-bottom">
                        <label for="email" class="col-sm-3 col-form-label">Content</label>
                        <input type="text" class="col-sm-9 form-control-plaintext"  id="email"
                            v-model="editableAuthor.email">
                    </div>
                </form>
                <p v-else>Loading...</p>
                <div>
                        <router-link v-bind:to="{name: 'users.list'}">
                            <button class="btn btn-primary">ユーザー一覧へ</button>
                        </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import gql from 'graphql-tag'

    export default {
        props: {
            userId: {
                required: true,
                default:1,
            }
        },
        data: function () {
            return {
                author: null,
                editableAuthor: {},
                loading: true,
                error: null
            };
        },
        methods: {
            fetchData() {
                this.$apollo.query({
                    query: gql`
                        query getUser($id: ID!) {
                            user(id: $id) {
                                id
                                name
                                email
                                created_at
                            }
                        }
                    `,
                    variables: {
                        id: this.userId // `this.userId` はコンポーネントのプロパティ
                    }
                }).then(({ data }) => {
                    this.loading = false;
                    this.author = data.user;
                    this.editableAuthor = { ...data.user }; // スプレッド構文を使って独立したコピーを作成
                }).catch(error => {
                    this.loading = false;
                    this.error = error;
                    console.error('Apollo query error:', error);
                });
            },
            onClickUpdateUser(id, name, email) {
                if (!id || !name || !email) {
                    console.error('Invalid user data');
                    return;
                }

                const variables = {
                    id: id,
                    name:name,
                    email:email,
                };

                console.log('Query variables:', variables); 

                this.$apollo.mutate({
                    mutation: gql`
                            mutation updateUserMutation ($id: ID!, $name: String!, $email: String!) {
                                updateUser(
                                    id: $id,
                                    name: $name,
                                    email: $email
                                ) {
                                    id,
                                    name,
                                    email
                                }
                            }
                        `,
                        variables
                    // mutation: gql`
                    //         mutation {
                    //             updateUser(
                    //                 id: 8,
                    //                 name: "土方歳三",
                    //                 email: "sss@gmail.com"
                    //             ) {
                    //                 id,
                    //                 name,
                    //                 email
                    //             }
                    //         }
                    //     `
                }).then(({ data }) => {
                    // ミューテーションが成功した後にApolloクエリを再実行
                    console.log(data);
                    // this.$apollo.queries.user.refetch();
                }).catch(error => {
                    console.error('Error fetching users:', error);
                });
            },
        },
        apollo: {
                user: {
                    query: gql`
                            query getUser($id: ID!) {
                                user(id: $id) {
                                    id
                                    name
                                    email
                                    created_at
                                }
                            }
                        `,
                        variables() {
                            return {
                                id: this.userId // `this.userId` はコンポーネントのプロパティ
                            };
                        },
                        fetchPolicy: 'network-only',
                        update: (data) => data.user,
                        result({ data }) {
                            this.loading = false;
                            this.author = data.user;
                            this.editableAuthor = { ...data.user }; // スプレッド構文を使って独立したコピーを作成
                        },
                        error(error) {
                            this.loading = false;
                            this.error = error;
                            console.error('Apollo query error:', error);
                        }
                }
        },
        watch: {
            userId: function(newVal) {
                console.log(newVal);
                this.$apollo.queries.user.refetch({ id: newVal });
            }
        },
        // mounted() {
        //     if (this.shouldFetchDataOnMount) {
        //         this.fetchData(); // 初回ロード時のみフェッチを行う
        //     }
        // },
        // computed: {
        //     shouldFetchDataOnMount() {
        //         // データが既に存在するかどうかを確認し、存在しない場合のみフェッチを行う
        //         return !this.author;
        //     }
        // },
    }
</script> 
