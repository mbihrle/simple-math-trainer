let operator_list = [];
const numbers1 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const numbers2 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

let numbers_list1 = [];
let numbers_list2 = [];

let calc_status = "config"; // possible states: config, input, result
let options_error_status = false;
let calc_counter = 0;
let calc_correct = 0;
let calc_wrong = 0;
let num1 = 0;
let num2 = 0;
let operator = "+";
let result = 0;
let quiz_string_result = `${num1} ${operator} ${num2} = ${result}`;
let count_quiz_questions = 0;
let count_quiz_questions_correct = 0;
let percentage_correct = 0;

// divs
const options_error_message_div = document.getElementById(
    "options-error-message"
);
const show_quiz_string = document.getElementById("calc-show-div");
const calc_success_message = document.getElementById("success-message");
const calc_fail_message = document.getElementById("fail-message");
const showOptionsDiv = document.getElementById("showOptions");
const showQuizDiv = document.getElementById("showQuiz");
const showResultDiv = document.getElementById("showResult");
const showResultSuccessDiv = document.getElementById("result-success");
const showResultFailDiv = document.getElementById("result-fail");

//spans
const correct_calculations = document.getElementsByClassName(
    "correct-calculations"
);
const total_calculations =
    document.getElementsByClassName("total-calculations");
const success_percentage =
    document.getElementsByClassName("success-percentage");

// inputs
const addition_operator = document.getElementById("+");
const substraction_operator = document.getElementById("-");
const multiplication_operator = document.getElementById("*");
const division_operator = document.getElementById("/");

const area1_radio_range = document.getElementById("area1-radio-range");
const num_area1_from = document.getElementById("area1-input-range-from");
const num_area1_to = document.getElementById("area1-input-range-to");
const area1_radio_selection = document.getElementById("area1-radio-selection");
const area1_input_selection = document.getElementById("area1-input-selection");

const area2_radio_range = document.getElementById("area2-radio-range");
const num_area2_from = document.getElementById("area2-input-range-from");
const num_area2_to = document.getElementById("area2-input-range-to");
const area2_radio_selection = document.getElementById("area2-radio-selection");
const area2_input_selection = document.getElementById("area2-input-selection");

const input_calc = document.getElementById("calc-input");

// buttons
const btn_start = document.getElementById("btn-start");
const btn_calc = document.getElementById("btn-calc");
const btn_next = document.getElementById("btn-next");
const btn_delete_input = document.getElementById("btn-delete-input");
const btn_chancel_quiz = document.getElementById("btn-chancel-quiz");
const btn_dev_show_all = document.getElementById("btn-dev-show-all");
const btn_continue_quiz = document.getElementById("btn-continue-quiz");
const btn_edit_options = document.getElementById("btn-edit-options");
const btn_end_quiz = document.getElementById("btn-end-quiz");

// Event Handlers
//buttons
btn_start.addEventListener("click", () => startQuiz());
btn_calc.addEventListener("click", () => showResult(result));
btn_next.addEventListener("click", () => quizNext());
btn_delete_input.addEventListener("click", () => deleteInput());
btn_chancel_quiz.addEventListener("click", () => cancelQuiz());
btn_dev_show_all.addEventListener("click", () => showAllDivs());
btn_continue_quiz.addEventListener("click", () => continueQuiz());
btn_edit_options.addEventListener("click", () => editOptions());
btn_end_quiz.addEventListener("click", () => terminateQuiz());

//inputs
input_calc.addEventListener("keypress", (event) => calcInputOnEnter(event));
num_area1_from.addEventListener("focus", () =>
    changeRadioBtnFocus(area1_radio_range)
);
num_area1_to.addEventListener("focus", () =>
    changeRadioBtnFocus(area1_radio_range)
);
area1_input_selection.addEventListener("focus", () =>
    changeRadioBtnFocus(area1_radio_selection)
);

num_area2_from.addEventListener("focus", () =>
    changeRadioBtnFocus(area2_radio_range)
);
num_area2_to.addEventListener("focus", () =>
    changeRadioBtnFocus(area2_radio_range)
);
area2_input_selection.addEventListener("focus", () =>
    changeRadioBtnFocus(area2_radio_selection)
);

// functions

// functions - surface
const changeRadioBtnFocus = (element) => {
    element.checked = "True";
};

const toggleShowDiv = (...divs) => {
    divs.forEach((div) => {
        div.classList.toggle("hidden");
    });
};

const showDiv = (...divs) => {
    divs.forEach((div) => {
        if (div.classList.contains("hidden")) {
            div.classList.remove("hidden");
        }
    });
};

const hideDiv = (...divs) => {
    divs.forEach((div) => {
        if (!div.classList.contains("hidden")) {
            div.classList.add("hidden");
        }
    });
};

const showAllDivs = () => {
    showDiv(showOptionsDiv, showQuizDiv, showResultDiv);
};

const deleteInput = () => {
    input_calc.value = "";
    input_calc.focus();
};

const calcInputOnEnter = (event) => {
    // event.preventDefault();
    if (event.keyCode === 13 && calc_status === "input") {
        btn_calc.click();
        btn_next.focus();
    }
    //else if (event.keyCode === 13 && calc_status === "result") {
    //     btn_next.click();
    // }
};

