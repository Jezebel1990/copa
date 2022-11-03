import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {    
    const user = await prisma.user.create({
        data: {
            name: 'Jezebel Guedes',
            email: 'notrebell@hotmail.com',
            avatarUrl: 'https://github.com/Jezebel1990.png',

        }
    })
    const pool = await prisma.pool.create({
        data: {
            title: 'Example Pool',
            code: 'BOL123',
            ownerId: user.id,

            participants: {
                create: {
                    userId: user.id
                }
            }
        }
    })
 await prisma.game.create({
    data: {
        date: '2022-11-03T05:46:38.360Z',
        firstTeamCountryCode: 'BR',
        secundTeamCountryCode: 'AR',

        guesses: {
            create: {
                firstTeamPoints: 2,
                secondTeamPoints: 1,

                participant: {
                    connect: {
                        userId_poolId: {
                            userId: user.id,
                            poolId: pool.id,
                        }
                    }
                }
            }
        }
    }
})

 }
main()