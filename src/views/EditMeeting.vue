<template>
 <div>{{EditCaseID}} <br> {{UserEmail}}
  <div v-if="meeting" class="edit-meeting container z-depth-1">
    <h2 class="center-align indigo-text">Edit {{ meeting.title }} Meeting</h2>
    <form @submit.prevent="editMeeting">
      <div class="field title">
        <label for="title">Meeting title:</label>
        <input type="text" name="title" v-model="meeting.title">
      </div>
      <div class="field date">
        <label for="date">Meeting Date:</label>
        <input type="date" name="date" v-model="meeting.date">
      </div>
      <div class="field time">
        <label for="title">Meeting Time:</label>
        <v-row style="margin:10px">
        From:
        <v-col>
          <input type="time" name="start_time" v-model="meeting.start_time" class="time">
        </v-col>
        To:
         <v-col>
          <input type="time" name="end_time" v-model="meeting.end_time" class="time">
        </v-col> 
        </v-row>
    
      </div>
      <div v-for="(mem, index) in meeting.members" class="field member" :key="index">
        <label for="member">member:</label>
        <input type="text" name="member" v-model="meeting.members[index]">
        <i class="material-icons delete" @click="deleteMember(mem)">delete</i>
      </div>
      <div class="field add-member">
        <label for="add-member">Add an member (press tab to add):</label>
        <input type="text" name="add-member" @keydown.tab.prevent="addMember" v-model="another">
      </div>
      <div class="field center-align">
        <p v-if="feedback" class="red-text">{{ feedback }}</p>
        <button class="btn pink">Update Meeting</button>
      </div>
    </form>
  </div>
  </div>
</template>


<script>
import db from '@/firebase/init'


export default {
  name: 'EditMeeting',
  data(){
    return{
      title: null,
      members: [],
      another: null,
      feedback: null,
      date: null,
      start_time: null,
      end_time: null
     
    }
  },
  methods: {
    editSmoothie(){
       if(this.meeting.title){
        this.feedback = null
        
       
        db.collection('meetings').doc(this.meeting.id).update({
          title: this.meeting.title,
          date: this.meeting.date,
          start_time: this.meeting.start_time,
          end_time: this.meeting.end_time,
          memberss: this.meeting.members
        }).then(() => {
          this.$router.push({ name: 'Index' })
        }).catch(err => {
          console.log(err)
        })
      } else {
        this.feedback = 'You must enter a Meeting title'
      }
    
    },
    addMember(){
      if(this.another){
        this.meeting.memberss.push(this.another)
        this.another = null
        this.feedback = null
      } else {
        this.feedback = 'You must enter a value to add another member'
      }
    },
  
    deleteMember(mem){
      this.meeting.members = this.meeting.members.filter(member => {
        return member != mem
      })
    }
  },
  created(){
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
.add-meeting{
  margin-top: 60px;
  padding: 20px;
  max-width: 500px;
}
.add-meeting h2{
  font-size: 2em;
  margin: 20px auto;
}
.add-meeting .field{
  margin: 20px auto;
  position: relative;
}
.add-meeting .delete{
  position: absolute;
  right: 0;
  bottom: 16px;
  color: #aaa;
  font-size: 1.4em;
  cursor: pointer;
}
</style>

