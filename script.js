const API = "http://localhost:5000/api/students";

document.getElementById("studentForm").addEventListener("submit", async e => {
  e.preventDefault();

  const student = {
    first_name: first_name.value,
    last_name: last_name.value,
    email: email.value,
    date_of_birth: date_of_birth.value
  };

  if (!student.email.includes("@")) {
    alert("Invalid email");
    return;
  }

  await fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(student)
  });

  loadStudents();
});

async function loadStudents(search="") {
  const res = await fetch(`${API}?search=${search}`);
  const data = await res.json();

  studentTable.innerHTML = "";
  data.forEach(s => {
    studentTable.innerHTML += `
      <tr>
        <td>${s.id}</td>
        <td>${s.first_name} ${s.last_name}</td>
        <td>${s.email}</td>
        <td>${s.date_of_birth}</td>
        <td>
          <button onclick="deleteStudent(${s.id})">Delete</button>
        </td>
      </tr>
    `;
  });
}

async function deleteStudent(id) {
  await fetch(`${API}/${id}`, { method: "DELETE" });
  loadStudents();
}

search.addEventListener("input", e => {
  loadStudents(e.target.value);
});

loadStudents();
