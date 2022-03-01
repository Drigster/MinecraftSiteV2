import { prisma } from "../../../modules/db";

export default async function handler(req, res) {
  const request = req.body;
  const user = await prisma.user.findUnique({ 
    where: { 
      username: request["username"] 
    },
    include: { 
      skin: { 
        select: { 
          skin: true, 
          cloak: true 
        } 
      }, 
      userInfo: { 
        select: { 
          permissions: true, 
          roles: true 
        } 
      },
      auntificationData: {
        select: {
          serverId: true
        }
      }
    }
  });
  if(user){
    if(user.auntificationData.serverId == request["serverId"]){
      const data = JSON.stringify(
        {
          "username": user.username,
          "uuid": user.id,
          "permissions": {
            "perms": JSON.parse(user.userInfo.permissions),
            "roles": JSON.parse(user.userInfo.roles)
          },
          "skin": {
            "url": user.skin.skin,
            "digest": "",
            "metadata": {
              "model": "default"
            }
          },
          "cloak": {
            "url": user.skin.cloak,
            "digest": ""
          }
        }
      )
      res.status(200).json(data);
    }
    else{
      res.status(200).json({error: "auth.invalidtoken"});
    }
  }
  else {
    res.status(404).json({error: "auth.usernotfound"});
  }
}
