<template>
  <form>
    <br>

    <v-card
      class="mx-auto"
      max-width="600"
    >

      <v-card
        text
        height=fit-content
      >
        <v-card-title class="headline justify-center">Staff login</v-card-title>
        <v-card-text>

          <v-text-field
            label="Email"
            v-model="email"
          ></v-text-field>

          <v-text-field
            label="Password"
            type="Password"
            v-model="password"
          ></v-text-field>
          <div style="text-align:left;">

            <v-btn
              text
              small
              right
              class="text-none"
              v-on:click.prevent="forgotPassword()"
            >Forgot my password</v-btn>

          </div>
        </v-card-text>
        <v-card-actions>
          <v-flex>
            <v-btn
              dark
              v-on:click.prevent="login(email,password)"
              type="submit"
            >Login</v-btn>
          </v-flex>
        </v-card-actions>

      </v-card>

    </v-card>
  </form>
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
              // User is signed out.
              // ...
            }
          })
        );

      event.preventDefault();
    },

    forgotPassword: function() {
      this.$router.push("/ForgotPassword");
    }
  }
};
</script>