const formulario = document.getElementById('formulario-imc');
const campoPeso = document.getElementById('peso');
const campoAltura = document.getElementById('altura');
const btnCalcular = document.getElementById('btn-calcular');
const btnLimpar = document.getElementById('btn-limpar');
const resultadoContainer = document.getElementById('resultado-container');
const resultadoImc = document.getElementById('resultado-imc');
const classificacaoBox = document.getElementById('classificacao-box');
const classificacaoTexto = document.getElementById('classificacao-texto');

btnCalcular.addEventListener('click', calcularImc);

btnLimpar.addEventListener('click', limparCampos);

formulario.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        calcularImc();
    }
});

function calcularImc() {
    const peso = parseFloat(campoPeso.value);
    const altura = parseFloat(campoAltura.value);

    if (!peso || !altura || peso <= 0 || altura <= 0) {
        alert('Por favor, preencha todos os campos com valores válidos!');
        return;
    }

    
    const imc = peso / (altura * altura);

    
    const imcArredondado = imc.toFixed(2);


    const classificacao = obterClassificacao(imc);


    exibirResultados(imcArredondado, classificacao);
}

function obterClassificacao(imc) {
    if (imc < 18.5) {
        return {
            texto: 'Abaixo do peso',
            classe: 'abaixo-peso'
        };
    } else if (imc < 25) {
        return {
            texto: 'Peso normal',
            classe: 'peso-normal'
        };
    } else if (imc < 30) {
        return {
            texto: 'Sobrepeso',
            classe: 'sobrepeso'
        };
    } else if (imc < 35) {
        return {
            texto: 'Obesidade Grau I',
            classe: 'obesidade-i'
        };
    } else if (imc < 40) {
        return {
            texto: 'Obesidade Grau II',
            classe: 'obesidade-ii'
        };
    } else {
        return {
            texto: 'Obesidade Grau III',
            classe: 'obesidade-iii'
        };
    }
}

function exibirResultados(imc, classificacao) {
    resultadoImc.textContent = imc;
    classificacaoTexto.textContent = classificacao.texto;


    classificacaoBox.classList.remove(
        'abaixo-peso',
        'peso-normal',
        'sobrepeso',
        'obesidade-i',
        'obesidade-ii',
        'obesidade-iii'
    );

    
    classificacaoBox.classList.add(classificacao.classe);

    
    resultadoContainer.classList.remove('hidden');


    resultadoContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function limparCampos() {
    campoPeso.value = '';
    campoAltura.value = '';
    resultadoContainer.classList.add('hidden');
    campoPeso.focus();
}
