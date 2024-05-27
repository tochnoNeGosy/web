//alert("asd");

function clearr(){
    const weatherDiv = document.getElementById("tableContainer");
    weatherDiv.innerText = "";
}

async function loadGroupsList(){
    clearr();
    const weatherDiv = document.getElementById("tableContainer");
    let promise = await fetch("https://vm.nathoro.ru/timetable/groups");
    let json = await promise.json();
    let table = document.createElement("table");
    let header = document.createElement("tr");
    let headers = ["Группа"]
    headers.forEach(head => {
        let th = document.createElement("th");
        th.innerText = head;
        header.appendChild(th);
    });
    table.append(header);
    json.forEach(group => {
        let tr = document.createElement("tr");
        let th = document.createElement("th");
        th.innerText = group.name;
        tr.appendChild(th);
        table.appendChild(tr);
    });
    weatherDiv.appendChild(table);
}

async function loadTeacherList(){
    clearr();
    const weatherDiv = document.getElementById("tableContainer");
    let promise = await fetch("https://vm.nathoro.ru/timetable/teachers");
    let json = await promise.json();
    let table = document.createElement("table");
    let header = document.createElement("tr");
    let headers = ["ФИО"]
    headers.forEach(head => {
        let th = document.createElement("th");
        th.innerText = head;
        header.appendChild(th);
    });
    table.append(header);
    json.forEach(group => {
        let tr = document.createElement("tr");
        let th = document.createElement("th");
        th.innerText = group.fullName;
        tr.appendChild(th);
        table.appendChild(tr);
    });
    weatherDiv.appendChild(table);
}

async function loadByGroups(){
    clearr();
    const elem = document.getElementById("nameName");
    let formData = new FormData(elem);
    const weatherDiv = document.getElementById("tableContainer");
    let group = formData.get("filtr");

    
    let promise = await fetch(`https://vm.nathoro.ru/timetable/by-group/${encodeURIComponent(group)}`);
    let json = await promise.json();
    json.forEach(element => {
        let h3 = document.createElement("h3");
        h3.innerText = element.isOdd == true ? `Неделя четная` : `Неделя не четная`;
        weatherDiv.appendChild(h3);
        
        let table = document.createElement("table");
        let header = document.createElement("tr");
        let headers = ["1", "2", "3", "4", "5", "6", "7", "8"]
        headers.forEach(head => {
            let th = document.createElement("th");
            th.innerHTML = "<b>" + head + "</b>";
            header.appendChild(th);
        });
        table.append(header);
        element.days.forEach(day => {
            let tr = document.createElement("tr");
            day.lessons.forEach(element => {
                if (element == null){
                    let th = document.createElement("th");
                    th.innerText = "-";
                    th.classList.add("free");
                    tr.appendChild(th);
                }
                else{
                    let th = document.createElement("th");
                    th.classList.add("notFree");
                    th.innerHTML = `${element.group.name}<br>${element.room.name}<br>${element.subject.teacher.fullName}<br>${element.subject.name}<br>${element.subject.type}`;
                    tr.appendChild(th);
                }
            });
            table.appendChild(tr);
        });
        weatherDiv.appendChild(table);
    });
}