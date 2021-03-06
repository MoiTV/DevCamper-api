const fs = require('fs');
const mongoose = require('mongoose');
const color = require('colors');
const dotenv = require('dotenv');


// Load env vars
dotenv.config({
    path: './config/config.env'
});

// Load models
const Bootcamp = require('./model/Bootcamp');
const Course = require('./model/Course')

// connect to DB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
});

// Read JSON files
const bootcamps = JSON.parse(fs.readFileSync(`${__dirname}/_data/bootcamps.json`, 'utf-8'));

const courses = JSON.parse(fs.readFileSync(`${__dirname}/_data/courses.json`, 'utf-8'));

// Import into db
const importData = async() => {
    try {
        await Bootcamp.create(bootcamps);
        await Course.create(courses);

        console.log('Data Imported...'.green.inverse);
        process.exit();
    } catch (error) {
        console.log(error)
    }
}

// Delete data
const deleteData = async() => {
    try {
        await Bootcamp.deleteMany();
        await Course.deleteMany();

        console.log('Data Destroyed...'.red.inverse);
        process.exit();
    } catch (error) {
        console.log(error)
    }
}

if (process.argv[2] === '-i') {
    importData();
} else if (process.argv[2] === '-d') {
    deleteData();
}