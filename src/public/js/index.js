let theme = "light";

document.addEventListener("DOMContentLoaded", (event) => {
    detectColorScheme();
    document.addEventListener("keydown", (ev) => {
        if (ev.key == "F12" && ev.altKey && ev.ctrlKey) {
            console.log(ev.key);
            switchTheme();
        }
    }, false);
});

const detectColorScheme = () => {
    if (localStorage.getItem("theme")) {
        if (localStorage.getItem("theme") == "dark") {
            theme = "dark";
        }
    } else if (!window.matchMedia) {
        return false;
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        theme = "dark";
    }
    document.documentElement.setAttribute("data-theme", theme);
};

const switchTheme = () => {
    theme = (theme == "light") ? "dark" : "light";
    localStorage.setItem("theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
};



// const todoItemsElContainer = document.getElementById("todo-items");
// fetch('http://example.com/todoItems.json')
//       .then(response => response.json())
//       .then(data => {
//            const todoItemDiv = document.createElement('div');
//                todoItemDiv.id = data.ID;

//            const innerText = document.createElement('p');
//                innerText.textContent = `${data.DESCR} duration: ${todoItemDiv.duration}`;

//            todoItemDiv.appendChild(innerText);
//            todoItemsElContainer.appendChild(todoItemDiv);
//        });

// function addTodoItem(description, duration) {

//     const data = {
//         DESCR: description,
//         DURATION: duration
//     }

//     const response = await fetch(url, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(data)
//     });
//     return response.json();
// }