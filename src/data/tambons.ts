import { districts as districtList, pm25Color, tempColor } from "./khonkaen";

export interface Tambon {
  name: string;
  district: string;
  lat: number;
  lng: number;
  temperature: number;
  pm25: number;
  heat: number;
}

export interface MuangTambonCoord {
  nameTh: string;
  nameEn: string;
  lat: number;
  lng: number;
}

export interface KhonKaenTambonCoord {
  district: string;
  name: string;
  lat: number;
  lng: number;
}

export const khonKaenAllTambons: KhonKaenTambonCoord[] = [
  // === 1. อำเภอเมืองขอนแก่น ===
  { district: "เมืองขอนแก่น", name: "ในเมือง", lat: 16.4322, lng: 102.8234 },
  { district: "เมืองขอนแก่น", name: "ศิลา", lat: 16.4851, lng: 102.8422 },
  { district: "เมืองขอนแก่น", name: "บ้านเป็ด", lat: 16.4255, lng: 102.7663 },
  { district: "เมืองขอนแก่น", name: "หนองโก", lat: 16.4286, lng: 102.6687 },
  { district: "เมืองขอนแก่น", name: "สำราญ", lat: 16.5414, lng: 102.8540 },
  { district: "เมืองขอนแก่น", name: "โคกสี", lat: 16.4883, lng: 102.9467 },
  { district: "เมืองขอนแก่น", name: "โนนท่อน", lat: 16.5982, lng: 102.7933 },
  { district: "เมืองขอนแก่น", name: "บึงเนียม", lat: 16.4561, lng: 102.9211 },
  { district: "เมืองขอนแก่น", name: "ดอนหัน", lat: 16.3262, lng: 102.7844 },
  { district: "เมืองขอนแก่น", name: "เมืองเก่า", lat: 16.3986, lng: 102.8252 },
  { district: "เมืองขอนแก่น", name: "พระลับ", lat: 16.4194, lng: 102.8876 },
  { district: "เมืองขอนแก่น", name: "ท่าพระ", lat: 16.3387, lng: 102.8094 },
  { district: "เมืองขอนแก่น", name: "ดอนช้าง", lat: 16.3311, lng: 102.7214 },
  { district: "เมืองขอนแก่น", name: "บ้านหว้า", lat: 16.3664, lng: 102.7360 },
  { district: "เมืองขอนแก่น", name: "บ้านค้อ", lat: 16.5621, lng: 102.7291 },
  { district: "เมืองขอนแก่น", name: "แดงใหญ่", lat: 16.4678, lng: 102.7275 },
  { district: "เมืองขอนแก่น", name: "สาวะถี", lat: 16.4689, lng: 102.6322 },

  // === 2. อำเภอบ้านฝาง ===
  { district: "บ้านฝาง", name: "หนองบัว", lat: 16.4533, lng: 102.6121 },
  { district: "บ้านฝาง", name: "บ้านฝาง", lat: 16.4589, lng: 102.6378 },
  { district: "บ้านฝาง", name: "ป่ามะนาว", lat: 16.4952, lng: 102.5511 },
  { district: "บ้านฝาง", name: "โคกงาม", lat: 16.4022, lng: 102.5843 },
  { district: "บ้านฝาง", name: "โนนฆ้อง", lat: 16.3944, lng: 102.6312 },
  { district: "บ้านฝาง", name: "เบญจทรัพย์", lat: 16.4411, lng: 102.5223 },
  { district: "บ้านฝาง", name: "บ้านเหล่า", lat: 16.5122, lng: 102.6189 },

  // === 3. อำเภอพระยืน ===
  { district: "พระยืน", name: "พระยืน", lat: 16.3211, lng: 102.6511 },
  { district: "พระยืน", name: "พระบุ", lat: 16.2754, lng: 102.6321 },
  { district: "พระยืน", name: "บ้านโฮ่ง", lat: 16.3422, lng: 102.5834 },
  { district: "พระยืน", name: "หนองแวง", lat: 16.3012, lng: 102.5712 },
  { district: "พระยืน", name: "ขามป้อม", lat: 16.3534, lng: 102.6643 },

  // === 4. อำเภอหนองเรือ ===
  { district: "หนองเรือ", name: "หนองเรือ", lat: 16.4922, lng: 102.4312 },
  { district: "หนองเรือ", name: "บ้านเม็ง", lat: 16.4633, lng: 102.4843 },
  { district: "หนองเรือ", name: "บ้านกง", lat: 16.5412, lng: 102.4111 },
  { district: "หนองเรือ", name: "ยางคำ", lat: 16.3721, lng: 102.3943 },
  { district: "หนองเรือ", name: "จระเข้", lat: 16.4611, lng: 102.3722 },
  { district: "หนองเรือ", name: "โนนทอง", lat: 16.5122, lng: 102.3312 },
  { district: "หนองเรือ", name: "กุดกว้าง", lat: 16.5643, lng: 102.4721 },
  { district: "หนองเรือ", name: "โนนทัน", lat: 16.4132, lng: 102.4543 },
  { district: "หนองเรือ", name: "บ้านผือ", lat: 16.5211, lng: 102.5112 },
  { district: "หนองเรือ", name: "โนนสะอาด", lat: 16.3843, lng: 102.3412 },

  // === 5. อำเภอชุมแพ ===
  { district: "ชุมแพ", name: "ชุมแพ", lat: 16.5443, lng: 102.0654 },
  { district: "ชุมแพ", name: "โนนหัน", lat: 16.5912, lng: 102.0012 },
  { district: "ชุมแพ", name: "นาหนองทุ่ม", lat: 16.6832, lng: 101.9543 },
  { district: "ชุมแพ", name: "โนนสะอาด", lat: 16.5121, lng: 102.1321 },
  { district: "ชุมแพ", name: "ขัวเรียง", lat: 16.5111, lng: 102.0423 },
];

