// Question 1
const form = document.getElementById ("studentForm");
const nameInput =document.getElementById("studentName");
const gradeInput = document.getElementById("studentGrade");
const nameError = document.getElementById("nameError");
const gradeError = document.getElementById("gradeError");
const tableBody = document.getElementById("studentTableBody");
const filterSelect = document.getElementById("filterSelect");
const sortSelect = document.getElementById("sortSelect");

let students = [];
form.addEventListener("submit", function(e) {
e.preventDefault();
let name = nameInput.value.trim();
let grade = gradeInput.value.trim();
let isValid = true;
nameError.textContent = "";
gradeError.textContent = "";

if (name === "") {
    nameError.textContent = "Name is required.";
    isValid = false;
}

else{
    name = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
    if (students.some(s => s.name === name)){
        nameError.textContent = "Name already exists.";
        isValid =false;
    }
}

if (grade === ""|| isNaN(grade)){
    gradeError.textContent = "Valid grade is required.";
    isValid = false;    

}

else{
    grade = Number(grade);
    if (grade < 0 || grade > 100){
        gradeError.textContent = "Grade must be between 0 and 100.";
        isValid = false;
    }
}

if(!isValid) return;

students.push({ name, grade });
renderTable();
form.reset();

});
filterSelect.addEventListener("change", renderTable);
sortSelect.addEventListener("change", renderTable);

function renderTable() {
    let filteredStudents = [...students];

    if(filterSelect.value === "pass") {
        filteredStudents = filteredStudents.filter(s => s.grade >= 60);
    }
    else if(filterSelect.value === "fail"){
        filteredStudents =filteredStudents.filter(s=>s.grade < 60);
    }

    if(sortSelect.value === "name"){
        filteredStudents.sort((a,b)=>a.name.localeCompare(b.name));
    }
    else if(sortSelect.value === "grade") {
        filteredStudents.sort((a, b) => a.grade - b.grade);
    }

    tableBody.innerHTML = "";
    filteredStudents.forEach(s => {
        const row = document.createElement("tr");
        row.innerHTML = `<td>${s.name}</td><td>${s.grade}</td>`;
                        tableBody.appendChild(row);
    });
}
    

// Question 2
    const container = document.getElementById("container");

    
    container.addEventListener("click", function(event) {
      const target = event.target;
      
      
      if (target.classList.contains("box") && !target.classList.contains("disabled")) {
        
       
        target.classList.add("disabled");
        
        
        const clone = target.cloneNode(true);
        
        
        clone.classList.remove("disabled");

        
        container.appendChild(clone);
      }
    });

    // Question 3
    const egg = document.getElementById("egg");
    const basket = document.getElementById("basket");
    const broken = document.getElementById("broken");
    const game = document.getElementById("game");

    let eggFalling;
    let eggTop = 0;

    function startFalling() {
      egg.style.left = Math.random() * (window.innerWidth - 60) + "px";
      eggTop = 0;
      egg.style.top = eggTop + "px";
      egg.style.display = "block";
      broken.style.display = "none";

      eggFalling = setInterval(() => {
        eggTop += 5;
        egg.style.top = eggTop + "px";

        const eggRect = egg.getBoundingClientRect();
        const basketRect = basket.getBoundingClientRect();

        
        if (
          eggRect.bottom >= basketRect.top &&
          eggRect.left >= basketRect.left &&
          eggRect.right <= basketRect.right
        ) {
          clearInterval(eggFalling);
          egg.style.display = "none"; 
          setTimeout(startFalling, 1500);
        }

        if (eggTop + egg.offsetHeight >= window.innerHeight) {
          clearInterval(eggFalling);
          egg.style.display = "none";
          broken.style.display = "block";
          broken.style.left = egg.style.left;
          setTimeout(startFalling, 2000);
        }
      }, 30);
    }

    game.addEventListener("mousemove", (e) => {
      basket.style.left = e.clientX - basket.offsetWidth / 2 + "px";
    });

    startFalling();
// Question 4
function addTask() {
      const taskInput = document.getElementById("taskInput");
      const taskText = taskInput.value.trim();
      if (taskText === "") return;

      const tableBody = document.querySelector("#taskTable tbody");
      const row = document.createElement("tr");

      
      const doneCell = document.createElement("td");
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.onchange = function() {
        if (checkbox.checked) {
          taskCell.classList.add("done");
        } else {
          taskCell.classList.remove("done");
        }
      };
      doneCell.appendChild(checkbox);

      
      const taskCell = document.createElement("td");
      taskCell.textContent = taskText;

      
      const deleteCell = document.createElement("td");
      const deleteBtn = document.createElement("span");
      deleteBtn.innerHTML = "🗑️";
      deleteBtn.classList.add("delete-btn");
      deleteBtn.onclick = function() {
        row.remove();
      };
      deleteCell.appendChild(deleteBtn);

      
      row.appendChild(doneCell);
      row.appendChild(taskCell);
      row.appendChild(deleteCell);

      tableBody.appendChild(row);

      
      taskInput.value = "";
    }



