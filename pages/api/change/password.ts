import { compare } from 'bcrypt';

export default async (req, res) => {
    if (req.method !== 'POST') {
      return res.status(405).json({ message: 'metod is not allowed' });
    }

    const userData = JSON.parse(req.body);
    const user = await prisma.user.findUnique({ where: { username: userData['username'] }})

    if(userData && user){
      if(await compare(userData['password'], user.password)){
        const newPassword = ""
        await prisma.user.update({ where: { username: userData['username'] }, data: { password: newPassword } });
        res.status(200).json({ message: 'Seccesful' });
      }
      else{
        res.status(403).json({ message: 'Wrong password' });
      }
    }
    else{
      res.status(500).json({ message: 'Server error, try again!' });
    }
};