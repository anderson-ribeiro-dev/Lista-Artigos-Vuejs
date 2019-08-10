<template>
    <div>
        <PageTitle icon="fa fa-home" main="Dashboard"
            sub="Base de Conhecimento"></PageTitle>
        <div class="stats">
            <Stat title="Categorias" :value="stat.categories" 
                icon="fa fa-folder" color="#d54d50"></Stat>
            <Stat title="Artigos" :value="stat.articles" 
                icon="fa fa-file" color="#3bc480"></Stat>
            <Stat title="Usuários" :value="stat.users" 
                icon="fa fa-user" color="#3282cd" ></Stat>
        </div>
    </div>
</template>

<script>
import PageTitle from '../template/PageTitle'
import Stat from './Stat'
import axios from 'axios'
import { baseApiUrl } from '../../global'

export default {
    name: 'Home',
    components: { PageTitle, Stat },
    data: function() { //request backend
       return {
           stat: {}
       } 
    },
    methods: {
        getStats() {
            axios.get(`${baseApiUrl}/stats`).then(res => this.stat = res.data) //url stats
        }
    },
    mounted() { // Life cycle, Component mounted
        this.getStats()
    },

}
</script>

<style>
    .stats {
        display: flex;
        justify-content: space-between; /*space between components*/
        flex-wrap: wrap;
    }
</style>
