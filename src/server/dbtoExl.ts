import { Workbook, Alignment } from 'exceljs';
import { createConnection } from 'mysql2/promise';

export async function createExcelFile() {
  // MySQL 데이터베이스 연결 설정
  const connection = await createConnection({
    host: 'localhost', // 호스트 이름
    user: 'mymysql', // 사용자 이름
    password: 'mymysql', // 비밀번호
    database: 'capstone1' // 데이터베이스 이름
  });

  // 데이터베이스 쿼리문
  const query = 'SELECT * FROM health';

  // 엑셀 파일 생성
  const workbook = new Workbook();
  const worksheet = workbook.addWorksheet('데이터');

  // 데이터베이스 쿼리 실행 및 엑셀 파일에 데이터 추가
  const [results] = await connection.query(query);

  // 헤더 추가
  const headers = ['날짜', '시간대', '맥박', '혈당', '혈압', '체온'];
  const headerRow = worksheet.addRow(headers);

  // 헤더 스타일 설정
  headerRow.eachCell((cell) => {
    cell.alignment = { vertical: 'middle', horizontal: 'center' };
  });

  // 데이터 추가
  if (Array.isArray(results)) {
    results.forEach((row: any) => {
      const rowData = Object.values(row);
      const dataRow = worksheet.addRow(rowData);

      // 데이터 스타일 설정
      dataRow.eachCell((cell) => {
        cell.alignment = { vertical: 'middle', horizontal: 'center' };
      });
    });
  }

  // 열 너비 조정
  worksheet.getColumn('A').width = 15; // A열의 너비를 15로 설정 (단위: 문자열 개수)
  worksheet.getColumn('B').width = 15; // B열의 너비를 15로 설정
  worksheet.getColumn('C').width = 15; // C열의 너비를 15로 설정
  worksheet.getColumn('D').width = 15; // D열의 너비를 15로 설정
  worksheet.getColumn('E').width = 15; // E열의 너비를 15로 설정
  worksheet.getColumn('F').width = 15; // F열의 너비를 15로 설정

  // 엑셀 파일 저장
  const filename = '데이터.xlsx';
  await workbook.xlsx.writeFile(filename);
  console.log(`엑셀 파일 "${filename}"이 생성되었습니다.`);

  // 데이터베이스 연결 종료
  await connection.end();
}

createExcelFile()
  .catch((error) => {
    console.error('에러 발생:', error);
  });
