const AWS = require('aws-sdk');
const s3 = new AWS.S3();
const voiceid = new AWS.VoiceID();
const fs = require('fs');
const { execSync } = require('child_process');

exports.handler = async (event) => {
  try {
    const bucket = process.env.SOURCE_BUCKET;   // Bucket con los .txt base64
    const key = event.key;                      // Key del archivo .txt
    const domainId = process.env.VOICE_ID_DOMAIN;
    const targetBucket = process.env.TARGET_BUCKET; // tmp-ready

    console.log(`Leyendo archivo: ${key}`);
    const object = await s3.getObject({ Bucket: bucket, Key: key }).promise();
    const base64Audio = object.Body.toString('utf-8');

    // 1️⃣ Decodificar base64 y guardar RAW
    fs.writeFileSync('/tmp/audio.raw', Buffer.from(base64Audio, 'base64'));
    console.log(`Archivo base64 decodificado.`);

    // 2️⃣ Convertir a mono, 16kHz PCM WAV usando FFmpeg
    execSync(`ffmpeg -f s16le -ar 44100 -ac 2 -i /tmp/audio.raw -ac 1 -ar 16000 /tmp/audio.wav`);
    console.log(`Archivo convertido.`);

    // 3️⃣ Subir .wav a carpeta temporal en S3
    const wavBuffer = fs.readFileSync('/tmp/audio.wav');
    const wavKey = key.replace('.txt', '.wav').replace('base64/', 'tmp-ready/');

    await s3.putObject({
      Bucket: targetBucket,
      Key: wavKey,
      Body: wavBuffer,
      ContentType: 'audio/wav'
    }).promise();
    console.log(`Archivo .wav guardado en S3: ${wavKey}`);

    // 4️⃣ Enrolar speaker en Voice ID
    const params = {
      DomainId: domainId,
      ClientToken: `token-${Date.now()}`,
      InputDataConfig: {
        S3Uri: `s3://${targetBucket}/${wavKey}`
      }
    };

    const result = await voiceid.createSpeaker(params).promise();
    console.log(`Speaker enrolado:`, result);

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Speaker registrado correctamente.',
        Speaker: result
      })
    };

  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
