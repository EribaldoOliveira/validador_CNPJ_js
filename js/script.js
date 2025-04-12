function validarCNPJ() {
  let cnpj = document.getElementById("cnpj").value;

  // Remove tudo que não for número
  cnpj = cnpj.replace(/\D/g, '');

  // Validação inicial: tamanho e repetição
  if (cnpj.length !== 14 || /^(\d)\1+$/.test(cnpj)) {
    return mostrarResultado(false);
  }

  // Calcula os dígitos verificadores
  const digito1 = calcularDigito(cnpj, 12);
  const digito2 = calcularDigito(cnpj, 13);

  const digitosVerificadores = cnpj.slice(12); // últimos dois dígitos

  mostrarResultado(`${digito1}${digito2}` === digitosVerificadores);
}

function calcularDigito(cnpj, tamanho) {
  const pesos = tamanho === 12
    ? [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
    : [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

  let soma = 0;

  for (let i = 0; i < pesos.length; i++) {
    soma += parseInt(cnpj[i]) * pesos[i];
  }

  const resto = soma % 11;
  return resto < 2 ? 0 : 11 - resto;
}

function mostrarResultado(valido) {
  const resultado = document.getElementById('resultado');

  if (valido) {
    resultado.innerHTML = '<i class="fas fa-check-circle"></i> CNPJ Válido!';
    resultado.classList.remove('invalido');
    resultado.classList.add('valido');
  } else {
    resultado.innerHTML = '<i class="fa fa-times-circle"></i> CNPJ Inválido';
    resultado.classList.remove("valido");
    resultado.classList.add("invalido");
  }
}

function limparCampos() {
  document.getElementById("cnpj").value = '';
  const resultado = document.getElementById("resultado");
  resultado.innerHTML = "";
  resultado.classList.remove("valido", "invalido");
}

$(document).ready(function () {
  $('#cnpj').mask('00.000.000/0000-00');
});
