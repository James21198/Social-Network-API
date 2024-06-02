const names = [
  'Aaran',
  'Aaren',
  'Aarez',
  'Aarman',
  'Aaron',
  'Aaron-James',
  'Aarron',
  'Aaryan',
  'Aaryn',
  'Aayan',
  'Aazaan',
  'Abaan',
  'Abbas',
  'Abdallah',
  'Abdalroof',
  'Abdihakim',
  'Abdirahman',
  'Abdisalam',
  'Abdul',
  'Abdul-Aziz',
  'Abdulbasir',
  'Abdulkadir',
  'Abdulkarem',
  'Smith',
  'Jones',
  'Coollastname',
  'enter_name_here',
  'Ze',
  'Zechariah',
  'Zeek',
  'Zeeshan',
  'Zeid',
  'Zein',
  'Zen',
  'Zendel',
  'Zenith',
  'Zennon',
  'Zeph',
  'Zerah',
  'Zhen',
  'Zhi',
  'Zhong',
  'Zhuo',
  'Zi',
  'Zidane',
  'Zijie',
  'Zinedine',
  'Zion',
  'Zishan',
  'Ziya',
  'Ziyaan',
  'Zohaib',
  'Zohair',
  'Zoubaeir',
  'Zubair',
  'Zubayr',
  'Zuriel',
  'Xander',
  'Jared',
  'Courtney',
  'Gillian',
  'Clark',
  'Jared',
  'Grace',
  'Kelsey',
  'Tamar',
  'Alex',
  'Mark',
  'Tamar',
  'Farish',
  'Sarah',
  'Nathaniel',
  'Parker',
];

const thoughtDescriptions = [
  'You wont believe what happened here',
  'What a great day to do the garden',
  'Going out for a meal with the family',
  'Now Engaged!!!!',
  'Look at our new Dog!!!',
  'Look at our new Cat!!!',
  'I Definently recommend this Restaurant',
  'Had a shocking day at work',
  'Really need a holliday',
];

const reactionData = [
  'I cant believe this!!!',
  'Really???',
  'OMG!!!!',
  'Is everything ok?',
  'Call me!!',
  'How cute!!',
  'As if!!!',
  'How does that work?',
  'How was your Trip?',
  'This is shocking!!!',
  'I forgot about that',
  'How could that happen?',
  'Do you need to talk?',
  'This is too funny!!!',
  'Hahahahaha',
  'LOL!!!',
  'We need to meet up soon',
  'I cant get over this!!',
]

const getRandomEmail = () => {
  const names = getRandomName();
  return `${names.toLowerCase()}@example.com`
};

const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

const getRandomName = () =>
  `${getRandomArrItem(names)} ${getRandomArrItem(names)}`;

const getRandomThoughts = (int) => {
  const results = [];
  for (let i = 0; i < int; i++) {
    results.push({
      thoughtName: getRandomArrItem(thoughtDescriptions),
    });
  }
  return results;
};

const getRandomReaction = (int) => {
  let results = [];
  for (let i = 0; i < int; i++) {
    results.push({
      userName: getRandomName(),
      reactionBody: getRandomArrItem(reactionData),
    });
  }
  return results;
};

module.exports = { getRandomName, getRandomThoughts, getRandomEmail, getRandomReaction };
