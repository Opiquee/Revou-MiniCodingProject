const BMI_HEADS = document.querySelectorAll('.bmi-head');
const BMI_SI = document.getElementById('bmi-si');
const HITUNG_BTN = document.getElementById('hitung-btn');
const RESET_BTN = document.getElementById('reset-btn');
let activeForm;

// event listeners
window.addEventListener('DOMContentLoaded', () => {
    BMI_SI.classList.add('show-bmi');
    activeForm = "bmi-si";
});

HITUNG_BTN.addEventListener('click', performBMICalc);
RESET_BTN.addEventListener('click', () => {
    let forms = [...document.forms];
    forms.forEach(form => form.reset());
    clearBMIInfo();
});

// clear BMI Info
function clearBMIInfo(){
    document.getElementById('bmi-value').innerHTML = "";
    document.getElementById('bmi-category').innerHTML = "";
    document.getElementById('bmi-jenis-kelamin').innerHTML = "";
}

// bmi calculation form toggle
BMI_HEADS.forEach(bmiHead => {
    bmiHead.addEventListener('click', () => {
        if(bmiHead.id === "bmi-si-head"){
            removeActiveClass();
            clearBMIInfo();
            bmiHead.classList.add('active-head');
            BMI_SI.classList.add('show-bmi');
            activeForm = "bmi-si";
        }
    });
});

// remove active class from heads
function removeActiveClass(){
    BMI_HEADS.forEach(bmiHead => {
        bmiHead.classList.remove('active-head');
    });
}

// main bmi calculation function
function performBMICalc(){
    let BMIInfo = getUserInput();
    if(BMIInfo) printBMIResult(BMIInfo);
}

// get input values
function getUserInput(){
    let status;


    // get input values form metric units
    if(activeForm === "bmi-si"){
        let usia = document.getElementById('usia').value,
        jeniskelamin = document.querySelector('#bmi-si input[name = "jenis-kelamin"]:checked').value,
        tinggibadan = document.getElementById('cm').value,
        beratbadan = document.getElementById('kg').value;
        
        status = checkInputStatus([usia, tinggibadan, beratbadan]);

        if(status === true){
            return calculateBMI({
                jeniskelamin,
                usia,
                height: parseFloat(tinggibadan) / 100,
                weight: parseFloat(beratbadan)
            });
        }
    }

    document.querySelector('.alert-error').style.display = "block";
    setTimeout(() => {
        document.querySelector('.alert-error').style.display = "none";
    }, 1000);
    return false;
}

function checkInputStatus(inputs){
    for(let i = 0; i < inputs.length; i++){
        if(inputs[i].trim() === "" || isNaN(inputs[i])) return false;
    }
    return true;
}

// calculate BMI Value
function calculateBMI(values){
    let BMI;
    if(activeForm === 'bmi-si'){
        BMI = (values.weight / Math.pow(values.height, 2)).toFixed(2);
    }
    return {jeniskelamin: values.jeniskelamin, BMI};
}

// print BMI result information
function printBMIResult(BMIInfo){
    document.getElementById('bmi-value').innerHTML = `${BMIInfo.BMI} kg/m<sup>2</sup>`;

    let bmiCategory;
    if(BMIInfo.BMI < 18.5){
        bmiCategory = "Kekurangan berat badan";
    } else if(BMIInfo.BMI >= 18.5 && BMIInfo.BMI <= 24.9){
        bmiCategory = "Normal (ideal)";
    } else if(BMIInfo.BMI >= 25 && BMIInfo.BMI <= 29.9){
        bmiCategory = "Kelebihan berat badan";
    } else {
        bmiCategory = "Kegemukan (Obesitas)";
    }

    document.getElementById('bmi-category').innerHTML = `${bmiCategory}`;
    document.getElementById('bmi-jenis-kelamin').innerHTML = BMIInfo.jeniskelamin;
}