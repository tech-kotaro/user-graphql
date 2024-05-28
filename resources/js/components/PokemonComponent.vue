<template>
    <div class="container">
        <table class="table table-hover">
            <thead class="thead-light">
                <tr>
                    <th scope="col">番号</th>
                    <th scope="col">ポケモン名</th>
                    <th scope="col">タイプ</th>
                    <th scope="col">Show</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="pokemon in pokemons" :key="pokemon.id">
                    <td>{{ pokemon.number  }}</td>
                    <td>{{ pokemon.name }}</td>
                    <td>{{ pokemon.types }}</td>
                    <td>
                        <router-link v-bind:to="{name: 'pokemon.show', params: {pokemonName: pokemon.name }}">
                            <button class="btn btn-primary">show {{ pokemon.name }}</button>
                        </router-link>
                    </td>
                </tr>
            </tbody>
        </table>
        <div>
            <router-link v-bind:to="{name: 'pokemon.search'}">
                            <button class="btn btn-primary">ポケモン検索ページへ</button>
            </router-link>
        </div>
    </div>
</template>

<script>
    import gql from 'graphql-tag'

    export default {
        data: function () {
            return {
                tasks: [],
                pokemons: [],
            }
        },
        methods: {
            getTasks() {
                // axios.get('/pokemongraphql/pokemongraphqllaravel/public/api/tasks')
                //     .then((response) => {
                //         this.tasks = response.data;
                //     });

                var xhr = new XMLHttpRequest();
                xhr.open('GET', 'http://localhost:8888/pokemongraphql/pokemongraphqllaravel/public/api/tasks');
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
                    xhr.open('DELETE', 'http://localhost:8888/pokemongraphql/pokemongraphqllaravel/public/api/tasks/'+id);
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
            apollo: {
                pokemons: gql`
                    query {
                        pokemons(first: 3) {
                            id,
                            number,
                            name,
                            types,
                            
                        }
                }`,
                // pokemon: gql`
                //     query {
                //         pokemon(name: "Pikachu") {
                //             number
                //             name
                //             types
                //         }
                //     }`,
            },
            mounted() {
                this.getTasks();
            }
    }
</script>
