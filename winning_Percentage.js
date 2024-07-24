import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

document.addEventListener('DOMContentLoaded', () => {
    const db = getDatabase();
    const summonerRef = ref(db, 'Summoner Name'); // Firebase 경로 설정

    // 데이터 배열을 저장할 변수
    let dataArr = [];

    // 테이블의 tbody를 업데이트하는 함수
    function updateTable(data) {
        dataArr = Object.entries(data); // 데이터를 배열로 변환
        const tableBody = document.querySelector('#summoner-table tbody');
        tableBody.innerHTML = ''; // 테이블 비우기

        dataArr.forEach(([key, value]) => {
            const totalMatches = (value.wins || 0) + (value.losses || 0); // 총 시합수 계산
            const winRate = totalMatches > 0 ? ((value.wins || 0) / totalMatches * 100).toFixed(2) + '%' : '0.00%'; // 승률 계산 및 % 추가

            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${key}</td>
                <td>${value.wins || 0}</td>
                <td>${value.losses || 0}</td>
                <td>${totalMatches}</td>
                <td>${winRate}</td>
            `;
            tableBody.appendChild(row);
        });
    }

    // 테이블 정렬 함수
    function sortTable(sortKey, sortOrder) {
        const sortedData = [...dataArr].sort((a, b) => {
            const [keyA, valueA] = a;
            const [keyB, valueB] = b;
            const totalMatchesA = (valueA.wins || 0) + (valueA.losses || 0);
            const totalMatchesB = (valueB.wins || 0) + (valueB.losses || 0);
            const winRateA = totalMatchesA > 0 ? (valueA.wins || 0) / totalMatchesA : 0;
            const winRateB = totalMatchesB > 0 ? (valueB.wins || 0) / totalMatchesB : 0;

            if (sortKey === 'matches') {
                return sortOrder === 'asc' ? totalMatchesA - totalMatchesB : totalMatchesB - totalMatchesA;
            } else if (sortKey === 'winrate') {
                return sortOrder === 'asc' ? winRateA - winRateB : winRateB - winRateA;
            }
        });

        updateTable(Object.fromEntries(sortedData));
    }

    // Firebase 데이터 수신 및 테이블 업데이트
    onValue(summonerRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
            updateTable(data);
            // 기본적으로 시합수 기준으로 내림차순 정렬
            sortTable('matches', 'desc');
        }
    });

    // 정렬 버튼 클릭 이벤트 처리
    document.querySelectorAll('.sortable').forEach(button => {
        button.addEventListener('click', (event) => {
            const sortKey = event.target.getAttribute('data-sort').split('-')[0];
            const sortOrder = event.target.getAttribute('data-sort').split('-')[1];
            sortTable(sortKey, sortOrder);
        });
    });
});
