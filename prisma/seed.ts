import { AIRPORTS } from "../lib/airports";
import { LOUNGES } from "../lib/lounges";
import { prisma } from "../lib/prisma";

async function main() {
  // Airports
  for (const a of AIRPORTS) {
    await prisma.airport.upsert({
      where: { iata: a.iata },
      update: { name: a.name, city: a.city, country: a.country, lat: a.lat, lon: a.lon },
      create: { iata: a.iata, name: a.name, city: a.city, country: a.country, lat: a.lat, lon: a.lon },
    });
  }

  // Lounges
  for (const l of LOUNGES) {
    const lounge = await prisma.lounge.upsert({
      where: { id: l.id },
      update: {
        airportIata: l.airportIata,
        type: l.type,
        name: l.name,
        terminal: l.terminal,
        locationHint: l.locationHint,
        address: l.address,
      },
      create: {
        id: l.id,
        airportIata: l.airportIata,
        type: l.type,
        name: l.name,
        terminal: l.terminal,
        locationHint: l.locationHint,
        address: l.address,
      },
    });

    // Replace accepted programs
    await prisma.acceptedProgram.deleteMany({ where: { loungeId: lounge.id } });
    if (l.acceptedPrograms.length) {
      await prisma.acceptedProgram.createMany({
        data: l.acceptedPrograms.map((program) => ({ loungeId: lounge.id, program })),
      });
    }

    // Replace rules
    await prisma.loungeRule.deleteMany({ where: { loungeId: lounge.id } });
    if (l.rules.length) {
      await prisma.loungeRule.createMany({
        data: l.rules.map((r) => ({ loungeId: lounge.id, label: r.label, value: r.value })),
      });
    }
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

