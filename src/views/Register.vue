<template>

  <div class="register container z-depth-1">
        <h2 class="center-align indigo-text">Register</h2>
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
              <button v-on:click="register" class="btn btn-large btn-extended grey lighten-4 black-text">Register</button>
            </div>
          </form>
  </div>
     
</template>

<script>
import db from 'firebase';

export default {
  name: 'register',
  data: function() {
    return {
      email: '',
      password: ''
    };
  },
  methods: {
    register: function() {
      db
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(cred => {
          return (
            db
              .collection("users")
              .doc(cred.user.uid) // cred.user.uid is being passed here as doc.id
              .set({
                  age:this.age,
                  gender: this.gender
        // add all the user details here
              }),
            cred.user
              .sendEmailVerification()
              .then(function() {
                alert(
                  "Please login into your mail account and verify your email address by clicking the link provided."
                );
                // Email sent.
              })
           
              .catch(function(error) {
                // An error happened.
                console.log(error);
              })
          );
        })
    }
  }
};
</script>