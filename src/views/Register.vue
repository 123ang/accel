<template>

  <div class="register container z-depth-1">
    <h2 class="center-align indigo-text">Register</h2>
    <form>
      <div class="field first_name">
        <label for="first_name">First Name:</label>
        <input
          type="text"
          id="first_name"
          v-model="first_name"
        >
      </div>
      <div class="field last_name">
        <label for="last_name">Last Name:</label>
        <input
          type="text"
          id="last_name"
          v-model="last_name"
        >
      </div>
      <div class="field email">
        <label for="email">Email:</label>
        <input
          type="email"
          id="email"
          v-model="email"
        >
      </div>
      <div>
        <label for="password">Password:</label>
        <input
          type="password"
          id="password"
          v-model="password"
        >
      </div>
      <div>
        <label for="gender">Gender:</label>
        <select
          id="gender"
          v-model="gender"
        >
          <option
            disabled
            value=""
          >Please select one</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        <v-divider></v-divider>
      </div>
      <div>
        <label for="dob">Date of Birth:</label>
        <input
          type="date"
          id="dob"
          v-model="dob"
        >
      </div>
      <div class="field address">
        <label for="address">Address:</label>
        <input
          type="text"
          id="address"
          v-model="address"
        >
      </div>
      <div class="field post_code">
        <label for="post_code">Post Code:</label>
        <input
          type="text"
          id="post_code"
          v-model="post_code"
        >
      </div>
      <div class="field country">
        <label for="country">Country:</label>
        <input
          type="text"
          id="country"
          v-model="country"
        >
      </div>
      <div class="field center-align">
        <button
          v-on:click.prevent="register()"
          class="btn btn-large btn-extended grey lighten-4 black-text"
        >Register</button>
      </div>
    </form>
  </div>

</template>

<script>
import db from "@/firebase/init";
import firebase from "firebase";
export default {
  name: "register",
  data: function() {
    return {
      email: "",
      password: "",
      dob: "",
      gender: "",
      first_name: "",
      last_name: "",
      address: "",
      post_code: "",
      country: ""
    };
  },
  methods: {
    register: function() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(cred => {
          return (
            db
              .collection("users")
              .doc(cred.user.uid)
              .set({
                dob: this.dob,
                gender: this.gender,
                first_name: this.first_name,
                last_name: this.last_name,
                address: this.address,
                post_code: this.post_code,
                country: this.country
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
        .then(
          firebase
            .auth()
            .signOut()
            .then(() => {
              // alert(
              // "Please login into your mail and verify your email by clicking the link provided and login in again."
              //);
              this.$router.push("/");
            }),
          err => {
            alert(err.message);
            this.$router.push("/Register");
          }
        );
    }
  }
};
</script>

<style>
select {
  display: inline-block;
  border-bottom: 1px solid #9e9e9e;
}
</style>