import AWS from 'aws-sdk';
import stream from 'stream';
// import dotenv from 'dotenv';

// if (process.env.NODE_ENV !== 'production') {
//   dotenv.load();
// }

const polly = new AWS.Polly({ region: 'us-east-1' });

export const sendSpeech = (req, res) => {
  let voiceFileData = {
    OutputFormat: 'mp3',
    Text: req.body.text,
    VoiceId: req.body.voiceId
  };
  polly.synthesizeSpeech(voiceFileData, (err, data) => {
    if (err) {
      // an error occurred
      res.status(400).send(err);
    } else {
      // This is a novel way of creating a stream from
      // a buffer.
      const bufferStream = new stream.PassThrough();
      bufferStream.end(new Buffer(data.AudioStream));
      // Make sure to set your content type
      res.set({
        'Content-Type': 'audio/mpeg'
      });
      // If the stream fails at all, make sure you end the stream.
      // eslint-disable-next-line no-unused-vars
      bufferStream.on('error', _bufferError => {
        res.status(400).end();
      });

      // Pipe it to something else  (i.e. stdout)
      bufferStream.pipe(res);
    }
  });
};
