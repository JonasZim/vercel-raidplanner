export default function GenerateImages() {
  const images = new Map<string, HTMLImageElement>();

  const imageNames = [
    "pld",
    "war",
    "drk",
    "gnb",
    "whm",
    "sch",
    "ast",
    "sge",
    "mnk",
    "drg",
    "nin",
    "sam",
    "rpr",
    "blm",
    "smn",
    "rdm",
    "brd",
    "mch",
    "dnc",
    "tank",
    "healer",
    "melee",
    "ranged",
    "caster",
    "boss",
    "way1",
    "way2",
    "way3",
    "way4",
    "wayA",
    "wayB",
    "wayC",
    "wayD",
    "dsrX",
    "dsrO",
    "dsrSquare",
    "dsrTriangle",
    "lc1",
    "lc2",
    "lc3",
    "lc4",
    "lc5",
    "lc6",
    "lc7",
    "lc8",
  ];

  imageNames.forEach((name) => {
    const image = new Image();
    image.src = `/icons/all/${name}.png`;
    images.set(name, image);
  });

  return images;
}
