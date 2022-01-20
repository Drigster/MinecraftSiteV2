import fileSystem from 'fs';
import path from 'path';

export default async function handler(req, res) {
  const { username } = req.query;
  var filePath = path.resolve(`.`, `public/${username}_head.png`);
  if (fileSystem.existsSync(filePath)) {
    var imageBuffer = fileSystem.readFileSync(filePath);
  }
  else {
    var filePath = path.resolve(`.`, `public/default_head.png`);
    var imageBuffer = fileSystem.readFileSync(filePath);
  }
  res.setHeader('Content-Type', 'image/png');
  res.send(imageBuffer);
}