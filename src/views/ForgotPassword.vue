<template>
  <div class="login container z-depth-1" style="background-color:white">
   
    <h2 
    class="center-align black-text" 
    style=" 
    font-weight: bold;
    text-decoration: underline;">
      Password Reset
    </h2>
 
 
    <div class="field email mx-4 center-align">
        <label style="" for="email">Enter the email address you used for registration:</label>
        <input type="email" id="email" v-model="email">
    </div>
  
    <div class="field center-align">
        <button v-on:click.prevent="reset(email)" class="btn1 btn-large btn-extended grey lighten-4 black-text" >Reset</button>    </div> 
 

           
 
  </div>
</template>
<script>
import firebase from "firebase";
import router from "../router";

export default {
  name: "login",
  data: function() {
    return {
      email: "",
      submit: false
    };
  },
  methods: {
    reset: function(email) {
      ////
      var auth = firebase.auth();

      auth
        .sendPasswordResetEmail(email)
        .then(function() {
          alert(
            // Email sent.
            "Instructions on how to reset your password has been sent to " +
              email +
              ". Please click the link in the mail to start the reset process."
          );
          //Redirect to login
          router.push("/Login");
        })
        .catch(function(error) {
          // An error happened.
          alert(error.message);
        });

      ///

      this.email = "";
    }
  }
};
</script>

