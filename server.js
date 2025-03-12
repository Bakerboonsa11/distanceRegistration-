const App=require('./app.js')
const mongoose=require('mongoose')
const PORT=process.env.PORT

App.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

mongoose.connect(process.env.MONGO_URI, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true
})
.then(() => console.log('MongoDB Connected Successfully!'))
.catch(err => console.log('MongoDB Connection Error:', err));
