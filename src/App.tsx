import { useState } from "react";
import "./App.css";

const taxaPadrao = 1.4;
const iof = 0.004167;
const iofDia = 0.38;

function App() {
  const [pedido, setPedido] = useState(0);
  const [desconto, setDesconto] = useState(0);
  const [parcela, setParcela] = useState(0);
  const pedidoDesconto = pedido - pedido * (desconto / 100);
  const [calculoParcela, setCalculoParcela] = useState<any[]>([]);
  const [valorTotalVendor, setValorTotalVendor] = useState(0);
  const [prazoInicio, setPrazoInicio] = useState(30);

  function calcular() {
    let pedidoDesconto = pedido - pedido * (desconto / 100);
    let valorDaParcela = pedidoDesconto / parcela;
    let calculoIofdia = (iofDia * pedidoDesconto) / 100;

    let diasMes = 30;
    let resultadoParcela: any[] = [];
    let valorVendor = 0;
    for (let index = 0; index < parcela; index++) {
      let dias = prazoInicio + diasMes * index;
      let qtdrRealdaparcela = index + 1;
      let taxa = (taxaPadrao / diasMes) * dias;
      taxa = Number(taxa.toFixed(2));
      let juros = valorDaParcela * (taxa / 100);
      juros = Number(juros.toFixed(2));
      let calculoParcela = valorDaParcela + valorDaParcela * (taxa / 100);
      let calculoIof = (valorDaParcela * iof * dias) / 100;
      calculoIof = Number(calculoIof.toFixed(2));
      let valorTotal = calculoParcela + calculoIof;
      if (Number(qtdrRealdaparcela) === 1) {
        valorTotal = valorTotal + calculoIofdia;
      }
      valorTotal = Number(valorTotal.toFixed(2));
      valorVendor = valorTotal + valorVendor;
      resultadoParcela.push({
        qtdrRealdaparcela,
        taxa,
        calculoIof,
        calculoParcela,
        parcelasemdesconto: valorDaParcela,
        valorTotal,
        calculoIofdia,
        juros,
        diasdaParcela: dias,
      });
    }
    console.log(resultadoParcela);
    setCalculoParcela(resultadoParcela);
    setValorTotalVendor(valorVendor);
  }

  return (
    <>
      <p className="body">
        <label id="textPedido">Valor do pedido</label>
        <input
          min={0}
          type="number"
          id="reais"
          placeholder="R$"
          onChange={(e) => {
            setPedido(Number(e.target.value));
          }}
        />
        <p>
          <label>Parcelas</label>
          <select
            id="selecao"
            onChange={(e) => {
              setParcela(Number(e.target.value));
            }}
          >
            <option disabled selected value="0">
              Escolha uma opção
            </option>
            <option value="1">1 Parcela</option>
            <option value="2">2 Parcelas</option>
            <option value="3">3 Parcelas</option>
            <option value="4">4 Parcelas</option>
            {prazoInicio === 30 && <option value="5">5 Parcelas</option>}
          </select>
        </p>
        <p>
          <label>Prazo Inicio</label>
          <select
            id="diasinicioselect"
            onChange={(e) => {
              setPrazoInicio(Number(e.target.value));
            }}
          >
            <option value="30">30 Dias</option>
            <option value="60">60 Dias</option>
          </select>
        </p>
        <p>
          <label>De quanto é o Desconto?</label>
          <input
            min={0}
            type="number"
            id="desconto"
            placeholder="% Desconto"
            onChange={(e) => {
              setDesconto(Number(e.target.value));
            }}
          />
        </p>
      </p>
      <p className="body">
        VALOR COM DESCONTO{" "}
        <span>
          R$
          {pedidoDesconto}
        </span>
      </p>
      <button onClick={calcular} type="button" id="button">
        Calcular
      </button>

      {calculoParcela &&
        calculoParcela.map((item, indice) => {
          if (indice === 0) {
            return (
              <table className="tabela">
                {/* <p className="body2" id="textVendor">
                  VALOR VENDOR{" "}
                  <span id="valorVendor">
                    R$
                    {}
                  </span>
                </p> */}
                <tr>
                  <th>
                    Parcela {item.qtdrRealdaparcela}/{parcela}
                  </th>
                  {/* <th>Valor da Parcela</th> */}
                  <th>{item.diasdaParcela} Dias</th>
                  <th>{item.taxa.toFixed(2)}%</th>
                </tr>
                <tr>
                  {/* <th>Valor Nominal</th>
                  <th>R$ {item.parcelasemdesconto}</th>
                  <th></th>
                  <th>x</th> */}
                </tr>
                <tr>
                  <th>Juros</th>
                  <th> R$ {item.juros.toFixed(2)}</th>
                  {/* <th>{item.taxa.toFixed(2)}%</th>
                  <th></th> */}
                </tr>
                <tr>
                  <th>IOF</th>
                  <th> R$ {item.calculoIofdia.toFixed(2)}</th>
                  {/* <th>% de iof</th>
                  <th></th> */}
                </tr>
                <tr>
                  <th>IOF ao dia</th>
                  <th> R$ {item.calculoIof.toFixed(2)}</th>
                  {/* <th> % DE Iof ao dia</th>
                  <th></th> */}
                </tr>
                <tr className="colunaTotal">
                  <th>Total</th>
                  <th> R$ {item.valorTotal}</th>
                  {/* <th></th>
                  <th></th> */}
                </tr>
              </table>
            );
          } else {
            return (
              <table className="tabela">
                <tr>
                  <th>
                    Parcela {item.qtdrRealdaparcela}/{parcela}
                  </th>
                  {/* <th>Valor da Parcela</th> */}
                  <th>{item.diasdaParcela} Dias</th>
                  <th>{item.taxa.toFixed(2)}%</th>
                </tr>
                <tr>
                  {/* <th>Valor Nominal</th>
                  <th>R$ {item.parcelasemdesconto}</th> */}
                </tr>
                <tr>
                  <th>Juros</th>
                  <th> R$ {item.juros.toFixed(2)}</th>
                </tr>
                <tr>
                  <th>IOF ao dia</th>
                  <th> R$ {item.calculoIof.toFixed(2)}</th>
                </tr>
                <tr className="colunaTotal">
                  <th>Total</th>
                  <th> R$ {item.valorTotal}</th>
                </tr>
              </table>
            );
          }
        })}
      {valorTotalVendor && (
        <p className="body">
          {valorTotalVendor.toLocaleString("pt-br", {
            style: "currency",
            currency: "BRL",
          })}
        </p>
      )}
    </>
  );
}

export default App;
