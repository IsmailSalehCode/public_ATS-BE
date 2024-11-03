const users = [
  {
    id: "e0a13c2b-419b-4f74-8332-19e3fcfb4448",
    email: "centriu78@gmail.com",
    password: "barnStorm@654",
    name: "Ismail Saleh",
    phone: "0889907045",
    isAdmin: 1,
  },
  {
    id: "438d9f35-3cee-49c9-9bdd-c582a0aec3dc",
    email: "jcpc.eu@gmail.com",
    password: "aO_?5536",
    phone: "0889249558",
    name: "Osama Saleh",
    isAdmin: 1,
  },
];
const kiosks = [
  {
    id: "a54dd590-e4ab-40da-850c-987f6b8258b6",
    name: "k1",
  },
];
const employees = [
  {
    id: 1,
    name: "КРАСИМИР СТЕФАНОВ ЯНЧЕВ",
  },
  { id: 2, name: "ХАЛЕД ЯХИЯ АБУ ШЕЛЕ" },
  { id: 3, name: "АБДУЛКАДЕР АХМАД АЛСАЛЕХ" },
  { id: 4, name: "БИЛАЛ ЯХИЯ АБУШИЛА" },
  { id: 5, name: "УАЛИД ХАЛИЛ АЛСАЛЕМ" },
  { id: 6, name: "АХМАД ЮСЕФ РАСМИЕ АЛЛАХАМ" },
  { id: 7, name: "ЯСИН АЛМУСА ТАХА" },
  { id: 8, name: "АМЖАД ХАМЕД КАСЕМ" },
  { id: 9, name: "МОХАНАД САМИ СИХАМ КАНДИЛ" },
  { id: 10, name: "ВЕНЕЛИН АЛЕКСАНДРОВ КИРКОВ" },
  { id: 11, name: "СЛАВЕЙ ИЛИЯНОВ ДИМИТРОВ" },
  { id: 12, name: "МАРИЯ ЗИНОВИЕВА ЗИНОВИЕВА" },
  { id: 13, name: "АММАР АБДУЛКАРИМ СЕБСЕБИ" },
  { id: 14, name: "ОМАР СУЛЕЙМАН ХАСАН" },
  { id: 15, name: "АЛА ЯХИЯ АБУ ШЕЛЕ" },
  { id: 16, name: "МОХАМАД ХАФИ АЛЗРЕР" },
  { id: 17, name: "ХУСЕЙН ФАДЕЛ АЛРАХИЛ" },
  { id: 18, name: "ВАСИЛ ТОДОРОВ НАЙДЕНОВ" },
  { id: 19, name: "АБДУЛМИНИМ АХМАД ТАЯМУСА" },
  { id: 20, name: "ФИЛИП ВАСКОВ ФИЛИПОВ" },
  { id: 21, name: "АЛЕКСАНДЪР МЕТОДИЕВ КАРЛОВ" },
  { id: 22, name: "ДЖАСЕМ МОХАММАД АЛХАБИБ АЛХАМАДА" },
  { id: 23, name: "МОХАМАД ЮСЕФ ДЖАБЕР" },
  { id: 24, name: "САМИР ИНАД БУМАН" },
  { id: 25, name: "МОУМЕНА ЗИЯД ЗУБЕЙДА РАМАДАН" },
  { id: 26, name: "САМЕР АХМАД АЛШАХАДА" },
  { id: 27, name: "АЛИ САЛЕМ АЛАБДЕЛГАФУР" },
  { id: 28, name: "АЛМУТАСЕМ БЕЛАХ ИМАД АЛАХМАД" },
  { id: 29, name: "МОХАМАД ТАХА АЛХАДЖИ" },
  { id: 30, name: "ОМАР ИБРАХИМ АЛАХМАД" },
  { id: 31, name: "МОХАМАД АХМАД АЛСАЛЕХ" },
  { id: 32, name: "ШАДИ ХАЛИФА АЛСУЛЕЙМАН" },
  { id: 33, name: "МОХАМАД МУСТАФА АЛХАЛАФ" },
  { id: 34, name: "МАРИЯ ПЕТРОВА ТАСЕВА" },
];
const nfcTags = [
  {
    id: "6d738fa1",
    employeeId: 2,
  },
  {
    id: "5d4429a2",
    employeeId: 3,
  },
  {
    id: "0d406da1",
    employeeId: 4,
  },
  {
    id: "3eb5fb89",
    employeeId: 5,
  },
  {
    id: "7ebdfa89",
    employeeId: 6,
  },
  {
    id: "1e35278a",
    employeeId: 7,
  },
  {
    id: "ad8e8ea1",
    employeeId: 8,
  },
  {
    id: "9d186ba1",
    employeeId: 9,
  },
  {
    id: "ae46f990",
    employeeId: 10,
  },
  {
    id: "4dda8da1",
    employeeId: 11,
  },
  {
    id: "3ead6290",
    employeeId: 12,
  },
  {
    id: "9db268a1",
    employeeId: 13,
  },
  {
    id: "de9a0a90",
    employeeId: 14,
  },
  {
    id: "6e09fe89",
    employeeId: 15,
  },
  {
    id: "8da48da1",
    employeeId: 16,
  },
  {
    id: "4a3d0c1f",
    employeeId: 17,
  },
  {
    id: "af046808",
    employeeId: 18,
  },
  {
    id: "0e646590",
    employeeId: 19,
  },
  {
    id: "8f7b6708",
    employeeId: 20,
  },
  {
    id: "0ece6290",
    employeeId: 21,
  },
  {
    id: "cfdf7c08",
    employeeId: 22,
  },
  {
    id: "2f7e5f08",
    employeeId: 23,
  },
  {
    id: "7f8c5c08",
    employeeId: 24,
  },
  {
    id: "5fa66c08",
    employeeId: 25,
  },
  {
    id: "2fb06108",
    employeeId: 26,
  },
  {
    id: "af0b6408",
    employeeId: 27,
  },
  {
    id: "2f5e6508",
    employeeId: 28,
  },
  {
    id: "af8b6d08",
    employeeId: 29,
  },
  {
    id: "4f5c6d08",
    employeeId: 30,
  },
  {
    id: "cfee7708",
    employeeId: 31,
  },
  {
    id: "cf768708",
    employeeId: 32,
  },
  {
    id: "2f308708",
    employeeId: 33,
  },
  {
    id: "cf8b6308",
    employeeId: null,
  },
  {
    id: "ffdb8708",
    employeeId: null,
  },
  {
    id: "ff1aa908",
    employeeId: null,
  },
  {
    id: "efba8e08",
    employeeId: null,
  },
  {
    id: "0f528f08",
    employeeId: null,
  },
  {
    id: "5fd556308",
    employeeId: null,
  },
  {
    id: "9f366208",
    employeeId: null,
  },
  // {
  //   id: "",
  //   employeeId: null,
  // },
  // {
  //   id: "",
  //   employeeId: null,
  // },
  // {
  //   id: "",
  //   employeeId: null,
  // },
  // {
  //   id: "",
  //   employeeId: null,
  // },
  // {
  //   id: "",
  //   employeeId: null,
  // },
  // {
  //   id: "",
  //   employeeId: null,
  // },
  // {
  //   id: "",
  //   employeeId: null,
  // },
  // {
  //   id: "",
  //   employeeId: null,
  // },
  // {
  //   id: "",
  //   employeeId: null,
  // },
  // {
  //   id: "",
  //   employeeId: null,
  // },
];

const attendanceEntries = null;

module.exports = { users, kiosks, employees, nfcTags, attendanceEntries };
