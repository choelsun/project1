window.addEventListener("DOMContentLoaded", function(){
    // 브라우저야, HTML 다 읽어들이고 나서 ()안에 JS를 실행해줘
    // 개발자는 알고 있어야 함
    // 브라우저는 뭘 어떻게 할지 모르는 상태
    // JavaScript라는 언어로 브라우저에게 언제 무엇을 어떻게 해야 할지를 설명하면 됨

    // 누가
    const loadBtn = document.querySelector("#load_btn");
    const usersTbl = document.querySelector("#users_tbl")

    //할 일 
    loadBtn.addEventListener("click", function(){
        loadBtn.disabled = false;
        // 데이터 수신(= data fetching)
        const result = fetch("http://localhost:3000/getAllUsers").then((res) => res.json()).then((data) => {
        // console.log(data);
        data.forEach((el) => {
            //console.log(El, i);
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${el. id}</td>
            <td>${el. name}</td>
            <td>${el. email}</td>
            <td>${el. reg_date}</td>
            <td>${el. sns}</td>
            <td>${el. intro}</td>
            `;
            usersTbl.appendChild(row);
        });
        loadBtn.disabled = true;
    });
})
});