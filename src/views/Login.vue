<template>
 <div class="register container z-depth-1" style="background-color:white">
  <h2 
    class="center-align black-text" 
    style=" 
    font-weight: bold;
    text-decoration: underline;">
    Login
  </h2>
  
      <div class="field email mx-4">
        <label style="" for="email">Email Address:</label>
        <input type="email" id="email" v-model="email">
      </div>
      <div class="field password mx-4">
        <label style="font-weight:bold" for="password">Password:</label>
        <input type="password" id="password" v-model="password">
      </div>
      <p  class="field" style="color:#29b6f6; font-weight:bold" v-on:click.prevent="forgotPassword()"> Forget your password? </p>
      <div class="field center-align">
        <button v-on:click.prevent="login(email,password)" class="btn1 btn-large btn-extended grey lighten-4 black-text"  type="submit">Sign In</button>
        <button v-on:click="register" class="btn1 btn-large btn-extended grey lighten-4 black-text" style="margin-left:200px">Register</button>
      </div>
  
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
              router.push("/");
            } else {
               router.push("/Login");
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
label{
  font-weight:bold;
  color: black;
}
.btn1 {
  font-weight:bold;
  margin-bottom:20%;
  margin-top:10%;
}

.field {
    margin-left: 20%;
    margin-right: 20%;
    margin-top: 20px;
}

</style>