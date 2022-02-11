import fileSystem from 'fs';
import path from 'path';

export default async function handler(req, res) {
  const { username } = req.query;
  let user = await prisma.user.findUnique({ 
    where: { 
      username: username
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
  res.setHeader('Content-Disposition', `attachment; filename=${username}_cloak.png`);
  res.send(imageBuffer);
}