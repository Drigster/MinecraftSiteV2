import { prisma } from "../../../../modules/db";

export default async function handler(req, res) {
  const { username } = req.query;
  const user = await prisma.user.findUnique({ 
    where: { username: username },
    include: { skin: { select: { skin: true, cloak: true } }, userInfo: { select: { permissions: true, roles: true } } }});
  if(user){
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
  else {
    res.status(404);
  }
}
