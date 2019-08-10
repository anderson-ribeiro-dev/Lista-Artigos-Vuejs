<template>
    <div class="article-by-id">
        <PageTitle icon="fa fa-file-o" :main="article.name"
        :sub="article.description"></PageTitle>
        <div class="article-content" v-html="article.content"></div>
    </div>
</template>

<script>
import 'highlightjs/styles/dracula.css'
import hljs from 'highlightjs/highlight.pack.js'
import { baseApiUrl } from '../../global'
import axios from 'axios'
import  PageTitle  from '../template/PageTitle'

export default {
    name: 'ArticleById',
    components: { PageTitle },
    data() {
        return {
            article: {}
        }
    },
    methods: {
       articleById(){
            const url = `${baseApiUrl}/articles/${this.$route.params.id}`
            axios.get(url).then(res =>{
                this.article = res.data
            })
       } 
    },
    mounted() {
        this.articleById();
    },
    updated() {
        //highlightjs
        document.querySelectorAll('.article-content pre.ql-syntax').forEach(element => {
            hljs.highlightBlock(element)
        });
    },

}
</script>

<style>
    .article-content {
        background-color: #fff;
        border-radius: 8px;
        padding: 25px; 
    }

    .article-content pre {
        padding: 20px;
        border-radius: 8px;
        font-size: 1.2rem;
        background-color: #1e1e1e;
        color: #fff;
    }

    .article-content img {
        max-width: 100%;
    }

    .article-content :last-child { /*last element article*/
        margin-bottom: 0px;
    }

</style>
