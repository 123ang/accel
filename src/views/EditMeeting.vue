<template>
  <div>

    <div
      v-if="meeting"
      class="edit-meeting container z-depth-1"
    >

      <h2 class="indigo-text center-align">Edit {{ meeting.title }} Meeting</h2>
      <form @submit.prevent="editMeeting">
        <div class="field title">
          <label for="title">Meeting title:</label>
          <input
            type="text"
            name="title"
            v-model="meeting.title"
          >
        </div>
        <div class="field date">
          <label for="date">Meeting Date:</label>
          <input
            type="date"
            name="date"
            v-model="meeting.date"
          >
        </div>
        <div class="field time">
          <label for="title">Meeting Time:</label>
          <v-row style="margin:10px">
            From:
            <v-col>
              <input
                type="time"
                name="start_time"
                v-model="meeting.start_time"
                class="time"
              >
            </v-col>
            To:
            <v-col>
              <input
                type="time"
                name="end_time"
                v-model="meeting.end_time"
                class="time"
              >
            </v-col>
          </v-row>
        <div class="field description">
          <label for="description">Meeting Description:</label>
          <input
            type="text"
            name="description"
            v-model="meeting.description"
          >
        </div>
        <div class="field link">
          <label for="link">Meeting Link:</label>
          <input
            type="text"
            name="link"
            v-model="meeting.link"
          >
        </div>
        </div>
        <div
          v-for="(mem, index) in meeting.members"
          class="field member"
          :key="index"
        >
          <label for="member">member:</label>
          <input
            type="text"
            name="member"
            v-model="meeting.members[index]"
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
          <button class="btn pink">Update Meeting</button>
        </div>
      </form>

    </div>
  </div>
</template>

<script>
import db from "@/firebase/init";
import firebase from "firebase";
export default {
  name: "EditMeeting",
  data() {
    return {
      meeting: null,
      another: null,
      feedback: null,
      members: [],
      link: null,
      description:null
    };
  },
  methods: {
    editMeeting() {
      if (this.meeting.title) {
        this.feedback = null;
        // update meeting in firestore
        db.collection("meetings")
          .doc(this.EditCaseID)
          .update({
            title: this.meeting.title,
            start_time: this.meeting.start_time,
            end_time: this.meeting.end_time,
            date: this.meeting.date,
            members:this.meeting.members,
            link: this.meeting.link,
            description:this.meeting.description
          })
          .then(() => {
            this.$router.push({ name: "Meeting" });
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        this.feedback = "You must enter a meeting title";
      }
    },
    addMember() {
      if (this.another) {
        db.collection("meeting")
          .doc(this.EditCaseID)
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
      db.collection("meeting")
        .doc(this.EditCaseID)
        .update({
          members: firebase.firestore.FieldValue.arrayRemove(member)
        });
    }
  },
  created() {
    
    db.collection("meetings").doc(this.$store.state.EditCaseID)
    .get()
    .then(doc => {    
      this.meeting = doc.data();
      this.meeting.id = doc.id;
      console.log(this.meeting)  
    });

  },
  computed: {
    EditCaseID() {
      return this.$store.state.EditCaseID;
    },
    UserEmail() {
      return this.$store.state.Email;
    }
  }
};
</script>
 
<style>
.edit-meeting {
  margin-top: 60px;
  padding: 20px;
  max-width: 500px;
}
.edit-meeting h2 {
  font-size: 2em;
  margin: 20px auto;
}
.edit-meeting .field {
  margin: 20px auto;
  position: relative;
}
.edit-meeting .delete {
  position: absolute;
  right: 0;
  bottom: 16px;
  color: #aaa;
  font-size: 1.4em;
  cursor: pointer;
}
</style>