// functions - logic
const setOperatorsList = () => {
    const inputs = document.querySelectorAll("input");

    const operator_inputs = [...inputs].filter((input) => {
        return input.name === "operator" && input.checked === true;
    });

    operator_list = operator_inputs.map((input) => {
        return input.value;
    });
};

const range = (start, stop, step) =>
    Array.from(
        { length: (stop - start) / step + 1 },
        (_, i) => start + i * step
    );

const setNumbersList1 = () => {
    if (area1_radio_range.checked === true) {
        // range
        const value_start = parseInt(num_area1_from.value);
        const value_end = parseInt(num_area1_to.value);
        numbers_list1 = range(value_start, value_end, 1);
    } else {
        //selection
        let input = area1_input_selection.value;
        if (input.slice(-1) === ",") {
            input = input.slice(0, -1);
        }
        numbers_list1 = input
            .split(",")
            .map((stringVal) => parseInt(stringVal));
    }
    console.log(numbers_list1);
};

const setNumbersList2 = () => {
    if (area2_radio_range.checked === true) {
        // range
        const value_start = parseInt(num_area2_from.value);
        const value_end = parseInt(num_area2_to.value);
        numbers_list2 = range(value_start, value_end, 1);
    } else {
        //selection
        let input = area2_input_selection.value;
        if (input.slice(-1) === ",") {
            input = input.slice(0, -1);
        }
        numbers_list2 = input
            .split(",")
            .map((stringVal) => parseInt(stringVal));
    }
    console.log(numbers_list2);
};

const calculation = (num1, num2, operator) => {
    switch (operator) {
        case "+":
            const result = num1 + num2;
            generate_quiz_strings(num1, num2, operator, result);
            return result;
    }
    switch (operator) {
        case "-":
            if (num1 < num2) {
                [num1, num2] = [num2, num1];
            }
            const result = num1 - num2;
            generate_quiz_strings(num1, num2, operator, result);
            return result;
    }
    switch (operator) {
        case "*":
            const result = num1 * num2;
            generate_quiz_strings(num1, num2, operator, result);
            return result;
    }
    switch (operator) {
        case "/":
            let result = num1 * num2;
            [num1, result] = [result, num1];
            generate_quiz_strings(num1, num2, operator, result);
            return result;
    }
};

const generate_quiz_strings = (num1, num2, operator, result) => {
    quiz_string = `${num1} ${operator} ${num2} =`;
    quiz_string_result = `${num1} ${operator} ${num2} = ${result}`;
    show_quiz_string.innerHTML = quiz_string;
};

const getCalculation = () => {
    operator = operator_list[Math.floor(Math.random() * operator_list.length)];
    num1 = numbers_list1[Math.floor(Math.random() * numbers_list1.length)];
    num2 = numbers_list2[Math.floor(Math.random() * numbers_list2.length)];
    result = calculation(num1, num2, operator);
};

const startQuiz = () => {
    setOperatorsList();
    setNumbersList1();
    setNumbersList2();

    if (
        (numbers_list1.length === 0 ||
            numbers_list2.length === 0 ||
            operator_list.length === 0) &&
        options_error_status === false
    ) {
        options_error_status = true;
        showDiv(options_error_message_div);
    } else {
        options_error_status = false;
        hideDiv(options_error_message_div, showOptionsDiv, showResultDiv);
        showDiv(showQuizDiv);
    }

    calc_status = "input";
    getCalculation();
    input_calc.focus();
};

const quizNext = () => {
    calc_status = "input";
    getCalculation();
    input_calc.value = "";
    input_calc.focus();
    hideDiv(calc_success_message, calc_fail_message);
};

const showResult = (result) => {
    count_quiz_questions++;
    show_quiz_string.innerHTML = quiz_string_result;
    if (result === parseInt(input_calc.value)) {
        toggleShowDiv(calc_success_message);
        count_quiz_questions_correct++;
    } else {
        toggleShowDiv(calc_fail_message);
    }
    calc_status = "result";
};

const cancelQuiz = () => {
    hideDiv(showQuizDiv);

    [...correct_calculations].forEach((element) => {
        element.innerHTML = count_quiz_questions_correct;
    });

    [...total_calculations].forEach((element) => {
        element.innerHTML = count_quiz_questions;
    });

    if (count_quiz_questions === 0) {
        percentage_correct = 0;
    } else {
        percentage_correct =
            (count_quiz_questions_correct / count_quiz_questions) * 100;
    }

    [...success_percentage].forEach((element) => {
        element.innerHTML = percentage_correct.toFixed(0);
    });

    if (percentage_correct >= 75) {
        showDiv(showResultDiv, showResultSuccessDiv);
        hideDiv(showResultFailDiv);
    } else {
        showDiv(showResultDiv, showResultFailDiv);
        hideDiv(showResultSuccessDiv);
    }
};

const continueQuiz = () => {
    hideDiv(showResultDiv);
    showDiv(showQuizDiv);
    if (calc_status === "input") {
        input_calc.focus();
    } else {
        btn_next.focus();
    }
};

const editOptions = () => {
    hideDiv(showResultDiv);
    showDiv(showOptionsDiv);
};

const terminateQuiz = () => {
    window.location.reload();
};
