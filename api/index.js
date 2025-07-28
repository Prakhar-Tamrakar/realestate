import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js'
import authRouter from './routes/auth.route.js'
import ImageKit from 'imagekit';     
import cookieParser from 'cookie-parser';
import listingRouter from './routes/listing.route.js';
import path from 'path';
dotenv.config();

mongoose.connect(process.env.MONGO).then(()=>{
    console.log('MongoDB Connected');
}).catch((err)=>[
    console.error(err),
]);

const __dirname = path.resolve();

const app = express();
app.use(express.json())
app.use(cookieParser());


const imagekit = new ImageKit({
  urlEndpoint: 'https://ik.imagekit.io/prakhar3091/', 
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY
});


app.get('/api/imagekit-auth', (req, res) => {
  const result = imagekit.getAuthenticationParameters();
  res.send({
    ...result,
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  });
});


app.listen(4000 , ()=>{
    console.log('Server is running on port 4000');
})

app.use('/api/auth',authRouter);
app.use('/api/user',userRouter);
app.use('/api/listing',listingRouter);

app.use(express.static(path.join(__dirname , '/client/dist')));

app.get('*',(req,res)=>{
  res.sendFile(path.join(__dirname , 'client' , 'dist' , 'index.html'))
})

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
      success: false,
      statusCode,
      message,
    });
  });