const khonKaenAllTambonCoords = new Map(
  khonKaenAllTambons.map((t) => [`${t.district}|${t.name}`, { lat: t.lat, lng: t.lng }])
);

export const muangKhonKaenTambons: MuangTambonCoord[] = [
  { nameTh: "ในเมือง", nameEn: "Nai Mueang", lat: 16.4322, lng: 102.8234 },
  { nameTh: "ศิลา", nameEn: "Sila", lat: 16.4851, lng: 102.8422 },
  { nameTh: "บ้านเป็ด", nameEn: "Ban Pet", lat: 16.4255, lng: 102.7663 },
  { nameTh: "หนองโก", nameEn: "Nong Ko", lat: 16.4286, lng: 102.6687 },
  { nameTh: "สำราญ", nameEn: "Samran", lat: 16.5414, lng: 102.8540 },
  { nameTh: "โคกสี", nameEn: "Khok Si", lat: 16.4883, lng: 102.9467 },
  { nameTh: "โนนท่อน", nameEn: "Non Thon", lat: 16.5982, lng: 102.7933 },
  { nameTh: "บึงเนียม", nameEn: "Bueng Niam", lat: 16.4561, lng: 102.9211 },
  { nameTh: "ดอนหัน", nameEn: "Don Han", lat: 16.3262, lng: 102.7844 },
  { nameTh: "เมืองเก่า", nameEn: "Mueang Kao", lat: 16.3986, lng: 102.8252 },
  { nameTh: "พระลับ", nameEn: "Phra Lap", lat: 16.4194, lng: 102.8876 },
  { nameTh: "ท่าพระ", nameEn: "Tha Phra", lat: 16.3387, lng: 102.8094 },
  { nameTh: "ดอนช้าง", nameEn: "Don Chang", lat: 16.3311, lng: 102.7214 },
  { nameTh: "บ้านหว้า", nameEn: "Ban Wa", lat: 16.3664, lng: 102.7360 },
  { nameTh: "บ้านค้อ", nameEn: "Ban Kho", lat: 16.5621, lng: 102.7291 },
  { nameTh: "แดงใหญ่", nameEn: "Daeng Yai", lat: 16.4678, lng: 102.7275 },
  { nameTh: "สาวะถี", nameEn: "Sawathi", lat: 16.4689, lng: 102.6322 },
];

export const muangKhonKaenCenter = { lat: 16.4464, lng: 102.7855 };

const muangKhonKaenTambonCoords = Object.fromEntries(
  muangKhonKaenTambons.map((t) => [t.nameTh, { lat: t.lat, lng: t.lng }])
);

