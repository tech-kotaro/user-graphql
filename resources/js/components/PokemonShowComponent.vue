<template>
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-sm-6">
                    <form>
                        <div class="form-group row border-bottom">
                            <label for="id" class="col-sm-3 col-form-label">Number</label>
                            <input type="text" class="col-sm-9 form-control-plaintext" readonly id="id"
                                v-model="pokemon.number">
                        </div>
                        <div class="form-group row border-bottom">
                            <label for="title" class="col-sm-3 col-form-label">Title</label>
                            <input type="text" class="col-sm-9 form-control-plaintext" readonly id="title"
                                v-model="pokemon.name">
                        </div>
                        <div class="form-group row border-bottom">
                            <label for="content" class="col-sm-3 col-form-label">Content</label>
                            <input type="text" class="col-sm-9 form-control-plaintext" readonly id="content"
                                v-model="pokemon.types">
                        </div>
                        <div>
                            <router-link v-bind:to="{name: 'pokemon.list'}">
                                <button class="btn btn-primary">ポケモン一覧へ</button>
                            </router-link>
                        </div>
                        <!-- <div class="form-group row border-bottom">
                            <label for="person-in-charge" class="col-sm-3 col-form-label">Person In Charge</label>
                            <input type="text" class="col-sm-9 form-control-plaintext" readonly id="person-in-charge"
                                v-model="task.person_in_charge">
                        </div> -->
                    </form>
                </div>
            </div>
        </div>
    </template>
    
    <script>
        import gql from 'graphql-tag'

        export default {
            props: {
                pokemonName: {
                    type: String,
                    required: true,
                    default:'Pikachu',
                }
            },
            data: function () {
                return {
                    task: [],
                }
            },
            methods: {
                // getTask() {
                //     // axios.get('/api/tasks/' + this.taskId)
                //     //     .then((res) => {
                //     //         this.task = res.data;
                //     //     });
                //     var xhr = new XMLHttpRequest();
                //         xhr.open('GET', 'http://localhost:8888/pokemongraphql/pokemongraphqllaravel/public/api/tasks/'+ this.taskId);
                //         xhr.addEventListener("load", (event) => { // loadイベントを登録します。
                //             // console.log(JSON.parse(this.response)); 
                //             this.task = JSON.parse(event.target.response);
                //             console.log(this.task);
                //         }, false);
                //         xhr.send();
                // }
            },
            apollo: {
                    // pokemon: gql`
                    //     query {
                    //         pokemon(name: "Pikachu") {
                    //             number
                    //             name
                    //             types
                    //         }
                    // }`,
                    pokemon: {
                            query: gql`query getPokemon($name: String!){
                                    pokemon(name: $name) {
                                        number
                                        name
                                        types
                                    }
                                }`,
                            variables() {
                                return {
                                name: this.pokemonName // コンポーネントのプロパティにアクセス
                                };
                            }
                    }
                },
            mounted() {
                // this.getTask();
                }
            }
    </script>
