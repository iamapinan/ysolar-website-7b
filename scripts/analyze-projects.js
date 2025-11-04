// Script to analyze project names from Google Drive file list
const files = [
  'LINE_ALBUM_บ้านโคกสี_250826_55_0.jpg',
  'LINE_ALBUM_บ้านโคกสี_250826_60_0.jpg',
  'LINE_ALBUM_บ้านโคกสี_250826_65_0.jpg',
  'LINE_ALBUM_บ้านโคกสี_250826_68_0.jpg',
  'LINE_ALBUM_บ้านโคกสี_250826_91_0.jpg',
  'LINE_ALBUM_บ้านโคกสี_250826_92_0.jpg',
  'LINE_ALBUM_บ้านโคกสี_250826_107_0.jpg',
  'LINE_ALBUM_บ้านโคกสี_250826_110_0.jpg',
  'LINE_ALBUM_บ้านโคกสี_250826_113_0.jpg',
  'LINE_ALBUM_พันธ์ทวีโคกสี HyBrid 10KW แบต 300Ah + Ongrid 5KW_250919_1.jpg',
  'LINE_ALBUM_พันธ์ทวีโคกสี HyBrid 10KW แบต 300Ah + Ongrid 5KW_250919_2.jpg',
  'LINE_ALBUM_พันธ์ทวีโคกสี HyBrid 10KW แบต 300Ah + Ongrid 5KW_250919_3.jpg',
  'LINE_ALBUM_พันธ์ทวีโคกสี HyBrid 10KW แบต 300Ah + Ongrid 5KW_250919_4.jpg',
  'LINE_ALBUM_พันธ์ทวีโคกสี HyBrid 10KW แบต 300Ah + Ongrid 5KW_250919_5.jpg',
  'LINE_ALBUM_พันธ์ทวีโคกสี HyBrid 10KW แบต 300Ah + Ongrid 5KW_250919_6.jpg',
  'LINE_ALBUM_พันธ์ทวีโคกสี HyBrid 10KW แบต 300Ah + Ongrid 5KW_250919_7.jpg',
  'LINE_ALBUM_พันธ์ทวีโคกสี HyBrid 10KW แบต 300Ah + Ongrid 5KW_250919_8.jpg',
  'LINE_ALBUM_พันธ์ทวีโคกสี HyBrid 10KW แบต 300Ah + Ongrid 5KW_250919_9.jpg',
  'LINE_ALBUM_พันธ์ทวีโคกสี HyBrid 10KW แบต 300Ah + Ongrid 5KW_250919_10.jpg',
  'LINE_ALBUM_พันธ์ทวีโคกสี HyBrid 10KW แบต 300Ah + Ongrid 5KW_250919_11.jpg',
  'LINE_ALBUM_พันธ์ทวีโคกสี HyBrid 10KW แบต 300Ah + Ongrid 5KW_250919_12.jpg',
  'LINE_ALBUM_พันธ์ทวีโคกสี HyBrid 10KW แบต 300Ah + Ongrid 5KW_250919_13.jpg',
  'LINE_ALBUM_พันธ์ทวีโคกสี HyBrid 10KW แบต 300Ah + Ongrid 5KW_250919_14.jpg',
  'LINE_ALBUM_พันธ์ทวีโคกสี HyBrid 10KW แบต 300Ah + Ongrid 5KW_250919_15.jpg',
  'LINE_ALBUM_พันธ์ทวีโคกสี HyBrid 10KW แบต 300Ah + Ongrid 5KW_250919_16.jpg',
  'LINE_ALBUM_พันธ์ทวีโคกสี HyBrid 10KW แบต 300Ah + Ongrid 5KW_250919_17.jpg',
  'LINE_ALBUM_พันธ์ทวีโคกสี HyBrid 10KW แบต 300Ah + Ongrid 5KW_250919_18.jpg',
  'LINE_ALBUM_พันธ์ทวีโคกสี HyBrid 10KW แบต 300Ah + Ongrid 5KW_250919_19.jpg',
  'LINE_ALBUM_พันธ์ทวีโคกสี HyBrid 10KW แบต 300Ah + Ongrid 5KW_250919_20.jpg',
  'LINE_ALBUM_พันธ์ทวีโคกสี HyBrid 10KW แบต 300Ah + Ongrid 5KW_250919_21.jpg',
  'LINE_ALBUM_พันธ์ทวีโคกสี HyBrid 10KW แบต 300Ah + Ongrid 5KW_250919_22.jpg',
  'LINE_ALBUM_พันธ์ทวีโคกสี HyBrid 10KW แบต 300Ah + Ongrid 5KW_250919_23.jpg',
  'LINE_ALBUM_พันธ์ทวีโคกสี HyBrid 10KW แบต 300Ah + Ongrid 5KW_250919_24.jpg',
  'LINE_ALBUM_พันธ์ทวีโคกสี HyBrid 10KW แบต 300Ah + Ongrid 5KW_250919_25.jpg',
  'LINE_ALBUM_พันธ์ทวีโคกสี HyBrid 10KW แบต 300Ah + Ongrid 5KW_250919_26.jpg',
  'LINE_ALBUM_พันธ์ทวีโคกสี HyBrid 10KW แบต 300Ah + Ongrid 5KW_250919_27.jpg',
  'LINE_ALBUM_พันธ์ทวีโคกสี HyBrid 10KW แบต 300Ah + Ongrid 5KW_250919_28.jpg',
  'LINE_ALBUM_พันธ์ทวีโคกสี HyBrid 10KW แบต 300Ah + Ongrid 5KW_250919_29.jpg',
  'LINE_ALBUM_พันธ์ทวีโคกสี HyBrid 10KW แบต 300Ah + Ongrid 5KW_250919_30.jpg',
  'LINE_ALBUM_พันธ์ทวีโคกสี HyBrid 10KW แบต 300Ah + Ongrid 5KW_250919_31.jpg',
  'LINE_ALBUM_พันธ์ทวีโคกสี HyBrid 10KW แบต 300Ah + Ongrid 5KW_250919_32.jpg',
  'LINE_ALBUM_พันธ์ทวีโคกสี HyBrid 10KW แบต 300Ah + Ongrid 5KW_250919_33.jpg',
  'LINE_ALBUM_พันธ์ทวีโคกสี HyBrid 10KW แบต 300Ah + Ongrid 5KW_250919_34.jpg',
  'LINE_ALBUM_พันธ์ทวีโคกสี HyBrid 10KW แบต 300Ah + Ongrid 5KW_250919_35.jpg',
  'LINE_ALBUM_พันธ์ทวีโคกสี HyBrid 10KW แบต 300Ah + Ongrid 5KW_250919_36.jpg',
  'LINE_ALBUM_พันธ์ทวีโคกสี HyBrid 10KW แบต 300Ah + Ongrid 5KW_250919_37.jpg',
  'LINE_ALBUM_พันธ์ทวีโคกสี HyBrid 10KW แบต 300Ah + Ongrid 5KW_250919_38.jpg',
  'LINE_ALBUM_พันธ์ทวีโคกสี HyBrid 10KW แบต 300Ah + Ongrid 5KW_250919_39.jpg',
  'LINE_ALBUM_พันธ์ทวีโคกสี HyBrid 10KW แบต 300Ah + Ongrid 5KW_250919_40.jpg',
  'LINE_ALBUM_พันธ์ทวีโคกสี HyBrid 10KW แบต 300Ah + Ongrid 5KW_250919_41.jpg',
];