// ชื่อตำบลจำลองรายอำเภอ (mock data)
const tambonNames: Record<string, string[]> = {
  "เมืองขอนแก่น": muangKhonKaenTambons.map((t) => t.nameTh),
  "บ้านฝาง": ["บ้านฝาง", "หนองบัว", "ป่ามะนาว", "โนนฆ้อง", "บ้านเหล่า"],
  "พระยืน": ["พระยืน", "พระบุ", "บ้านโต้น", "หนองแวง", "ขามป้อม"],
  "หนองเรือ": ["หนองเรือ", "บ้านเม็ง", "บ้านกง", "ยางคำ", "จระเข้", "โนนทอง"],
  "ชุมแพ": ["ชุมแพ", "โนนหัน", "นาหนองทุ่ม", "โนนอุดม", "ขัวเรียง", "หนองไผ่"],
  "สีชมพู": ["สีชมพู", "ศรีสุข", "นาจาน", "วังเพิ่ม", "ภูห่าน"],
  "น้ำพอง": ["น้ำพอง", "วังชัย", "หนองกุง", "บัวใหญ่", "ทรายมูล", "ท่ากระเสริม"],
  "อุบลรัตน์": ["โคกสูง", "บ้านดง", "เขื่อนอุบลรัตน์", "นาคำ", "ทุ่งโป่ง"],
  "กระนวน": ["หนองโก", "หนองกุงใหญ่", "ห้วยโจด", "บ้านฝาง", "ดูนสาด"],
  "บ้านไผ่": ["บ้านไผ่", "ในเมือง", "หินตั้ง", "เมืองเพีย", "หนองน้ำใส", "ป่าปอ"],
  "เปือยน้อย": ["เปือยน้อย", "วังม่วง", "ขามป้อม", "สระแก้ว"],
  "พล": ["เมืองพล", "โจดหนองแก", "หนองมะเขือ", "หัวทุ่ง", "เก่างิ้ว"],
  "แวงใหญ่": ["แวงใหญ่", "คอนฉิม", "ใหม่นาเพียง", "โนนทอง", "โนนสะอาด"],
  "แวงน้อย": ["แวงน้อย", "ก้านเหลือง", "ละหานนา", "ท่านางแนว", "ท่าวัด"],
  "หนองสองห้อง": ["หนองสองห้อง", "คึมชาด", "หนองเม็ก", "ดอนดู่", "ตะกั่วป่า"],
  "ภูเวียง": ["ภูเวียง", "นาชุมแสง", "หว้าทอง", "กุดขอนแก่น", "บ้านเรือ", "ดินดำ"],
  "มัญจาคีรี": ["กุดเค้า", "สวนหม่อน", "หนองแปน", "โพนเพ็ก", "คำแคน"],
  "ชนบท": ["ชนบท", "กุดเพียขอม", "วังแสง", "ห้วยแก", "บ้านแท่น"],
  "เขาสวนกวาง": ["เขาสวนกวาง", "ดงเมืองแอม", "นางิ้ว", "โนนสมบูรณ์", "คำม่วง"],
  "ภูผาม่าน": ["ภูผาม่าน", "วังสวาบ", "นาฝาย", "โนนคอม", "ห้วยม่วง"],
  "ซำสูง": ["กระนวน", "คำแมด", "บ้านโนน", "คูคำ", "ห้วยเตย"],
  "โคกโพธิ์ไชย": ["บ้านโคก", "โพธิ์ไชย", "ซับสมบูรณ์", "นาแพง"],
  "หนองนาคำ": ["กุดธาตุ", "บ้านโคก", "ขนวน"],
  "บ้านแฮด": ["บ้านแฮด", "โคกสำราญ", "โนนสมบูรณ์", "หนองแซง"],
  "โนนศิลา": ["โนนศิลา", "หนองปลาหมอ", "บ้านหัน", "เปือยใหญ่", "โนนแดง"],
  "เวียงเก่า": ["ในเมือง", "เมืองเก่าพัฒนา", "เขาน้อย"],
};

// deterministic offset around district center (kept small to stay within the district)
function offset(seed: string, i: number) {
  let h = 0;
  for (let k = 0; k < seed.length; k++) h = (h * 31 + seed.charCodeAt(k)) | 0;
  const angle = ((Math.abs(h) + i * 47) % 360) * (Math.PI / 180);
  const radius = 0.0015 + (i % 3) * 0.001;
  return [Math.cos(angle) * radius, Math.sin(angle) * radius];
}

function jitter(seed: string, i: number, base: number, range: number) {
  const r = Math.sin((seed.charCodeAt(0) + i) * 12.9898) * 43758.5453;
  return base + ((r - Math.floor(r)) - 0.5) * range;
}

export const tambons: Tambon[] = districtList.flatMap((d) => {
  const names = tambonNames[d.name] ?? [];
  return names.map((n, i) => {
    const coordOverride = khonKaenAllTambonCoords.get(`${d.name}|${n}`);
    const lat = coordOverride ? coordOverride.lat : d.lat + offset(d.name + n, i)[0];
    const lng = coordOverride ? coordOverride.lng : d.lng + offset(d.name + n, i)[1];
    return {
      name: n,
      district: d.name,
      lat,
      lng,
      temperature: Math.round(jitter(n, i, d.temperature, 3) * 10) / 10,
      pm25: Math.max(5, Math.round(jitter(n, i + 1, d.pm25, 20))),
      heat: Math.max(0.05, Math.min(1, jitter(n, i + 2, d.heat, 0.2))),
    };
  });
});

export { pm25Color, tempColor };
