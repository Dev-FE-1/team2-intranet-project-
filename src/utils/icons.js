// Job
const colorCode = {
  'ocean-blue': '4b49ac',
  'jordy-blue': '98bdff',
};

// 사용자 홈 대시보드
const phoneIcon = (width = 24, height = 24, fill = colorCode['ocean-blue']) => {
  return `<svg xmlns="http://www.w3.org/2000/svg" height="${height}px" viewBox="0 -960 960 960" width="${width}px" fill="#${fill}"><path d="M280-40q-33 0-56.5-23.5T200-120v-720q0-33 23.5-56.5T280-920h400q33 0 56.5 23.5T760-840v720q0 33-23.5 56.5T680-40H280Zm0-200v120h400v-120H280Zm200 100q17 0 28.5-11.5T520-180q0-17-11.5-28.5T480-220q-17 0-28.5 11.5T440-180q0 17 11.5 28.5T480-140ZM280-320h400v-400H280v400Zm0-480h400v-40H280v40Zm0 560v120-120Zm0-560v-40 40Z"/></svg>`;
};
const jobIcon = (width = 24, height = 24, fill = colorCode['ocean-blue']) => {
  return `
    <svg xmlns="http://www.w3.org/2000/svg" height="${height}px" viewBox="0 -960 960 960" width="${width}px" fill="#${fill}"><path d="M160-120q-33 0-56.5-23.5T80-200v-440q0-33 23.5-56.5T160-720h160v-80q0-33 23.5-56.5T400-880h160q33 0 56.5 23.5T640-800v80h160q33 0 56.5 23.5T880-640v440q0 33-23.5 56.5T800-120H160Zm0-80h640v-440H160v440Zm240-520h160v-80H400v80ZM160-200v-440 440Z"/></svg>`;
};
const emailIcon = (width = 24, height = 24, fill = colorCode['ocean-blue']) => {
  return `<svg xmlns="http://www.w3.org/2000/svg" height="${height}px" viewBox="0 -960 960 960" width="${width}px" fill="#${fill}"><path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm640-480L501-453q-5 3-10.5 4.5T480-447q-5 0-10.5-1.5T459-453L160-640v400h640v-400ZM480-520l320-200H160l320 200ZM160-640v10-59 1-32 32-.5 58.5-10 400-400Z"/></svg>`;
};

//프로필이미지
const editIcon = () => {
  return `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#545454"><path d="M200-200h57l391-391-57-57-391 391v57Zm-40 80q-17 0-28.5-11.5T120-160v-97q0-16 6-30.5t17-25.5l505-504q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L313-143q-11 11-25.5 17t-30.5 6h-97Zm600-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/></svg>`;
};

export { phoneIcon, jobIcon, emailIcon, editIcon };
