let tasks = [];


const savetasks = () => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
};

const addtask = () => {
    const taskInput = document.getElementById("taskinput");
    const text = taskInput.value.trim();
    if (text) {
        tasks.push({ text:text, completed: false });
        taskInput.value = "";
        updatetasklists();
        updatestats();
        savetasks();
    }
};

const toggleTaskComplete = (index) => {
    tasks[index].completed = !tasks[index].completed;
    updatetasklists();
    updatestats();
    savetasks();
};

const edittask = (index) => {
    const taskInput = document.getElementById("taskinput");
    taskInput.value = tasks[index].text;
    tasks.splice(index, 1);
    updatetasklists();
    updatestats();
    savetasks();
};

const deletetask = (index) => {
    tasks.splice(index, 1);
    updatetasklists();
    updatestats();
    savetasks();
};

const updatestats = () => {
    const completetasks = tasks.filter((task) => task.completed).length;
    const totaltasks = tasks.length;
    const progress = totaltasks > 0 ? (completetasks / totaltasks) * 100 : 0;
    document.getElementById("progress").style.width = `${progress}%`;
    document.getElementById("nums").innerText = `${completetasks} / ${totaltasks}`;
    if(tasks.length&& completetasks===totaltasks){
        blast();
    }
};

const updatetasklists = () => {
    const tasklist = document.getElementById("task-list");
    tasklist.innerHTML = "";

    tasks.forEach((task, index) => {
        const listitem = document.createElement("li");
        listitem.innerHTML = `
            <div class="taskitem">
                <div class="task ${task.completed ? 'completed' : ''}">
                    <input type="checkbox" class="checkbox" ${task.completed ? "checked" : ""}>
                    <p>${task.text}</p>
                </div>
                <div class="icons">
                    <img src="./img/edit.svg" alt="Edit" onclick="edittask(${index})"/>
                    <img src="./img/delete.svg" alt="Delete" onclick="deletetask(${index})"/>
                </div>
            </div>
        `;

        const checkbox = listitem.querySelector(".checkbox");
        checkbox.addEventListener("change", () => toggleTaskComplete(index));

        tasklist.appendChild(listitem);
    });
};

document.getElementById("newtask").addEventListener("click", function(e) {
    e.preventDefault();
    addtask();
});

const blast=()=>{
    const count = 200,
  defaults = {
    origin: { y: 0.7 },
  };

function fire(particleRatio, opts) {
  confetti(
    Object.assign({}, defaults, opts, {
      particleCount: Math.floor(count * particleRatio),
    })
  );
}

fire(0.25, {
  spread: 26,
  startVelocity: 55,
});

fire(0.2, {
  spread: 60,
});

fire(0.35, {
  spread: 100,
  decay: 0.91,
  scalar: 0.8,
});

fire(0.1, {
  spread: 120,
  startVelocity: 25,
  decay: 0.92,
  scalar: 1.2,
});

fire(0.1, {
  spread: 120,
  startVelocity: 45,
});
}