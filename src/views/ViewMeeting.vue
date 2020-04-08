<template>
  <div>

    <div
      v-if="meeting"
      class="view-meeting container z-depth-1"
    >

      <h2 class="indigo-text center-align">{{ meeting.title }} Meeting Details</h2>
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
        </div>
    </div>
  </div>
</template>

<script>
import db from "@/firebase/init";

export default {
  name: "ViewMeeting",
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

  created() {
    db.collection("meetings")
      .doc(this.EditCaseID)
      .onSnapshot(
        docSnapshot => {
          this.meeting = docSnapshot.data();
        },
        err => {
          console.log(`Encountered error: ${err}`);
        }
      );
  },
  computed: {
    EditCaseID() {
      console.log("here", this.$store.state.EditCaseID);
      return this.$store.state.EditCaseID;
    },
    UserEmail() {
      return this.$store.state.Email;
    }
  }
  
}
</script>
 
<style>
.view-meeting {
  margin-top: 60px;
  padding: 20px;
  max-width: 500px;
}
.view-meeting h2 {
  font-size: 2em;
  margin: 20px auto;
}
.view-meeting .field {
  margin: 20px auto;
  position: relative;
}
.view-meeting .delete {
  position: absolute;
  right: 0;
  bottom: 16px;
  color: #aaa;
  font-size: 1.4em;
  cursor: pointer;
}
</style>