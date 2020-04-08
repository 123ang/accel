<template>
  <div class="index container">

    <a
      href=""
      class="btn-floating btn-large  right pink"
    >
      <router-link :to="{ name: 'AddGroup' }">
        <i class="material-icons">add</i>
      </router-link>
    </a> <br><br><br>
    <div
      class="card"
      v-for="group in groups" :key="group.id">
      <div class="card-content">
       <i
          v-if="group.leader == UserEmail"
          class="material-icons delete"
          @click="deleteGroup(group.id)"
        >delete</i>
        
        <h2 class="indigo-text" > {{ group.title }}</h2>
        
       
        <ul class="members" v-if="group.leader == UserEmail">
          <li 
            v-for="(mem, index) in group.members"
            :key="index"
          >
            <span class="chip">{{ mem }}</span>
          </li>
        </ul>
      </div>
      <v-btn
        v-if="group.leader == UserEmail"
        fab
        class="btn-floating btn-large halfway-fab pink"
        v-on:click.prevent="editGroup(group.id)"
      >

        <i class="material-icons edit">edit</i>

      </v-btn>
    </div>
  </div>
</template>


<script>
import db from "@/firebase/init";
export default {
  name: "Meeting",

  data() {
    return {
      groups: []
    };
  },
  methods: {
    editGroup(id) {
      this.$store.commit("GroupID", id);
      this.$router.push("/edit-group");
    },
    viewGroup(id) {
      this.$store.commit("GroupID", id);
      this.$router.push("/view-group");
    },
    deleteGroup(id) {
      // delete doc from firestore
      db.collection("groups")
        .doc(id)
        .delete()
        .then(() => {
          this.groups = this.groups.filter(group => {
            return group.id != id;
          });
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created() {
    // fetch data from firestore
 
    db.collection("groups")
    .where('leader', '==', this.$store.state.Email)
       .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          this.groups.push({ ...doc.data(), id: doc.id });
        });
      });
  },
  
  computed: {
    UserEmail() {
      return this.$store.state.Email;
    },
  }
};
</script>

<style>
.index h2 {
  font-size: 1.8em;
  text-align: center;
  margin-top: 0;
}
.index .members {
  margin: 30px auto;
}
.index .members li {
  display: inline-block;
}
.index .delete {
  position: absolute;
  top: 4px;
  right: 4px;
  cursor: pointer;
  color: #aaa;
  font-size: 1.4em;
}

.pointer {
  cursor: pointer;
}
</style>