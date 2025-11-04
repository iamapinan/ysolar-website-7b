// Script to analyze all 11 projects from Google Drive
const projects = [
  {
    filename: 'LINE_ALBUM_บ้านโคกสี_250826_55_0.jpg',
    projectName: 'บ้านโคกสี',
    spec: '',
    date: '250826',
    location: '',
  },
  {
    filename: 'LINE_ALBUM_พันธ์ทวีโคกสี HyBrid 10KW แบต 300Ah + Ongrid 5KW_250919_1.jpg',
    projectName: 'พันธ์ทวีโคกสี',
    spec: 'HyBrid 10KW แบต 300Ah + Ongrid 5KW',
    date: '250919',
    location: '',
  },
  {
    filename: 'LINE_ALBUM_พันธ์ทวีเชียงเครือ Hybrid 10KW แบต200Ah_250919_1.jpg',
    projectName: 'พันธ์ทวีเชียงเครือ',
    spec: 'Hybrid 10KW แบต200Ah',
    date: '250919',
    location: '',
  },
  {
    filename: 'LINE_ALBUM_พันธ์ทวีบึงวิชัย Hybrid 10KW แบต 200Ah_250919_1.jpg',
    projectName: 'พันธ์ทวีบึงวิชัย',
    spec: 'Hybrid 10KW แบต 200Ah',
    date: '250919',
    location: '',
  },
  {
    filename: 'LINE_ALBUM_พันธ์ทวีโพนงาม มหาสารคาม Ongrid 5KW+Hybrid5KW_250919_1.jpg',
    projectName: 'พันธ์ทวีโพนงาม',
    spec: 'Ongrid 5KW+Hybrid5KW',
    date: '250919',
    location: 'มหาสารคาม',
  },
  {
    filename: 'LINE_ALBUM_พันธ์ทวีศรีบุญเรือง จ.หนองบัวลำภู Ongrid 50KW_250919_1.jpg',
    projectName: 'พันธ์ทวีศรีบุญเรือง',
    spec: 'Ongrid 50KW',
    date: '250919',
    location: 'หนองบัวลำภู',
  },
  {
    filename: 'LINE_ALBUM_พันธ์ทวีสำนักงานใหญ่ ขอนแก่น ติดตั้งเ_250919_1.jpg',
    projectName: 'พันธ์ทวีสำนักงานใหญ่',
    spec: '', // ชื่อไฟล์ถูกตัด
    date: '250919',
    location: 'ขอนแก่น',
  },
  {
    filename: 'LINE_ALBUM_พันธ์ทวีหนองหญ้าไซ อุดรธานี Ongrid 30KW+Hybrid10KW_250919_1.jpg',
    projectName: 'พันธ์ทวีหนองหญ้าไซ',
    spec: 'Ongrid 30KW+Hybrid10KW',
    date: '250919',
    location: 'อุดรธานี',
  },
  {
    filename: 'LINE_ALBUM_หมู่บ้านเรนจ์วูดปทุมธานี หลังละ 5-10KW_250919_1.jpg',
    projectName: 'หมู่บ้านเรนจ์วูด',
    spec: 'หลังละ 5-10KW',
    date: '250919',
    location: 'ปทุมธานี',
  },
  {
    filename: 'LINE_ALBUM_หัวสะพานการค้า มุกดาหาร Ongrid 10KW_250919_1.jpg',
    projectName: 'หัวสะพานการค้า',
    spec: 'Ongrid 10KW',
    date: '250919',
    location: 'มุกดาหาร',
  },
  {
    filename: 'LINE_ALBUM_หัวสะพานการค้า_250826_57_0.jpg',
    projectName: 'หัวสะพานการค้า',
    spec: '',
    date: '250826',
    location: '', // อาจเป็นมุกดาหารเหมือนโครงการที่ 10
  },
];

// Helper function to extract capacity from spec
function extractCapacity(spec) {
  if (!spec) return null;
  
  // Try to find total capacity
  const patterns = [
    /(\d+)\s*KW/i,
    /(\d+)-(\d+)\s*KW/i,
    /Hybrid\s*(\d+)\s*KW/i,
    /Ongrid\s*(\d+)\s*KW/i,
  ];
  
  let totalCapacity = 0;
  
  // Extract all KW values
  const kwMatches = spec.match(/(\d+)\s*KW/gi);
  if (kwMatches) {
    kwMatches.forEach(match => {
      const num = parseInt(match.match(/\d+/)[0]);
      totalCapacity += num;
    });
  }
  
  // For range like "5-10KW", use the higher value
  const rangeMatch = spec.match(/(\d+)-(\d+)\s*KW/i);
  if (rangeMatch) {
    totalCapacity = Math.max(parseInt(rangeMatch[1]), parseInt(rangeMatch[2]));
  }
  
  return totalCapacity > 0 ? totalCapacity : null;
}

// Helper function to create slug
function createSlug(projectName) {
  return projectName
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\u0E00-\u0E7F\w-]/g, '')
    .replace(/--+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Helper function to format date
function formatDate(dateStr) {
  // YYMMDD -> YYYY-MM-DD
  if (dateStr.length === 6) {
    const year = '20' + dateStr.substring(0, 2);
    const month = dateStr.substring(2, 4);
    const day = dateStr.substring(4, 6);
    return `${year}-${month}-${day}`;
  }
  return null;
}

console.log('=== สรุปโครงการทั้งหมด ===\n');

projects.forEach((project, index) => {
  const capacity = extractCapacity(project.spec);
  const slug = createSlug(project.projectName);
  const formattedDate = formatDate(project.date);
  
  console.log(`${index + 1}. ${project.projectName}`);
  if (project.location) {
    console.log(`   สถานที่: ${project.location}`);
  }
  if (project.spec) {
    console.log(`   สเปค: ${project.spec}`);
  } else {
    console.log(`   สเปค: (ไม่ระบุ)`);
  }
  if (capacity) {
    console.log(`   กำลังไฟฟ้า: ${capacity} KW`);
  }
  console.log(`   วันที่: ${formattedDate || project.date}`);
  console.log(`   Slug: ${slug}`);
  console.log(`   รูปภาพ: ${project.filename}`);
  console.log('');
});

