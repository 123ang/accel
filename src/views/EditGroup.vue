<template>
  <div>

    <div
      v-if="group"
      class="edit-group container z-depth-1"
    >

      <h2 class="indigo-text center-align">Edit {{ group.title }} Group </h2>
      <form @submit.prevent="editGroups">
        <div class="field title">
          <label for="title">Group title:</label>
          <input
            type="text"
            name="title"
            v-model="group.title"
          >
        </div>
        
 
        <div
          v-for="(mem, index) in group.members"
          class="field member"
          :key="index"
        >
          <label for="member">member:</label>
          <input
            type="text"
            name="member"
            v-model="group.members[index]"
          >
          <i
            class="material-icons delete"
            @click="deleteMember(mem)"
          >delete</i>
        </div>
        <div class="field add-member">
          <label for="add-member">Add an member (press tab to add):</label>
          <input
            type="text"
            name="add-member"
            @keydown.tab.prevent="addMember"
            v-model="another"
          > <i
            class="material-icons delete"
            @click="addMember()"
          >add</i>
        </div>
        <div class="field center-align">
          <p
            v-if="feedback"
            class="red-text"
          >{{ feedback }}</p>
          <button class="btn pink">Update Group</button>
        </div>
      </form>

    </div>
  </div>
</template>

<script>
import db from "@/firebase/init";
import firebase from "firebase";
export default {
  name: "EditGroup",
  data() {
    return {
      group: null,
      another: null,
      feedback: null,
      members: [],
    };
  },
  methods: {
    editGroups() {
      if (this.group.title) {
        this.feedback = null;
        // update meetings in firestore
        db.collection("groups")
          .doc(this.GroupID)
          .update({
            title: this.group.title,
            members:this.group.members,
          })
          .then(() => {
            this.$router.push({ name: "Group" });
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        this.feedback = "You must enter a group title";
      }
    },
    addMember() {
      if (this.another) {
        db.collection("groups")
          .doc(this.GroupID)
          .update({
            members: firebase.firestore.FieldValue.arrayUnion(this.another)
          });
        // this.meeting.memberss.push(this.another);
        this.another = null;
        this.feedback = null;
      } else {
        this.feedback = "You must enter a value to add another member";
      }
    },
    deleteMember(member) {
      db.collection("groups")
        .doc(this.GroupID)
        .update({
          members: firebase.firestore.FieldValue.arrayRemove(member)
        });
    }
  },
  created() {
 
    db.collection("groups")
      .doc(this.GroupID)
      .onSnapshot(
        docSnapshot => {
          this.group = docSnapshot.data();
        },
        err => {
          console.log(`Encountered error: ${err}`);
        }
      );
     

  },
  computed: {
    GroupID() {
      return this.$store.state.GroupID;
    },
    UserEmail() {
      return this.$store.state.Email;
    }
  }
};
</script>
 
<style>
.edit-smoothie {
  margin-top: 60px;
  padding: 20px;
  max-width: 500px;
}
.edit-smoothie h2 {
  font-size: 2em;
  margin: 20px auto;
}
.edit-smoothie .field {
  margin: 20px auto;
  position: relative;
}
.edit-smoothie .delete {
  position: absolute;
  right: 0;
  bottom: 16px;
  color: #aaa;
  font-size: 1.4em;
  cursor: pointer;
}
</style>