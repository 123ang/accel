<template>
  <div class="add-meeting container z-depth-1"> 
    <h2 class="center-align indigo-text">Add New Schedule Meeting</h2>
    <form @submit.prevent="addMeeting">
      <div class="field title">
        <label for="title">Meeting title:</label>
        <input
          type="text"
          name="title"
          v-model="title"
        >
      </div>
      <div class="field date">
        <label for="date">Meeting Date:</label>
        <input
          type="date"
          name="date"
          v-model="date"
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
              v-model="start_time"
              class="time"
            >
          </v-col>
          To:
          <v-col>
            <input
              type="time"
              name="end_time"
              v-model="end_time"
              class="time"
            >
          </v-col>
        </v-row>

      </div>
      <div class="field description">
        <label for="description">Meeting Description:</label>
        <input
          type="text"
          name="description"
          v-model="description"
        >
      </div>
      <div class="field link">
        <label for="link">Meeting Link:</label>
        <input
          type="text"
          name="link"
          v-model="link"
        >
    </div>
     
      <div class="field add-group">
        <label for="add-group">Choose a group that you created:</label>
        <select v-model="selectedGroup">
            <option
              disabled
              value=""
            >Please select one</option>
            <option v-for="group in groups" :key="group.id" v-bind:value="group.members">{{group.title}} </option>
        </select>
        
      </div>
      <div>
        <div
          v-for="(mem, index) in selectedGroup"
          class="field member"
          :key="index"
        >
          <label for="member">member:</label>
          <input
            type="text"
            name="member"
            v-model="selectedGroup[index]"
          >
          <i
            class="material-icons delete"
            @click="deleteMember(mem)"
          >delete</i>
        </div>
  
      </div>
        
      <div class="field add-member">
        <label for="add-member">Add an member (press tab to add):</label>
        <input
          type="text"
          name="add-member"
          @keydown.tab.prevent="addMember"
          v-model="another"
        >
      </div>
      <div class="field center-align">
        <p
          v-if="feedback"
          class="red-text"
        >{{ feedback }}</p>
        <button class="btn pink">Add Meeting</button>
      </div>
    </form>
  </div>
</template>

<script>
import db from "@/firebase/init";

export default {
  name: "AddMeeting",
  data() {
    return {
      title: null,
      members: [],
      another: null,
      feedback: null,
      date: new Date().toISOString().substr(0, 10),
      start_time: null,
      end_time: null,
      link:null,
      description:null,
      groups:[],
      selectedGroup:null,
     
    };
  },
  methods: {
    addMeeting() {
      if (this.title) {
        this.feedback = null;
        //save Meeting to firestore
        db.collection("meetings")
          .add({
            title: this.title,
            members: this.members,
            start_time: this.start_time,
            end_time: this.end_time,
            date: this.date,
            leader: this.UserEmail,
            link: this.link,
            description: this.description
          })
          .then(() => {
            this.$router.push({ name: "Meeting" });
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        this.feedback = "You must enter a Meeting title";
      }
    },
    addMember() {
      if (this.another) {
        this.members.push(this.another);
        this.another = null;
        this.feedback = null;
      } else {
        this.feedback = "You must enter a value to add another member";
      }
    },
    deleteMember(mem) {
      this.members = this.members.filter(member => {
        return member != mem;
      });
    },
   
 
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
.add-meeting {
  margin-top: 60px;
  padding: 20px;
  max-width: 500px;
}
.add-meeting h2 {
  font-size: 2em;
  margin: 20px auto;
}
.add-meeting .field {
  margin: 20px auto;
  position: relative;
}
.add-meeting .delete {
  position: absolute;
  right: 0;
  bottom: 16px;
  color: #aaa;
  font-size: 1.4em;
  cursor: pointer;
}
</style>