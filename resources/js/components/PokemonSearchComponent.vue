<template>
    <div class="container">
        <div>
            <input type="text" v-model="pokemonName"> 
        </div>
        <div>
            <button @click="onPokemonSearch">ポケモンを検索！！</button>
        </div>
        <div v-if="pokemon">
            <p>{{ pokemon.name }}</p>
            <p>{{ pokemon.types }}</p>
            <p>{{ pokemon.number }}</p>
        </div>
    </div>
</template>

<script>
    import gql from 'graphql-tag'

    export default {
        data: function () {
            return {
                pokemonName:'',
                pokemon:'',
                tasks: [],
                pokemons: [],
            }
        },
        methods: {
            onPokemonSearch() {
                // this.$apollo.queries.pokemon.start(); 
                const variables = {
                    name: this.pokemonName
                };
                console.log('Query variables:', variables); 

                try{
                    this.$apollo.query({
                        query: gql`
                            query getPokemon($name: String!) {
                                pokemon(name: $name) {
                                    number
                                    name
                                    types
                                }
                            }
                        `,
                        variables
                    }).then(({ data }) => {
                        this.pokemon = data.pokemon;
                        console.log(data);
                    }).catch(error => {
                    console.error('Error fetching pokemon:', error);
                    });
                }catch{

                }
            }
        },
        watch: {
            pokemon: function(newVal) {
                console.log(newVal);
            }
        },
        // apollo: {
        //     pokemon: {
        //             query: gql`query getPokemon($name: String!){
        //                     pokemon(name: $name) {
        //                         number
        //                         name
        //                         types
        //                     }
        //                 }`,
        //             variables() {
        //                 return {
        //                     name: this.pokemon // コンポーネントのプロパティにアクセス
        //                 };
        //             }
        //     }
        // },
    }
</script>
