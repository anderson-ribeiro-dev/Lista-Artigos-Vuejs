<template>
	<div id="app" :class="{'hide-menu': !isMenuVisible || !user }">
		<Header title="Base de Conhecimento" 
			:hideToggle="!user"
			:hideUserDropdown="!user"
			></Header>
		<Menu v-if="user"></Menu>
		<Loading v-if="validatingToken"></Loading>
		<Content v-else></Content>
		<Footer></Footer>
	</div>
</template>

<script>
import axios from 'axios'
import { baseApiUrl, userKey  } from '../src/global'
import { mapState } from 'vuex'
import Header from './components/template/Header'
// import Header from '@/components/template/Header' absoluta
import Menu from './components/template/Menu'
import Content from './components/template/Content'
import Footer from './components/template/Footer'
import Loading from './components/template/Loading'

export default {
	name: "App",
	components: { Header, Menu, Content, Footer, Loading },
	computed: mapState(['isMenuVisible', 'user']),
	data() {
		return {
			validatingToken: true
		}
	},
	methods: {
		async validateToken() {
			this.validatingToken = true

			const json = localStorage.getItem(userKey) //json localStrorage
			const userData = JSON.parse(json)
			this.$store.commit('setUser', null)

			// localStorage empty
			if(!userData) {
				this.validatingToken = false
				this.$router.push({ name: 'auth' })
				this.$router.push({ name: 'auth' })
			}

			const res = await axios.post(`${baseApiUrl}/validateToken`, userData)

			if(res.data) {
				this.$store.commit('setUser', userData)
				if(this.$mq === 'xs' || this.$mq === 'sm')  {
					this.$store.commit('toggleMenu', false)
				}
			} else {
				localStorage.removeItem(userKey)
				this.$router.push({ name: 'auth' })
			}

			this.validatingToken = false
		}
	},
	created() {
		this.validateToken()
	},
}
</script>

<style>
	* {
		font-family: "Lato", sans-serif;	
	}

	body {
		margin: 0;
	}

	#app {
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;

		height: 100vh; /*occupies the entire screen */
		display: grid;
		grid-template-rows: 60px 1fr 40px;/*three lines*/
		grid-template-columns: 300px 1fr;
		grid-template-areas: 
			"header header"
			"menu content"
			"menu footer";
	}

	#app.hide-menu {
		grid-template-areas: 
			"header header"
			"content content"
			"footer footer";
	}

</style>