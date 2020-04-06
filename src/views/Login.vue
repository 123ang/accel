<template>
 <div class="register container z-depth-1">
  <h2 class="center-align indigo-text">Login</h2>
    <form @submit.prevent="addMeeting">
      <div class="field email">
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="email">
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password">
      </div>
      <div class="field center-align">
        <button v-on:click.prevent="login(email,password)" class="btn btn-large btn-extended grey lighten-4 black-text"  type="submit">Login</button>
        <button v-on:click="register" class="btn btn-large btn-extended grey lighten-4 black-text">Register</button>
      </div>
    </form>
</div>
     
</template>

<script>
import store from "../store";
import router from "../router";
import firebase from "firebase";
export default {
  data() {
    return {
      email: null,
      password: null
    };
  },
  methods: {
    login: function(email, password) {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(
          firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
              store.commit("IsLoggedIn", true);
              store.commit("Email", user.email);
              router.push("/Index");
            } else {
              // User is signed out.
              // ...
            }
          })
        );

      event.preventDefault();
    },
      register: function(){
        this.$router.push("/Register");
      },
    forgotPassword: function() {
      this.$router.push("/ForgotPassword");
    }
  }
};
</script>

<style>
.btn {
  margin-left: 40px ;
}
</style>