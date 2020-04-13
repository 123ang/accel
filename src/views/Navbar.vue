<template>
  <div class="navbar">
    <nav class="nav-extended white darken-2">
      <div class="nav-content">
        <v-row>
          <v-col>
          <router-link :to="{ name: 'Meeting' }">
            <v-img
              contain
              max-height="100px"
              max-width="200px"
              src="../assets/logo.png"
              style="margin-left:300px;border: none;padding: 0;background: none;"
            ></v-img>
          </router-link>
          </v-col>
          <v-toolbar-title>
          <v-col>
          <span  style="color:black;"
            v-if="isLoggedIn"
            
          >{{UserEmail}}</span>
          <v-btn 
            text
            large
            color="white"
            height="80"
            v-if="isLoggedIn"
            v-on:click="meeting"
          >Scehdule Meeting</v-btn>
          <v-btn 
            text
            large
            color="white"
            height="80"
            v-if="isLoggedIn"
            v-on:click="group"
          >Create Contact Group</v-btn>
          <v-btn       
            text
            large
            color="white"
            height="80"
            v-if="!isLoggedIn"
            v-on:click="login"
          >Login</v-btn>
          <v-btn         
            text
            large
            color="white"
            height="80"
            v-if="!isLoggedIn"
            v-on:click="register"
          >Register</v-btn>
          <v-btn        
            text
            large
            color="white"
            height="80"
            v-if="isLoggedIn"
            v-on:click="logout"
          >Logout</v-btn>
          </v-col>
          </v-toolbar-title>
        </v-row>
      </div>
    </nav>
  </div>
</template>


<script>
import store from "../store";
import firebase from "firebase";
export default {
  name: "Navbar",
  data() {
    return {};
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