import * as SQLite from 'expo-sqlite';

export async function openDatabase() {
  // Gebruik de asynchrone versie om de database te openen
  return SQLite.openDatabaseAsync('moods.db');
}

// Zet de database op met een tabel voor moods
export async function initDB() {
  const db = await openDatabase();
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS moods (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      mood TEXT NOT NULL,
      date TEXT NOT NULL
    );
  `);
  console.log('Database setup complete');
}

// Mood opslaan in de database
export async function insertMood(mood) {
  const today = new Date().toISOString().split('T')[0]; // yyyy-mm-dd
  const db = await openDatabase();
  
  await db.runAsync(
    'INSERT INTO moods (mood, date) VALUES (?, ?);',
    [mood, today]
  );
  console.log('Mood inserted');
}

// Haal de mood-statistieken op
export async function fetchMoodStats(callback) {
  const db = await openDatabase();
  const results = await db.getAllAsync('SELECT mood, COUNT(*) as count FROM moods GROUP BY mood;');

  const moodData = {};
  results.forEach(item => {
    moodData[item.mood] = item.count;
  });
  
  callback(moodData); // retourneer de mood-statistieken via de callback
}
