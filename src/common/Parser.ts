export interface Parser {
  evaluate(expression: string): number;
}

interface Operation {
  mathSymbol: string;
  jsOperation: string;
}

interface Variable {
  name: string;
  value: number;
}

export default class ParserImpl implements Parser {
  variables?: Variable[];

  evaluate(expression: string, variables?: Variable[]): number {
    this.variables = variables;

    expression = expression.replace(/\s+/g, ""); // remove all spaces

    const [result] = this._parse(expression);

    return parseFloat(result);
  }

  /*************/
  _parse(expression: string): [string, string] {
    const result = this._evalOperation(
      expression,
      [
        { mathSymbol: "+", jsOperation: "+" },
        { mathSymbol: "-", jsOperation: "-" },
      ],
      (expression) => {
        return this._evalOperation(
          expression,
          [
            { mathSymbol: "*", jsOperation: "*" },
            { mathSymbol: "/", jsOperation: "/" },
            { mathSymbol: "%", jsOperation: "%" },
          ],
          (expression) => {
            return this._evalOperation(
              expression,
              [{ mathSymbol: "^", jsOperation: "**" }],
              (expression) => {
                return this._brackets(expression, (expression) => {
                  return this._getVariable(expression, (expression) => {
                    return this._getNumber(expression);
                  });
                });
              }
            );
          }
        );
      }
    );

    return result;
  }

  _evalOperation(expression: string, opSymbols: Operation[], getNumberFunc): [string, string] {
    let result;

    let [number, newStr] = getNumberFunc(expression);
    result = number;

    while (newStr) {
      let isSymbolPresent = false;
      opSymbols.forEach((opSymbol) => {
        if (newStr.startsWith(opSymbol.mathSymbol)) {
          newStr = newStr.replace(opSymbol.mathSymbol, "");
          let [_number, _newStr] = getNumberFunc(newStr);
          result = eval(`(${result})${opSymbol.jsOperation}(${_number})`);
          newStr = _newStr;
          isSymbolPresent = true;
        }
      });

      if (!isSymbolPresent) break;
    }

    return [result, newStr];
  }

  _brackets(str: string, getNumberFunc): [string, string] {
    let [sign, unsignedStr] = this._getSign(str);    

    if (unsignedStr.startsWith("(")) {
      unsignedStr = unsignedStr.replace("(", "");
      let [result, newStr] = this._parse(unsignedStr);
      if (newStr.startsWith(")")) {
        newStr = newStr.replace(")", "");
        [sign, result] = this._getSign(sign + result)
        return [sign + result, newStr];
      } else {
        throw "Missing rigth bracket!";
      }
    } else {
      return getNumberFunc(str);
    }
  }

  _getVariable(str: string, getNumberFunc): [string, string] {
    let [sign, newStr] = this._getSign(str);    

    if (this.variables) {
      for (const variable of this.variables) {
        if (newStr.startsWith(variable.name)) {
          newStr = newStr.replace(variable.name, "");
          let value;
          [sign, value] = this._getSign(sign + variable.value);
          return [sign + value, newStr];
        }
      }
    }

    return getNumberFunc(str);
  }

  _getNumber(str: string): [string, string] {
    let number = "";
    let [sign, newStr] = this._getSign(str);

    for (let i = 0; i < newStr.length; i++) {
      const element = newStr[i];
      if (element.match("[.0-9]")) {
        number += element;
      } else {
        break;
      }
    }

    newStr = newStr.replace(number, "");
    return [sign + number, newStr];
  }

  _getSign(str: string): [string, string] {
    let sign = "";
    let resultStr = str;

    let i = 0;
    while ("-" === str[i]) {
      i++;
      resultStr = resultStr.replace("-", "");
    }

    if (1 === i % 2) {
      sign = "-";
    }

    return [sign, resultStr];
  }
}
