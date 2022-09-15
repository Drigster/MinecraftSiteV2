import fileSystem from 'fs';
import path from 'path';
import { prisma } from "../../../../modules/db";

export default async function handler(req, res) {
  const { id } = req.query;
  let user = await prisma.user.findUnique({ 
    where: { 
      id: id
    }
  });
  if(user){
    var filePath = path.resolve(`.`, `public/skins/${user.id}_cloak.png`);
    if (fileSystem.existsSync(filePath)) {
      var imageBuffer = fileSystem.readFileSync(filePath);
    }
    else {
      var filePath = path.resolve(`.`, `public/skins/default_cloak.png`);
      var imageBuffer = fileSystem.readFileSync(filePath);
    }
  }
  else {
    var filePath = path.resolve(`.`, `public/skins/default_cloak.png`);
    var imageBuffer = fileSystem.readFileSync(filePath);
  }
  res.setHeader('Content-Type', 'image/png');
  res.setHeader('Content-Disposition', `attachment; filename=${id}_cloak.png`);
  res.send(imageBuffer);
}