// Parse project names - more flexible parsing
function parseProjectName(filename) {
  // Remove LINE_ALBUM_ prefix and .jpg suffix
  let name = filename.replace('LINE_ALBUM_', '').replace('.jpg', '').replace('_0', '');
  
  // Pattern: ProjectName_Spec_Date_Number or ProjectName_Date_Number
  // Split by underscore
  const parts = name.split('_');
  
  // Last part should be number
  const number = parts.pop();
  
  // Second to last should be date (6 digits: YYMMDD)
  const date = parts.pop();
  
  // Everything before date is project name + spec
  const projectAndSpec = parts.join('_');
  
  // Try to separate project name and spec
  // Look for patterns that indicate spec section
  // Spec patterns: contains numbers with units (KW, Ah, etc.), or technical terms
  
  // Pattern 1: Look for "HyBrid", "Ongrid" and technical specs
  const specPattern = /(HyBrid|Ongrid|แบต|KW|Ah|\+\s*\d+KW|\d+KW\s*แบต)/i;
  const specMatch = projectAndSpec.match(specPattern);
  
  let spec = '';
  let projectName = projectAndSpec;
  
  if (specMatch) {
    // Find where spec starts
    const specIndex = projectAndSpec.indexOf(specMatch[0]);
    
    if (specIndex > 0) {
      // Extract project name (before spec)
      projectName = projectAndSpec.substring(0, specIndex).trim();
      spec = projectAndSpec.substring(specIndex).trim();
    } else if (specIndex === 0) {
      // Spec starts at beginning, might be part of project name
      // Check if there's a space or separator
      const spaceIndex = projectAndSpec.indexOf(' ');
      if (spaceIndex > 0) {
        projectName = projectAndSpec.substring(0, spaceIndex).trim();
        spec = projectAndSpec.substring(spaceIndex).trim();
      }
    }
  }
  
  // If no spec pattern found, try to detect if last part looks like spec
  if (!spec && projectAndSpec.length > 0) {
    // Check if ending has numbers with units (likely spec)
    const endingSpecPattern = /(\d+\s*(KW|Ah|W|V|A|H)\s*.*)$/i;
    const endingMatch = projectAndSpec.match(endingSpecPattern);
    
    if (endingMatch) {
      const endingIndex = projectAndSpec.indexOf(endingMatch[1]);
      if (endingIndex > 0) {
        projectName = projectAndSpec.substring(0, endingIndex).trim();
        spec = projectAndSpec.substring(endingIndex).trim();
      }
    }
  }
  
  // Clean up - remove trailing/leading underscores or spaces
  projectName = projectName.replace(/^_+|_+$/g, '').trim();
  spec = spec.replace(/^_+|_+$/g, '').trim();
  
  // If still no spec, the whole thing is project name
  if (!spec || spec === '') {
    projectName = projectAndSpec;
    spec = '';
  }
  
  return {
    fullName: projectAndSpec,
    projectName: projectName,
    spec: spec,
    date: date,
    number: number,
    originalFilename: filename
  };
}

