<template>
  <div class="home">
    <header class="hero">
      <h1>🎺 Fanfare Révolutionnaire</h1>
      <p>La musique comme arme de construction massive.</p>
    </header>

    <section class="calendar">
      <h2>Événements à venir</h2>
      <ul>
        <li v-for="event in events" :key="event._id">
          <strong>{{ formatDate(event.date) }}</strong> — {{ event.title }}
        </li>
      </ul>
      <p v-if="events.length === 0">Aucun événement prévu pour le moment.</p>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useTracker } from 'meteor/vue3';
import { Events } from '/imports/api/events/collection.js';
import { Meteor } from 'meteor/meteor';

const events = useTracker(() => {
  Meteor.subscribe('events.all');
  return Events.find({}, { sort: { date: 1 } }).fetch();
});
console.log('Events collection:', Events);

function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
  });
}
</script>

<style scoped>
.home {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

.hero {
  text-align: center;
  margin-bottom: 2rem;
}

.calendar {
  margin-top: 2rem;
}

h1, h2 {
  color: #b30000;
}
</style>
