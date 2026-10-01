import { Role } from "../../generated/prisma/enums";
import { auth } from "./auth";
import { prisma } from "./db";

const seed = async () => {
    await prisma.user.deleteMany();

    const res = await auth.api.signUpEmail({
        body: {
            name: 'Brian Soto',
            email: 'brian.yunuel.soto.sanchez@gmail.com',
            password: 'Brian.12345',
        }
    });

    const user = await prisma.user.update({
        where: {
            email: 'brian.yunuel.soto.sanchez@gmail.com',
        },
        data: {
            role: Role.admin
        }
    });
}

seed()
    .then(() => {
        console.log('El seed se ejecuto con exito!!!');
        process.exit(0)
    })
    .catch((err) => {
        console.log(err);
        process.exit(1);
    });