// Group files by project
const projects = {};

files.forEach(file => {
  const parsed = parseProjectName(file);
  const key = parsed.projectName + (parsed.spec ? '_' + parsed.spec : '');
  
  if (!projects[key]) {
    projects[key] = {
      projectName: parsed.projectName,
      spec: parsed.spec,
      date: parsed.date,
      files: []
    };
  }
  
  projects[key].files.push({
    filename: file,
    number: parsed.number,
    date: parsed.date
  });
});

// Sort files by number
Object.keys(projects).forEach(key => {
  projects[key].files.sort((a, b) => {
    const numA = parseInt(a.number) || 0;
    const numB = parseInt(b.number) || 0;
    return numA - numB;
  });
});

// Output results
console.log('Found projects:', Object.keys(projects).length);
console.log('\n=== Projects ===\n');

Object.keys(projects).forEach((key, index) => {
  const project = projects[key];
  console.log(`${index + 1}. ${project.projectName}`);
  if (project.spec) {
    console.log(`   สเปค: ${project.spec}`);
  }
  console.log(`   วันที่: ${project.date}`);
  console.log(`   จำนวนรูป: ${project.files.length}`);
  console.log(`   ไฟล์: ${project.files.map(f => f.filename).join(', ')}`);
  console.log('');
});

