<template>
  <div class="index container">

    <a
      href=""
      class="btn-floating btn-large  right pink"
    >
      <router-link :to="{ name: 'AddMeeting' }">
        <i class="material-icons">add</i>
      </router-link>
    </a> <br><br><br>
    <div
      class="card"
      v-for="meeting in listmeetings" :key="meeting.id">
      <div class="card-content">
        <i
          v-if="meeting.leader == UserEmail"
          class="material-icons delete"
          @click="deletemeeting(meeting.id)"
        >delete</i>
        
        <h2 class="indigo-text py-0 w-1/4 pointer" v-on:click.prevent="viewMeeting(meeting.id)"> {{ meeting.title }}</h2>
        
        <v-row>Meeting Date: {{ meeting.date }}</v-row>
        <v-row>Time: {{ meeting.start_time }} - {{ meeting.end_time }}</v-row>
        <v-row>Description: {{ meeting.description }}</v-row>
        <v-row>Link: <a v-bind:href=" 'http://' + meeting.link " target="_blank">
                                {{ meeting.link }}
                            </a> </v-row>
        <ul class="members" v-if="meeting.leader == UserEmail">
          <li 
            v-for="(mem, index) in meeting.members"
            :key="index"
          >
            <span class="chip">{{ mem }}</span>
          </li>
        </ul>
      </div>
      <v-btn
        v-if="meeting.leader == UserEmail"
        fab
        class="btn-floating btn-large halfway-fab pink"
        v-on:click.prevent="editMeeting(meeting.id)"
      >

        <i class="material-icons edit">edit</i>

      </v-btn>
    </div>
  </div>
</template>

<script>
import db from "@/firebase/init";
import _ from 'lodash';
export default {
  name: "Meeting",

  data() {
    return {
      meetings: []
    };
  },
  methods: {
    editMeeting(id) {
      this.$store.commit("EditCaseID", id);
      this.$router.push("/edit-meeting");
    },
    viewMeeting(id) {
      this.$store.commit("EditCaseID", id);
      this.$router.push("/view-meeting");
    },
    deletemeeting(id) {
      // delete doc from firestore
      db.collection("meetings")
        .doc(id)
        .delete()
        .then(() => {
          this.meetings = this.meetings.filter(meeting => {
            return meeting.id != id;
          });
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created() {
    // fetch data from firestore
 
    db.collection("meetings")
    .where('leader', '==', this.$store.state.Email)
       .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          this.meetings.push({ ...doc.data(), id: doc.id });
        });
      });
      db.collection("meetings")
      .where('members', 'array-contains', this.$store.state.Email)
    .get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        this.meetings.push({ ...doc.data(), id: doc.id });
      });
    });
    
  },
  
  computed: {
    UserEmail() {
      return this.$store.state.Email;
    },
    listmeetings: function () {
      var d = new Date();
      var year = d.getFullYear() 
      var month = d.getMonth()+1
      var date = d.getDate()
      if(month < 10) {
        month = '0' + month
      }
      if(date < 10) {
        date = '0' + date
      }
      var fulldate = year + "-" + month + "-" + date 
      
      var sort_data = _.orderBy(this.meetings, ['date','start_time'] , ['asc','asc']); 
      var filtered_data =  _.filter(sort_data, function(sort_data) {
                              return sort_data.date >= fulldate;
                          });
      console.log(filtered_data);
      return filtered_data; 
    }
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