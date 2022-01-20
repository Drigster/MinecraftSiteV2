import fileSystem from 'fs';
import path from 'path';

export default async function handler(req, res) {
  var filePath = path.resolve(`.`, `public/resourcepack.zip`);
  if (fileSystem.existsSync(filePath)) {
    var fileBuffer = fileSystem.readFileSync(filePath);
    res.setHeader('Content-Type', 'application/zip');
    res.send(fileBuffer);
  }
  else {
    res.status(404).send()
  }
}
