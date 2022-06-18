import React , { useState }from 'react'
import { Form, Button } from "react-bootstrap";
import "./style.scss"

const MainComponent = () => {
    const [sourceText, setsourceText] = useState("");
    const [result, setresult] = useState("");
    const [alphabet, setalphabet] = useState("abcdefghijklmnopqrstuvwxyzабвгдеёжзийклмнопрстуфхцчшщъыьэюя");
    const [a, seta] = useState(1);
    const [k, setk] = useState(1);


    const changeAlphabet = (event) =>
        setalphabet(event.target.value);

    const changeSrc = (event) => 
        setsourceText(event.target.value);
    
    const isCoprimeNumbers = (num1, num2) => {
        let a = Math.max(num1, num2);
        let b = Math.min(num1, num2);
        while(a > 1){
            console.log(a,b);
            let r = a%b;
            a = b;
            b = r;
        }
        return a === 1 ? true : false;
    }

    const changeK = (event) => {
        if(/\d+/.exec(event.target.value)){
            if(isCoprimeNumbers(event.target.value, alphabet.length)) {
                setk(+event.target.value);            
                const errorMsg = document.getElementById("k_error");
                errorMsg.classList.remove("error-msg");
                errorMsg.classList.add("none-error-msg");
            } else {
                const errorMsg = document.getElementById("k_error");
                errorMsg.innerText = "Число должно быть взаимнопростым с длиной алфавита"
                errorMsg.classList.remove("none-error-msg");
                errorMsg.classList.add("error-msg");
            }
        } else {
            const errorMsg = document.getElementById("k_error");
            errorMsg.innerText = "Введенное выражение должно быть числом"
            errorMsg.classList.remove("none-error-msg");
            errorMsg.classList.add("error-msg");
        }
    }

    const changeA = (event) => {
        if(/\d+/.exec(event.target.value)){
            seta(+event.target.value);            
            const errorMsg = document.getElementById("a_error");
            errorMsg.classList.remove("error-msg");
            errorMsg.classList.add("none-error-msg");
        } else {
            const errorMsg = document.getElementById("a_error");
            errorMsg.classList.remove("none-error-msg");
            errorMsg.classList.add("error-msg");
        }
    }

    const encryptText = () => {
        const n = alphabet.length;
        const text = sourceText.toLowerCase();
        let encryptedT = "";
        for (let i = 0; i < text.length; i++) {
            let c = text.charAt(i);
            let pos = alphabet.indexOf(c);
            if (pos < 0) {
                encryptedT += c; // не шифруем данный символ
                continue;
            }let newPos = (parseInt(pos) * k + a) % n;
            let newC = alphabet.charAt(newPos);
            encryptedT += newC;
        }
        setresult(encryptedT);
    }

    const calculateInvariance = (number, mod) => {
        let invariance = mod-1;
        while((number*invariance)%mod !== 1){
            invariance--;
        }
        return invariance;
    }

    const decodeText = () => {
        const n = alphabet.length;
        const text = sourceText.toLowerCase();
        const kInverse = calculateInvariance(k, n);
        let decodedText = "";
        for (let i = 0; i < text.length; i++) {
            let c = text.charAt(i);
            let pos = alphabet.indexOf(c);
            if (pos < 0) {
                decodedText += c; // не шифруем данный символ
                continue;
            }
            let newPos = (kInverse * (parseInt(pos) + n - a)) % n;
            let newC = alphabet.charAt(newPos);
            decodedText += newC;
        }
        setresult(decodedText);
    }

    return (
        <div className='main-container'>
            <Form>
                <Form.Group className="container ">
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor='alphabet-input'>Задайте алфавит:</Form.Label>
                        <Form.Control 
                            as="textarea" 
                            className='aphabet-input' 
                            id="alphabet-input" 
                            onChange={changeAlphabet} 
                            defaultValue="abcdefghijklmnopqrstuvwxyzабвгдеёжзийклмнопрстуфхцчшщъыьэюя"
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor='k-input'>K:</Form.Label>
                        <Form.Control type="text" className='k-input' id="k-input" onChange={changeK}></Form.Control>
                        <p className="none-error-msg" id="k_error">Введите число!</p>
                        <Form.Label htmlFor='a-input'>A:</Form.Label>
                        <Form.Control type="text" className='a-input' id="a-input" onChange={changeA}></Form.Control>
                        <p className="none-error-msg" id="a_error">Введите число!</p>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor='src-input'>Исходный текст:</Form.Label>
                        <Form.Control rows={3} as="textarea" className='src-input' id="src-input" onChange={changeSrc}></Form.Control>
                    </Form.Group> 
                    <Form.Group className="result-container">
                        <Form.Label>Результат:</Form.Label>
                        <Form.Text className='result'>
                            {result}
                        </Form.Text>
                    </Form.Group>
                    <Form.Group className="container-btns">
                        <Button varinant="btn-outline secondary" onClick={encryptText}>
                            Зашифровать
                        </Button>
                        <Button varinant="btn-outline secondary" onClick={decodeText}>
                            Дешифровать
                        </Button>
                    </Form.Group>
                </Form.Group>
            </Form>
        </div>
    )
}

export default MainComponent