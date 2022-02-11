import fileSystem from 'fs';
import gm from 'gm';
import { prisma } from '../../../modules/db';

export const config = {
  api: {
    bodyParser: false,
  },
}

export default async function handler(req, res) {
  const headers = req.headers;
  const username = headers['username'];
  const type = headers['type'];

  let user = await prisma.user.findUnique({ 
    where: { 
      username: username
    },
    include: { 
      skin: true
    }
  });

  if(user){
    const buffer = req.read();
    let filename;

    if(type == "skin"){
      filename = `./public/skins/${user.id}.png`;
      const path = `${process.env.NEXTAUTH_URL}/api/skin/${user.username}`;
      await prisma.user.update({ where: { 
        username: user.username }, 
        data: { skin: { update: { skin: path } } }
      });
      res.status(202).send();
    }
    else if(type == "cloak"){
      filename = `./public/skins/${user.id}_cloak.png`;
      const path = `${process.env.NEXTAUTH_URL}/api/skin/cloak/${user.username}`;
      await prisma.user.update({ where: { 
        username: user.username }, 
        data: { skin: { update: { cloak: path } } }
      });
      res.status(202).send();
    }
    else{
      res.status(400).send();
      return;
    }

    fileSystem.writeFile(filename, buffer, (err) => {
      if (err) {
        res.status(500).send();
      }
      else{
        res.status(202).send();
        gm(filename)
          .crop(8, 8, 8, 8)
          .scale(128, 128)
          .write(`./public/skins/${user.id}_head.png`, function (err) {
            if (!err) {
              console.log('crazytown has arrived');
            }
            else{
              console.log(err);
            }
          });
      }
    });
  }
  else{
    res.status(404).send();
  }
}