import { auth } from "@/lib/auth";
import { Role } from "../generated/prisma/enums";
import { prisma } from "@/lib/db";

const seed = async () => {
    await prisma.user.deleteMany();
    await prisma.brand.deleteMany();
    await prisma.model.deleteMany();

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

    const carBrandsWithModels = [
        {
            brand: "Volkswagen",
            models: [
                { name: "Gol" },
                { name: "Jetta" },
                { name: "Golf" },
                { name: "Beetle" },
                { name: "Pointer" },
                { name: "Passat" },
                { name: "T-Cross" },
                { name: "Nivus" },
                { name: "Taos" },
                { name: "Tiguan" },
                { name: "Virtus" },
                { name: "Polo" },
                { name: "Vento" },
                { name: "Amarok" },
                { name: "Transporter" },
            ],
        },
        {
            brand: "Chevrolet",
            models: [
                { name: "Corsa" },
                { name: "Chevy" },
                { name: "Aveo" },
                { name: "Spark" },
                { name: "Sonic" },
                { name: "Cruze" },
                { name: "Malibu" },
                { name: "Silverado" },
                { name: "Cheyenne" },
                { name: "S10" },
                { name: "Tracker" },
                { name: "Captiva" },
                { name: "Trax" },
                { name: "Equinox" },
                { name: "Suburban" },
                { name: "Tahoe" },
                { name: "Onix" },
                { name: "Cavalier" },
            ],
        },
        {
            brand: "Nissan",
            models: [
                { name: "Tsuru" },
                { name: "Sentra" },
                { name: "Versa" },
                { name: "March" },
                { name: "Altima" },
                { name: "Maxima" },
                { name: "Tiida" },
                { name: "NP300" },
                { name: "Frontier" },
                { name: "X-Trail" },
                { name: "Kicks" },
                { name: "Pathfinder" },
                { name: "Murano" },
                { name: "Rogue" },
                { name: "Juke" },
            ],
        },
        {
            brand: "Ford",
            models: [
                { name: "Fiesta" },
                { name: "Focus" },
                { name: "Fusion" },
                { name: "Mustang" },
                { name: "Escape" },
                { name: "Explorer" },
                { name: "Expedition" },
                { name: "Ranger" },
                { name: "F-150" },
                { name: "EcoSport" },
                { name: "Edge" },
                { name: "Maverick" },
            ],
        },
        {
            brand: "Toyota",
            models: [
                { name: "Corolla" },
                { name: "Camry" },
                { name: "Yaris" },
                { name: "Prius" },
                { name: "RAV4" },
                { name: "Hilux" },
                { name: "Tacoma" },
                { name: "Tundra" },
                { name: "Highlander" },
                { name: "Sienna" },
                { name: "Land Cruiser" },
                { name: "Corolla Cross" },
            ],
        },
        {
            brand: "Honda",
            models: [
                { name: "Civic" },
                { name: "Accord" },
                { name: "City" },
                { name: "Fit" },
                { name: "CR-V" },
                { name: "HR-V" },
                { name: "Pilot" },
                { name: "Ridgeline" },
            ],
        },
        {
            brand: "Mazda",
            models: [
                { name: "Mazda2" },
                { name: "Mazda3" },
                { name: "Mazda6" },
                { name: "CX-3" },
                { name: "CX-30" },
                { name: "CX-5" },
                { name: "CX-50" },
                { name: "CX-9" },
                { name: "MX-5 Miata" },
            ],
        },
        {
            brand: "Hyundai",
            models: [
                { name: "Grand i10" },
                { name: "Accent" },
                { name: "Elantra" },
                { name: "Sonata" },
                { name: "Tucson" },
                { name: "Santa Fe" },
                { name: "Creta" },
                { name: "Palisade" },
            ],
        },
        {
            brand: "Kia",
            models: [
                { name: "Rio" },
                { name: "Forte" },
                { name: "K3" },
                { name: "Optima" },
                { name: "Stinger" },
                { name: "Seltos" },
                { name: "Sportage" },
                { name: "Sorento" },
                { name: "Telluride" },
                { name: "Soul" },
            ],
        },
        {
            brand: "Renault",
            models: [
                { name: "Clio" },
                { name: "Megane" },
                { name: "Logan" },
                { name: "Sandero" },
                { name: "Duster" },
                { name: "Captur" },
                { name: "Kwid" },
                { name: "Kangoo" },
            ],
        },
        {
            brand: "SEAT",
            models: [
                { name: "Ibiza" },
                { name: "León" },
                { name: "Toledo" },
                { name: "Arona" },
                { name: "Ateca" },
                { name: "Tarraco" },
            ],
        },
        {
            brand: "Fiat",
            models: [
                { name: "Uno" },
                { name: "Mobi" },
                { name: "Argo" },
                { name: "Cronos" },
                { name: "Pulse" },
                { name: "Fastback" },
                { name: "Palio" },
                { name: "Strada" },
            ],
        },
        {
            brand: "Jeep",
            models: [
                { name: "Wrangler" },
                { name: "Grand Cherokee" },
                { name: "Cherokee" },
                { name: "Renegade" },
                { name: "Compass" },
                { name: "Gladiator" },
            ],
        },
        {
            brand: "Dodge",
            models: [
                { name: "Attitude" },
                { name: "Charger" },
                { name: "Challenger" },
                { name: "Durango" },
                { name: "Ram" },
            ],
        },
    ];

    await Promise.all(
        carBrandsWithModels.map(async (item) => {
            await prisma.brand.create({
                data: {
                    name: item.brand,
                    models: {
                        create: item.models
                    }
                }
            })
        })
    );
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