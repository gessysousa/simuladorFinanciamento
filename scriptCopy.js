function simular() {
  var valorFinanciamento = parseFloat(document.getElementById("valor").value);
  var prazoAnos = parseFloat(document.getElementById("prazoAnos").value);
  var jurosAno = parseFloat(document.getElementById("juroAno").value);
  calcular(valorFinanciamento, prazoAnos, jurosAno);
}

function calcular(valorFinanciamento, prazoAnos, jurosAno) {
  var prazoMeses = prazoAnos * 12;
  var jurosMes = (1 + jurosAno) ** (1 / 12) - 1;
  var taxaAmortizacao = valorFinanciamento / prazoMeses;

  var jurosParcela = [];
  var jurosAcumulados = 0;
  var valorDaParcela = [];

  for (var i = 1; i <= prazoMeses; i++) {
    jurosParcela[i] =
      (valorFinanciamento - taxaAmortizacao * (i - 1)) * jurosMes;
    valorDaParcela[i] = taxaAmortizacao + jurosParcela[i];
    jurosAcumulados = jurosAcumulados + jurosParcela[i];
  }
  console.log("jurosParcela " + jurosParcela[5]);
  console.log("valorDaParcela " + valorDaParcela[5]);
  console.log(jurosAcumulados);
  console.log(valorFinanciamento, prazoAnos, jurosAno);
  resultado(
    prazoMeses,
    jurosMes,
    jurosAcumulados,
    taxaAmortizacao,
    jurosParcela,
    valorDaParcela
  );
}

function resultado(
  prazoMeses,
  jurosMes,
  jurosAcumulados,
  taxaAmortizacao,
  jurosParcela,
  valorDaParcela
) {

  document.getElementById("tabela").innerHTML = "";
  document.getElementById("resultado").innerHTML = "";
  //criando resultado, prazo(meses), juros ao mês, juros acumulados
  var addH3 = document.createElement("h3");
  
  var addPrazoMesesLabel = document.createElement("label");
  var addPrazoMesesInput = document.createElement("input");

  var addJurosMesLabel = document.createElement("label");
  var addJurosMesInput = document.createElement("input");

  var addJurosAcumuladosLabel = document.createElement("label");
  var addJurosAcumuladosInput = document.createElement("input");

  document.getElementById("resultado").appendChild(addH3);
  document.getElementById("resultado").appendChild(addPrazoMesesLabel);
  document.getElementById("resultado").appendChild(addPrazoMesesInput);
  document.getElementById("resultado").appendChild(addJurosMesLabel);
  document.getElementById("resultado").appendChild(addJurosMesInput);
  document.getElementById("resultado").appendChild(addJurosAcumuladosLabel);
  document.getElementById("resultado").appendChild(addJurosAcumuladosInput);

  addH3.innerHTML = "Resultado";

  addPrazoMesesLabel.innerHTML = "Prazo em meses: ";
  addPrazoMesesInput.readOnly = true;
  addPrazoMesesInput.value = prazoMeses;
  
  addJurosMesLabel.innerHTML = " Juros ao mês: ";
  addJurosMesInput.readOnly = true;
  addJurosMesInput.value = jurosMes.toFixed(3);

  addJurosAcumuladosLabel.innerHTML = " Juros acumulados: ";
  addJurosAcumuladosInput.readOnly = true;
  addJurosAcumuladosInput.value = "R$ " + jurosAcumulados.toFixed(2);



  //criando tabela
  var addTable = document.createElement("table");
  var addHead = document.createElement("thead");
  var addBody = document.createElement("tbody");

  addTable.appendChild(addHead);
  addTable.appendChild(addBody);

  document.getElementById("tabela").appendChild(addTable);


  //linha 1
  var tr1 = document.createElement("tr");
  var thPrestacao1 = document.createElement("th");
  thPrestacao1.innerHTML = "Prestação";
  var thAmortizacao1 = document.createElement("th");
  thAmortizacao1.innerHTML = "Amortização";
  var thJuros1 = document.createElement("th");
  thJuros1.innerHTML = "Juros";
  var thTotal1 = document.createElement("th");
  thTotal1.innerHTML = "Total";

  tr1.appendChild(thPrestacao1);
  tr1.appendChild(thAmortizacao1);
  tr1.appendChild(thJuros1);
  tr1.appendChild(thTotal1);
  addHead.appendChild(tr1);

  for (var j = 2; j <= prazoMeses + 1; j++) {
    var tr = [];
    var tdPrestacao = [];
    var tdAmortizacao = [];
    var tdJuros = [];
    var tdTotal = [];

    tr[j] = document.createElement("tr");
    tdPrestacao[j] = document.createElement("td");
    tdPrestacao[j].innerHTML = j - 1;
    tdAmortizacao[j] = document.createElement("td");
    tdAmortizacao[j].innerHTML = "R$ " + taxaAmortizacao.toFixed(2);
    tdJuros[j] = document.createElement("td");
    tdJuros[j].innerHTML = "R$ " + jurosParcela[j - 1].toFixed(2);
    tdTotal[j] = document.createElement("td");
    tdTotal[j].innerHTML = "R$ " + valorDaParcela[j - 1].toFixed(2);

    tr[j].appendChild(tdPrestacao[j]);
    tr[j].appendChild(tdAmortizacao[j]);
    tr[j].appendChild(tdJuros[j]);
    tr[j].appendChild(tdTotal[j]);
    addBody.appendChild(tr[j]);
  }
}
