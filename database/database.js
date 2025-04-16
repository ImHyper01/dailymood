import * as SQLite from 'expo-sqlite';

// Open de database
export async function openDatabase() {
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

// Haal mood-statistieken op voor een specifieke datum
export async function fetchMoodStatsByDate(date, callback) {
  const db = await openDatabase();
  const results = await db.getAllAsync(
    'SELECT mood, COUNT(*) as count FROM moods WHERE date = ? GROUP BY mood;',
    [date]
  );

  const moodData = {};
  results.forEach(item => {
    moodData[item.mood] = item.count;
  });

  callback(moodData); // retourneer de mood-statistieken voor die specifieke datum via de callback
}

// Haal mood-statistieken op voor de laatste 7 dagen
export async function fetchMoodStatsForWeek(callback) {
  const db = await openDatabase();

  // Haal de datum van 7 dagen geleden
  const today = new Date();
  const sevenDaysAgo = new Date(today.setDate(today.getDate() - 7)).toISOString().split('T')[0];

  // Haal mood-statistieken voor de laatste 7 dagen
  const results = await db.getAllAsync(
    'SELECT mood, COUNT(*) as count FROM moods WHERE date >= ? GROUP BY mood;',
    [sevenDaysAgo]
  );

  const moodData = {};
  results.forEach(item => {
    moodData[item.mood] = item.count;
  });

  callback(moodData); // retourneer de mood-statistieken van de laatste week via de callback
}

// Haal mood-statistieken op voor de huidige maand
export async function fetchMoodStatsForMonth(callback) {
  const db = await openDatabase();

  // Haal de eerste dag van de huidige maand
  const today = new Date();
  const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1).toISOString().split('T')[0];

  // Haal mood-statistieken voor de huidige maand
  const results = await db.getAllAsync(
    'SELECT mood, COUNT(*) as count FROM moods WHERE date >= ? GROUP BY mood;',
    [firstDayOfMonth]
  );

  const moodData = {};
  results.forEach(item => {
    moodData[item.mood] = item.count;
  });

  callback(moodData); // retourneer de mood-statistieken van de maand via de callback
}
