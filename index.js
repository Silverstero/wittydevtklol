// Setting up REPLIT DB
const Database = require("@replit/database")
const postsdb = new Database()
const usersdb = new Database()
const express = require('express');
const fetch = require('node-fetch');
const app = express();
const bodyParser = require('body-parser');
app.use(express.json())
app.set('view engine', 'ejs');


const temp*posts = [
  { "id":"https://stories.poppyrock.repl.co/test.mp4", "author": "poprock*", "authorimg": "https://static-cdn.jtvnw.net/jtv_user_pictures/4231d970-64ab-49a2-a7df-aa02d62a221e-profile_image-150x150.png", "time": "5/12/23 at 10:08pm" },
  { "id": 2, "title": "Luigi 🤩🤩🤩🤩🤩🥵🥵🥵", "wittyname": "https://stories.poppyrock.repl.co/luigi.mp4", "author": "poprock*", "authorimg": "https://static-cdn.jtvnw.net/jtv_user_pictures/4231d970-64ab-49a2-a7df-aa02d62a221e-profile_image-150x150.png", "time": "5/12/23 at 10:08pm" }
]

postsdb.set('posts', tempposts);

const posts = postsdb.get('posts')

app.get('/', async (req, res) => {
  const wittys = await postsdb.get('posts')
  res.render('index', { wittys: wittys })
});


app.get('/recent', async (req, res) => {
  const wittys = await postsdb.get('posts')
  res.render('video', { wittys: wittys })
});

app.get('/credits', async (req, res) => {

  res.render('credits')
});

app.get('/post', async (req, res) => {

  res.render('devpost')
});

app.get('/redirect/github', (req, res) => {
  // Replace YOUR_REDIRECT_URI with the URL where the user will be redirected after authentication
    const githubRedirectUri = encodeURIComponent('https://wittytk.williammcdowel2.repl.co/handleauth/github');
    const githubClientId = '6fb704c90f7e1198771d';

  
    
  
  res.render('redirect', { redirectURL: 'https://github.com/login/oauth/authorize?client_id=' + githubClientId + '&redirect_uri=' + githubRedirectUri + '&scope=user:email' });
});

app.use(express.urlencoded({ extended: true }));

app.post('/posts', async (req, res) => {

  console.log('recieved post')
  // Retrieve the posted form data
  const { title, video, author, authorimg } = req.body;

  // Create a JSON object with the form data
  const post = {
    title: title,
    wittyname: video,
    author: author,
    authorimg: authorimg
  };

  try {
    // Push the JSON object to the Replit database
    await postsdb.push('posts', post);

    // Redirect to a success page or another route
    res.redirect('/');
  } catch (error) {
    console.error('Error saving post to database:', error);
    // Handle the error accordingly
  }
});

app.listen(3000, () => {
  console.log('starting on port 3000')
});

