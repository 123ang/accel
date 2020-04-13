<template>
 <div class="register container z-depth-1" style="background-color:white">
  <h2 class="center-align black-text">Forget Password</h2>
  
     
  
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
.btn {
  margin-left: 40px ;
}
</style>