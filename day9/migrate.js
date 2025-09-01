const knex = require('knex')(require('./knexfile').development);

async function migrate() {
  const exists = await knex.schema.hasTable('students');
  if (!exists) {
    await knex.schema.createTable('students', (table) => {
      table.increments('id').primary();
      table.string('first_name').notNullable();
      table.string('last_name');
      table.string('roll_number').notNullable().unique();
      table.string('email').unique();
      table.string('phone');
      table.string('class');
      table.string('section');
      table.string('dob');
      table.string('profile_pic');
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
    });
    console.log('Created students table');
  } else {
    console.log('students table already exists');
  }
  process.exit(0);
}

migrate().catch(err => { console.error(err); process.exit(1); });
