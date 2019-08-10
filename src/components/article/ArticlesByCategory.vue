<template>
    <div class="articles-by-category">
        <PageTitle icon="fa fa-folder-o" 
            :main="category.name" sub="Categoria">
        </PageTitle>
        <ul>
            <li v-for="article in articles" :key="article.id">
               <ArticleItem :article="article"></ArticleItem>
            </li>
        </ul>
        <div class="load-more">
            <button v-if="loadMore"
                class="btn btn-lg btn-outline-primary"
                @click="getArticles"> Carregar Mais Artigos
            </button>
        </div>
    </div>
</template>

<script>
import { baseApiUrl } from '../../global'
import axios from  'axios'
import PageTitle from '../template/PageTitle'
import ArticleItem from './ArticleItem'

export default {
    name: 'ArticlesByCategory',
    components: { PageTitle, ArticleItem },
    data() {
        return {
            category: {},
            articles: [],
            page: 1,
            loadMore: true,
        }
    },
    methods: {
        getCategory(){
            const url = `${baseApiUrl}/categories/${this.category.id}`
            axios.get(url).then(res => {
                this.category = res.data
            })
        },
        getArticles(){
            const url = `${baseApiUrl}/categories/${this.category.id}/articles?page=${this.page}`
            axios.get(url).then(res => {
                this.articles = this.articles.concat(res.data) //Concatenate available values with value entered
                this.page++

                if(res.data.length === 0) this.leadMore = false //When no more values are available 
            })

        }
    },
    watch: {
        // Monitors the routes, menu
        $route(to) {
            this.category.id = to.params.id
            this.articles = [] //clear articles
            this.page = 1 //clear pages
            this.loadMore = true

            this.getCategory()
            this.getArticles()
        }
    },
    mounted() {
        // console.log(this.$route.params.id)
        this.category.id= this.$route.params.id //get id route
        this.getCategory() //get methods, set id
        this.getArticles()
    },
}
</script>

<style>
    .articles-by-category ul {
       list-style: none;
       padding: 0px;
    }

    .articles-by-category .load-more {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 25px;
    }
</style>
