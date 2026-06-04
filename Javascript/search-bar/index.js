
const data = [
    "hello",
    "here",
    "home",
    "lonely",
    "red",
    "green",
    "blue",
    "yellow",
    "orange",
    "purple",
    "black",
    "mysql",
    "developer",
    "engineer",
    "student",
    "school",
    "college",
    "university",
    "market",
    "restaurant",
    "football",
    "cricket"
];

const input = document.getElementById('in');
const output = document.getElementById('output');

input.addEventListener('input', () => {
    const str = input.value;
    let string = "";
    if (str === "") {
        output.textContent = string;
        return;
    }

    for (let i = 0; i < data.length; i++) {
        if (data[i].includes(str)) {
            string += data[i] + " ";
        }
    }
    output.textContent = string;
});