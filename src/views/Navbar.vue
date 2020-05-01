<template>
<v-app>
    <div class="hidden-sm-and-down">
      <v-app-bar
        app
        color="white"
        height="100"
      >
        <div>
        <router-link :to="{ name: 'Meeting' }">
          <v-img
            contain
            max-height="100px"
            max-width="100px"
            src="../assets/logo.png"
          ></v-img>
        </router-link>
        </div>
        <v-toolbar-title
          class="font-weight-black headline"
          style="padding-left:20px"
        >
          <div style="
          position: absolute;
          right: 15%;
          bottom: 0">
          <span  style="color:black;"
            v-if="isLoggedIn"
          >{{UserEmail}}</span>
            <v-btn 
            text
            large
            color="black"
            height="80"
            v-if="isLoggedIn"
            v-on:click="meeting"
          >Scehdule Meeting</v-btn>
          <v-btn 
            text
            large
            color="black"
            height="80"
            v-if="isLoggedIn"
            v-on:click="group"
          >Create Contact Group</v-btn>
          <v-btn       
            text
            large
            color="black"
            height="80"
            v-if="!isLoggedIn"
            v-on:click="login"
          >Login</v-btn>
          <v-btn         
            text
            large
            color="black"
            height="80"
            v-if="!isLoggedIn"
            v-on:click="register"
          >Register</v-btn>
          <v-btn        
            text
            large
            color="black"
            height="80"
            v-if="isLoggedIn"
            v-on:click="logout"
          >Logout</v-btn>
          </div>
        </v-toolbar-title>
      </v-app-bar>
    </div>
    <div class="hidden-md-and-up">

      <v-app-bar
        app
        color="white"
        height="100"
      >
        <v-toolbar
          flat
          color="white"
          height="100"
        >
          <v-app-bar-nav-icon
            @click="drawer = !drawer"
            color="black"
            class="hidden-md-and-up"
          ></v-app-bar-nav-icon>
        <router-link :to="{ name: 'Meeting' }">
          <v-img
            contain
            style="margin-left:20px"
            max-height="100px"
            max-width="100px"
            src="../assets/logo.png"
          ></v-img>
        </router-link>
        </v-toolbar>
        <v-navigation-drawer
          v-model="drawer"
          dark
          color="white"
          absolute
          temporary
          width="200px"
          height="100vH"
        >
          <v-list
            nav
            dense
          >
            <v-list-item-group
              style="text-align:left"
              active-class="deep-grey--text text--accent-4"
            >
              <v-app-bar-nav-icon
                style="margin-top:-5px"
                @click="drawer = !drawer"
                color="black"
              ></v-app-bar-nav-icon>
              <br>
              <span  style="color:black;"
                v-if="isLoggedIn"
              >{{UserEmail}}</span>
              
          <v-btn 
            text
            large
            color="black"
            height="80"
            v-if="isLoggedIn"
            v-on:click.prevent="closeNav()"
            v-on:click="meeting"
          >Scehdule Meeting</v-btn>
          <v-btn 
            text
            large
            color="black"
            height="80"
            v-if="isLoggedIn"
            v-on:click.prevent="closeNav()"
            v-on:click="group"
          >Create Contact Group</v-btn>
          <v-btn       
            text
            large
            color="black"
            height="80"
            v-if="!isLoggedIn"
            v-on:click.prevent="closeNav()"
            v-on:click="login"
          >Login</v-btn>
          <v-btn         
            text
            large
            color="black"
            height="80"
            v-if="!isLoggedIn"
            v-on:click.prevent="closeNav()"
            v-on:click="register"
          >Register</v-btn>
          <v-btn        
            text
            large
            color="black"
            height="80"
            v-if="isLoggedIn"
            v-on:click.prevent="closeNav()"
            v-on:click="logout"
          >Logout</v-btn>

            </v-list-item-group>
          </v-list>
        </v-navigation-drawer>
      </v-app-bar>
    </div>
  </v-app>
</template>


<script>
import store from "../store";
import firebase from "firebase";
export default {
  name: "Navbar",
  data() {
    return {
       drawer: false
    };
  },

  methods: {
    logout: function() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.push("/Login");
        });
      store.commit("IsLoggedIn", false);
    },
    register: function() {
      this.$router.push("/Register");
    },
    login: function() {
      this.$router.push("/Login");
    },
    meeting: function() {
      this.$router.push("/add-meeting");
    },
    group: function() {
      this.$router.push("/group");
    },
    closeNav() {
      this.drawer = false;
    }
  },
  computed: {
    UserEmail() {
      return this.$store.state.Email;
    },
    isLoggedIn() {
      return this.$store.state.isLoggedIn;
    }
  }
};
</script>

<style>
.v-btn {
  font-weight:bold;
}
</style>