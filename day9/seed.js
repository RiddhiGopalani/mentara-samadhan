const knex = require('knex')(require('./knexfile').development);

async function seed() {
  const exists = await knex('students').select('*').limit(1);
  if (exists.length === 0) {
    await knex('students').insert([
      { first_name: 'Aisha', last_name: 'Khan', roll_number: 'R001', email: 'aisha@example.com', class: '10', section: 'A', phone: '9876543210' },
      { first_name: 'Rohit', last_name: 'Patel', roll_number: 'R002', email: 'rohit@example.com', class: '10', section: 'B', phone: '9123456780' }
    ]);
    console.log('Seeded students');
  } else {
    console.log('Students exist, skipping seed');
  }
  process.exit(0);
}

seed().catch(err => { console.error(err); process.exit(1); });
