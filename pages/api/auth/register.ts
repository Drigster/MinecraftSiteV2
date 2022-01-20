import { encrypt, getRandomString } from "../../../modules/utils";

export default async function handler(req, res) {
  const request = JSON.parse(req.body);
  const password = await encrypt(request["password"]);
  const usr = await prisma.user.findMany({
    where: {
      OR: [
        {
          username: request["username"]
        },
        {
          email: request["email"]
        }
      ]
    }
  });
  if(usr.length == 0){
    const user = await prisma.user.create({ 
      data: {
        username: request["username"],
        password: password,
        email: request["email"],
        verified: false,
        userInfo: {
          create: {
            regDate: Date.now(),
            lastPlayed: 0,
            permissions: '["launchserver.*", "launcher.*"]',
            roles: '["PLAYER"]',
            refreshToken: getRandomString(16)
          }
        },
        skin: {
          create: {
            skin: `${process.env.NEXTAUTH_URL}/api/skin/${request["username"]}`,
            cloak: `${process.env.NEXTAUTH_URL}/api/skin/cloak/${request["username"]}`,
            body: `${process.env.NEXTAUTH_URL}/api/skin/body/${request["username"]}`,
            head: `${process.env.NEXTAUTH_URL}/api/skin/head/${request["username"]}`
          }
        }
      } 
    });
    res.status(200).json({"message": "Success"});
  }
  else if(usr.length > 0){
    res.status(409).json({"message": "Credentials allready used"});
  }
  else{
    res.status(500).json({"message": "Internal error"});
  }
}
