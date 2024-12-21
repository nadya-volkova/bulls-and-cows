let number = generateNumber();
let attempts = 0;
const resultDiv = document.getElementById('result');
const errorText = document.getElementById('errorText');
const inputs = document.querySelectorAll('.input');
let ifBackspace = false;

function generateNumber() 
{
    let numbers = [];
    let randomDigit = Math.floor(Math.random() * 10);
    while (numbers.length < 4)
    {
        randomDigit = Math.floor(Math.random() * 10);
        if (!numbers.includes(randomDigit)) 
        {
            numbers.push(randomDigit);
        }
    }

    return numbers.join('');
}

document.addEventListener('keydown', function(event) 
{
    if (event.key === 'Enter') 
    {
        checkInput();
    }
});

  inputs.forEach((input, index) => {
   
    input.addEventListener('keydown', function(e) 
    {
        if (e.key === 'Backspace')
        {
            ifBackspace = true;
            if (this.selectionStart === 0)
                if (index > 0) 
                {
                  inputs[index - 1].focus();
                }
        }
    });
  });

inputs.forEach((input, index) => 
{
input.addEventListener('input', function() 
    {
        const value = this.value;
        if ( (!/\d/.test(value)) && ((!ifBackspace) || (ifBackspace && value!=='')) ) 
        {
            this.value = '';
            errorText.textContent = 'Ошибка: введите только цифры';
            errorText.classList.add('error');
        } else 
        {
            errorText.textContent = '';
            errorText.classList.remove('error');
            if (value !== '' && index < 3) 
            {
              inputs[index + 1].focus();
            }
        }
        ifBackspace = false;
    });
});

checkButton.addEventListener('click', function()
{
    checkInput();
});

function checkInput()
{
    let guess = '';
    let numbers = []
    inputs.forEach(input => 
    {
        guess += input.value;
        if (!numbers.includes(input.value)) 
        {
            numbers.push(input.value);
        }
    });

    if (numbers.length < 4 || guess.length < 4) 
    {
        errorText.textContent = 'Ошибка: введите 4 различные цифры';
        errorText.classList.add('error');
    }
    else
    {
        checkGuess();
        inputs.forEach(input => 
        {
            input.value = '';
        });
        inputs[0].focus();
    }
}

function checkGuess() 
{
    let guess = '';
    inputs.forEach(input => 
    {
        guess += input.value;
    });

    let bulls = 0;
    let cows = 0;

    for (let i = 0; i < 4; i++) 
    {
        if (guess[i] === number[i]) 
        {
            bulls++;
        } else if (number.includes(guess[i])) 
        {
            cows++;
        }
    }

    const guessResult = `<div>Попытка ${++attempts}: ${guess} - Быки: ${bulls}, Коровы: ${cows} </div>`;
    resultDiv.innerHTML += guessResult;
    
    if (bulls === 4) 
    {
        resultDiv.innerHTML += "<div> Поздравляем! Вы угадали число! </div>";
    }
    
    document.getElementById("input1").value = "";
    document.getElementById("input2").value = "";
    document.getElementById("input3").value = "";
    document.getElementById("input4").value = "";
    document.getElementById("input1").focus();
}

rulesButton.addEventListener('click', function() 
{
    rules.style.display = rules.style.display === 'block' ? 'none' : 'block';
 
})
