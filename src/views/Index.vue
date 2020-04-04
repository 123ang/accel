<template>
  <div class="index container">
    <div class="card" v-for="meeting in meetings" :key="meeting.id">
      <div class="card-content">
        <i class="material-icons delete" @click="deletemeeting(meeting.id)">delete</i>
        <h2 class="indigo-text">{{ meeting.title }}</h2>
        <ul class="ingredients">
          <li v-for="(ing, index) in meeting.ingredients" :key="index">
            <span class="chip">{{ ing }}</span>
          </li>
        </ul>
      </div>
      <span class="btn-floating btn-large halfway-fab pink">
        <router-link :to="{ name: 'Editmeeting', params: {meeting_slug: meeting.slug}}">
          <i class="material-icons edit">edit</i>
        </router-link>
      </span>
    </div>
  </div>
</template>

<script>
import db from '@/firebase/init'

export default {
  name: 'Index',
  data(){
    return{
      meetings: []
    }
  },
  methods: {
    deletemeeting(id){
      // delete doc from firestore
      db.collection('meetings').doc(id).delete()
      .then(() => {
        this.meetings = this.meetings.filter(meeting => {
          return meeting.id != id
        })
      }).catch(err => {
        console.log(err)
      })
    }
  },
  created(){
    // fetch data from firestore
    db.collection('meetings').get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        let meeting = doc.data()
        meeting.id = doc.id
        this.meetings.push(meeting)
      })
    })
  }
}
</script>

<style>

.index h2{
  font-size: 1.8em;
  text-align: center;
  margin-top: 0;
}
.index .ingredients{
  margin: 30px auto;
}
.index .ingredients li{
  display: inline-block;
}
.index .delete{
  position: absolute;
  top: 4px;
  right: 4px;
  cursor: pointer;
  color: #aaa;
  font-size: 1.4em;
}
</style>
